import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/userModel.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/tokens.js';
import { createSession } from '../utils/createSession.js';
import { SessionsCollection } from '../db/models/sessionModel.js';

export const registerUser = async (payload) => {
  const isUserExisted = await UsersCollection.findOne({ email: payload.email });

  if (isUserExisted) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const accessToken = generateToken();
  const refreshToken = generateToken();

  const newUser = await UsersCollection.create({
    ...payload,
    password: hashedPassword,
  });

  const session = await createSession(newUser._id, accessToken, refreshToken);

  return {
    user: newUser,
    session,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError.Unauthorized('Email or password is incorrect');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw createHttpError.Unauthorized('Email or password is incorrect');
  }

  const accessToken = generateToken();
  const refreshToken = generateToken();

  const session = await createSession(user._id, accessToken, refreshToken);

  return {
    accessToken,
    refreshToken,
    _id: session._id,
  };
};

export const logout = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const accessToken = generateToken();
  const newRefreshToken = generateToken();

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  const newSession = await createSession(
    session.userId,
    accessToken,
    newRefreshToken,
  );

  return newSession;
};

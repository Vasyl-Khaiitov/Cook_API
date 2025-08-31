import { SessionsCollection } from '../db/models/sessionModel.js';
import { ONE_HOUR_MS, ONE_DAY } from '../constants/index.js';

export const createSession = async (userId, accessToken, refreshToken) => {
  const now = Date.now();

  await SessionsCollection.deleteOne({ userId }).catch(console.error);

  const session = await SessionsCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(now + ONE_HOUR_MS),
    refreshTokenValidUntil: new Date(now + ONE_DAY),
  });

  return session;
};

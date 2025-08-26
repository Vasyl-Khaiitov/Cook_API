import { UsersCollection } from '../db/models/userModel.js';

import createHttpError from 'http-errors';

export async function getUserService(userId) {
  const user = await UsersCollection.findById(userId);
  if (!user) {
    throw createHttpError.NotFound('User Not Found');
  }
  return { id: user._id, name: user.name, email: user.email };
}

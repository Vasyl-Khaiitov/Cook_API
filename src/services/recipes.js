import createHttpError from 'http-errors';
import { UsersCollection } from '../models/userModel.js';

export const getFavoriteRecipesById = async (userId, page, perPage) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  if (userId === null) {
    throw new createHttpError.NotFound('User not found');
  }
  const favotite = UsersCollection.findById({ userId }).populate({
    path: 'favorites',
    options: { skip, limits: perPage },
  });
  return favotite;
};

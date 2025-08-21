import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/userModel.js';
import { RecipesCollection } from '../db/models/recipes.js';

export const addRecipeToFavoritesService = async (userId, id) => {
  if (!id) {
    throw new createHttpError.BadRequest('Recipe ID is required');
  }

  const recipe = await RecipesCollection.findById(id);
  if (!recipe) {
    throw new createHttpError.NotFound('Recipe not found');
  }

  const user = await UsersCollection.findById(userId);

  if (user.favorites.includes(id)) {
    throw new createHttpError.Conflict('Recipe already in favorites');
  }

  user.favorites.push(id);
  await user.save();

  return user.favorites;
};

export const removeRecipeFromFavoritesService = async (userId, id) => {
  if (!id) {
    throw new createHttpError.BadRequest('Recipe ID is required');
  }

  const recipe = await RecipesCollection.findById(id);
  if (!recipe) {
    throw new createHttpError.NotFound('Recipe not found');
  }

  const user = await UsersCollection.findById(userId);

  if (!user.favorites.includes(id)) {
    throw new createHttpError.NotFound('Recipe not found in favorites');
  }

  user.favorites = user.favorites.filter(
    (favId) => favId.toString() !== id.toString(),
  );
  await user.save();

  return user.favorites;
};

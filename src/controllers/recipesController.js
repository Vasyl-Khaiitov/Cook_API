import createHttpError from 'http-errors';
import { getFavoriteRecipesById } from '../services/recipes.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const recipesFavoriteController = async (req, res) => {
  const { userId } = req.params;
  const { page, perPage } = parsePaginationParams(req.query);
  const favoriteRecipes = await getFavoriteRecipesById(userId, page, perPage);
  if (favoriteRecipes === null || favoriteRecipes.length === 0) {
    throw new createHttpError.NotFound('Favorite recipes not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfuly load favorites recipes!',
    data: favoriteRecipes,
  });
};

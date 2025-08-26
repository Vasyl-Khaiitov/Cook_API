import createHttpError from 'http-errors';
import {
  getRecipesServices,
  getRecipeByIdServices,
  getFavoriteRecipesById,
} from '../services/recipesServices.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const filter = parseFilterParams(req.query);

  const recipes = await getRecipesServices({
    page,
    perPage,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found recipes!',
    data: recipes,
  });
};

export const getRecipeByIdController = async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeByIdServices(id);

  if (recipe === null) {
    throw createHttpError(404, 'Recipe not found');
  }

  res.json({
    status: 200,
    message: 'Successfully found recipe!',
    data: recipe,
  });
};

export const recipesFavoriteController = async (req, res) => {
  const { userId } = req.params;
  const { page, perPage } = parsePaginationParams(req.query);
  const favoriteRecipes = await getFavoriteRecipesById(userId, page, perPage);
  if (favoriteRecipes === null || favoriteRecipes.length === 0) {
    throw new createHttpError.NotFound('Favorite recipes not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully loaded favorite recipes!',
    data: favoriteRecipes,
  });
};

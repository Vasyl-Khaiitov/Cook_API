import createHttpError from 'http-errors';
import {
  getRecipesServices,
  getRecipeByIdServices,
  postRecipe, //21.08.2025
} from '../services/recipesServices.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { getFavoriteRecipesById } from '../services/recipes.js';

import mongoose from 'mongoose'; //21.08.2025
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js'; //21.08.2025

//21.08.2025
const parseMangoObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid ObjectId: ${id}`);
  }
  return new mongoose.Types.ObjectId(id);
};

//21.08.2025
export const postRecipeController = async (req, res) => {
  const { title, category, area, instructions, description } = req.body;

  const thumb = req.file;

  let thumbUrl;

  if (thumb) {
    thumbUrl = await saveFileToCloudinary(thumb);
  }

  const ingredients = JSON.parse(req.body.ingredients);

  const owner = req.user.id;

  const recipe = await postRecipe({
    title,
    category: parseMangoObjectId(category),
    owner,
    area,
    instructions,
    description,
    thumb: thumbUrl,
    ingredients: ingredients.map((i) => ({
      id: parseMangoObjectId(i.id),
      measure: i.measure,
    })),
  });

  res.json({
    status: 200,
    message: 'Successfully call postRecipe Controller!',
    data: recipe,
  });
};

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

import createHttpError from 'http-errors';
import { addRecipeToFavoritesService } from '../services/recipesFavorites.js';
import { removeRecipeFromFavoritesService } from '../services/recipesFavorites.js';

export const addRecipeToFavoritesController = async (req, res, next) => {
  try {
    const favorites = await addRecipeToFavoritesService(
      req.user.id,
      req.params.id,
    );

    res.status(200).json({
      status: 200,
      message: 'Recipe added to favorites',
      data: favorites,
    });
  } catch (err) {
    next(err);
  }
};

export const removeRecipeFromFavoritesController = async (req, res, next) => {
  try {
    const favorites = await removeRecipeFromFavoritesService(
      req.user.id,
      req.params.id,
    );

    if (!favorites) {
      throw new createHttpError.NotFound('Recipe not found in favorites');
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

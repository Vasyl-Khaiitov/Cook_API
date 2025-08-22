import { addRecipeToFavoritesService } from '../services/recipesFavorites.js';

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

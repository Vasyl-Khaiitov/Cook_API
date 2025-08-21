import { RecipesCollection } from '../db/models/recipes.js';
import createHttpError from 'http-errors';

export const getMyRecipes = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const recipes = await RecipesCollection.find({ owner: userId });

    if (!recipes.length) {
      throw createHttpError(404, 'You dont have your own recipes');
    }

    res.json({
      status: 200,
      message: 'Your recipes have been successfully received.',
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
};

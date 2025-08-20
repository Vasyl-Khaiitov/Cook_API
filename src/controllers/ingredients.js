import { getAllIngredients } from '../services/ingridients.js';

export const getIngredientsController = async (req, res) => {
  const ingredients = await getAllIngredients();
  res.status(200).json({
    status: 200,
    message: 'Successfully found ingredients!',
    data: ingredients,
  });
};

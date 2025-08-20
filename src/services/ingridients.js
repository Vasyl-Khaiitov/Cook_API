import { IngredientsCollection } from '../db/models/ingredients.js';

export const getAllIngredients = async () => {
  const ingredients = await IngredientsCollection.find();
  return ingredients;
};

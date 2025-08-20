import { CategoriesCollection } from '../db/models/categories.js';

export const getAllCategories = async () => {
  const ingredients = await CategoriesCollection.find();
  return ingredients;
};

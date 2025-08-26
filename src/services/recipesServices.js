import { RecipesCollection } from '../db/models/recipes.js';
import { CategoriesCollection } from '../db/models/categories.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import mongoose from 'mongoose';

export const getRecipesServices = async ({
  page,
  perPage,
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const query = userId ? { owner: userId } : {};

  // 🔎 Фільтр по категорії
  if (filter.category) {
    if (mongoose.Types.ObjectId.isValid(filter.category)) {
      // якщо передали ObjectId
      query.category = filter.category;
    } else {
      // якщо передали назву категорії (наприклад "Breakfast")
      const categoryDoc = await CategoriesCollection.findOne({
        name: filter.category,
      });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      } else {
        query.category = null; // не знайдено такої категорії → пустий результат
      }
    }
  }

  // 🔎 Фільтр по інгредієнтах
  if (filter.ingredients) {
    query['ingredients.id'] = { $all: filter.ingredients };
  }

  // 🔎 Фільтр по заголовку
  if (filter.title) {
    query.title = new RegExp(filter.title, 'i');
  }

  const recipesCount = await RecipesCollection.countDocuments(query);

  const recipes = await RecipesCollection.find(query)
    .populate('category', 'name') // підтягнемо назву категорії
    .skip(skip)
    .limit(limit)
    .exec();

  const paginationData = calculatePaginationData(recipesCount, perPage, page);

  return {
    data: recipes,
    ...paginationData,
  };
};

export const getRecipeByIdServices = async (id) => {
  const recipeById = await RecipesCollection.findById(id)
    .populate('category', 'name') // щоб підтягнути назву категорії
    .populate('ingredients.id', 'name'); // можна також підтягнути назви інгредієнтів
  return recipeById;
};

import createHttpError from 'http-errors';
import mongoose from 'mongoose';

import { RecipesCollection } from '../db/models/recipes.js';
import { CategoriesCollection } from '../db/models/categories.js';
import { UsersCollection } from '../db/models/userModel.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

// 📌 Отримати всі рецепти з фільтрами
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

// 📌 Отримати рецепт по id
export const getRecipeByIdServices = async (id) => {
  const recipeById = await RecipesCollection.findById(id)
    .populate('category', 'name') // підтягнути категорію
    .populate('ingredients.id', 'name'); // підтягнути інгредієнти (якщо є name)

  return recipeById;
};

// 📌 Отримати улюблені рецепти користувача
export const getFavoriteRecipesById = async (userId, page, perPage) => {
  if (!userId) {
    throw new createHttpError.NotFound('User not found');
  }

  const skip = page > 0 ? (page - 1) * perPage : 0;

  const user = await UsersCollection.findById(userId).populate({
    path: 'favorites',
    model: 'recipes',
    options: { skip, limit: perPage },
    populate: { path: 'category', select: 'name' }, // одразу підтягнути назву категорії
  });

  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  return user.favorites || [];
};

// 📌 Додати рецепт у список улюблених
export const addRecipeToFavoritesService = async (userId, recipeId) => {
  if (!recipeId) {
    throw new createHttpError.BadRequest('Recipe ID is required');
  }

  const recipe = await RecipesCollection.findById(recipeId);
  if (!recipe) {
    throw new createHttpError.NotFound('Recipe not found');
  }

  const user = await UsersCollection.findById(userId);
  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  if (user.favorites.includes(recipeId)) {
    throw new createHttpError.Conflict('Recipe already in favorites');
  }

  user.favorites.push(recipeId);
  await user.save();

  return user.favorites;
};

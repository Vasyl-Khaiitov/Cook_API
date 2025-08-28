import createHttpError from 'http-errors';
import { RecipesCollection } from '../db/models/recipes.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { UsersCollection } from '../db/models/userModel.js';



export const postRecipe = async (recipeData) => {
  const newRecipe = await RecipesCollection.create(recipeData);
  return newRecipe;
};

export const getRecipesServices = async ({
  page,
  perPage,
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const recipesQuery = RecipesCollection.find(
    userId ? { owner: userId } : {},
  ).populate('category', 'name');


  if (filter.category) {
    recipesQuery.where('category').equals(filter.category);
  }


  if (filter.ingredients) {
  recipesQuery.where('ingredients').elemMatch({ id: filter.ingredients });
  }

    if (filter.title) {
    recipesQuery.where('title').regex(new RegExp(filter.title, 'i'));
  }


  const recipesCount = await RecipesCollection.countDocuments(
    recipesQuery.getFilter(),
  );

  const recipes = await recipesQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(recipesCount, perPage, page);

  return {
    data: recipes,
    ...paginationData,
  };
};

export const getRecipeByIdServices = async (id) => {
  const recipeById = await RecipesCollection.findById(id).populate(
    'category',
    'name',
  ); // <- тут вказуємо, що потрібно підставити поле 'name' з категорії
  return recipeById;
};

export const getFavoritesRecipesById = async (
  userId,
  page = 1,
  perPage = 12,
) => {
  if (!userId) {
    throw new createHttpError.NotFound('User not found');
  }

  // Забираємо користувача з його улюбленими рецептами
  const user = await UsersCollection.findById(userId).populate('favorites');
  if (!user) {
    throw new createHttpError.NotFound('User favorites not found');
  }

  const totalItems = user.favorites.length;
  const totalPages = Math.ceil(totalItems / perPage);

  // Коректуємо сторінку, щоб не виходила за межі
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const skip = (currentPage - 1) * perPage;
  const recipes = user.favorites.slice(skip, skip + perPage); // ручне пагінування

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return {
    data: recipes,
    page: currentPage,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

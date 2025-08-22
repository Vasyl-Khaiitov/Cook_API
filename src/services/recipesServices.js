import { RecipesCollection } from '../db/models/recipes.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

//21.08.2025
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

  const recipesQuery = RecipesCollection.find(userId);

  if (filter.category) {
    recipesQuery.where('category').equals(filter.category);
  }

  if (filter.ingredients) {
    recipesQuery.where('ingredients.id').all(filter.ingredients);
  }

  if (filter.title) {
    recipesQuery.where('title').regex(new RegExp(filter.title, 'i'));
  }

  const recipesCount = await RecipesCollection.find()
    .merge(recipesQuery)
    .countDocuments();

  const recipes = await recipesQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(recipesCount, perPage, page);

  return {
    data: recipes,
    ...paginationData,
  };
};

export const getRecipeByIdServices = async (id) => {
  const recipeById = await RecipesCollection.findById(id);
  return recipeById;
};

import { RecipesCollection } from '../db/models/recipes.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getRecipesServices = async ({
  page,
  perPage,
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const recipesQuery = RecipesCollection.find(userId ? { owner: userId } : {});

  if (filter.category) {
    recipesQuery.where('category').equals(filter.category);
  }

  if (filter.ingredients) {
    recipesQuery.where('ingredients').all(filter.ingredients);
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
  const recipeById = await RecipesCollection.findById(id);
  return recipeById;
};

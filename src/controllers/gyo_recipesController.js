import { RecipesCollection } from '../db/models/recipes.js';
export const getMyRecipesController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.per_page) || 12;
    const skip = (page - 1) * perPage;

    const [recipes, total] = await Promise.all([
      RecipesCollection.find({ owner: userId }).skip(skip).limit(perPage),
      RecipesCollection.countDocuments({ owner: userId }),
    ]);

    res.json({
      status: 200,
      message: recipes.length
        ? 'Your recipes have been successfully received.'
        : 'You don`t have any recipes yet.',
      data: recipes,
      total,
    });
  } catch (error) {
    next(error);
  }
};

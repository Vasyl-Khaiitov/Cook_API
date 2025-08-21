import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getRecipeByIdController,
  getRecipesController,
} from '../controllers/recipesController.js';
import {
  addRecipeToFavoritesController,
  recipesFavoriteController,
} from '../controllers/recipesFavorites.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.get('/', ctrlWrapper(getRecipesController));
router.get('/:id', ctrlWrapper(getRecipeByIdController));

router.post('/:id/favorite', auth, ctrlWrapper(addRecipeToFavoritesController));
router.get('/:userId/favorites', ctrlWrapper(recipesFavoriteController));

export default router;

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getRecipeByIdController,
  getRecipesController,
} from '../controllers/recipesController.js';
import { addRecipeToFavoritesController } from '../controllers/recipesFavorites.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.get('/', ctrlWrapper(getRecipesController));
router.get('/:id', ctrlWrapper(getRecipeByIdController));

router.post('/:id/favorite', auth, ctrlWrapper(addRecipeToFavoritesController));

export default router;

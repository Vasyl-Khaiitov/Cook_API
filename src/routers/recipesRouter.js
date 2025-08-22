import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getRecipeByIdController,
  getRecipesController,
  recipesFavoriteController,
  postRecipeController,
} from '../controllers/recipesController.js'; //21.08.2025
import { upload } from '../middlewares/multer.js'; //21.08.2025
import { validateBody } from '../middlewares/validateBody.js'; //21.08.2025
import { recipeSchema } from '../validation/recipeSchema.js'; //21.08.2025
import { addRecipeToFavoritesController } from '../controllers/recipesFavorites.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.get('/', ctrlWrapper(getRecipesController));
router.get('/:id', ctrlWrapper(getRecipeByIdController));
router.post(
  '/',
  auth,
  upload.single('thumb'),
  validateBody(recipeSchema),
  ctrlWrapper(postRecipeController),
);

router.post('/:id/favorite', auth, ctrlWrapper(addRecipeToFavoritesController));
router.get('/:id/favorites', auth, ctrlWrapper(recipesFavoriteController));

export default router;

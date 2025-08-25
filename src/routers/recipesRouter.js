import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getRecipeByIdController,
  getRecipesController,
  recipesFavoriteController,
  postRecipeController,
} from '../controllers/recipesController.js';
import {
  addRecipeToFavoritesController,
  recipesFavoriteController,
} from '../controllers/recipesFavorites.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import { recipeSchema } from '../validation/recipeSchema.js';
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

router.get('/:id/favorites', auth, ctrlWrapper(recipesFavoriteController));
router.post('/:id/favorite', auth, ctrlWrapper(addRecipeToFavoritesController));
router.delete('/:id/favorite', auth, ctrlWrapper(recipesFavoriteController));


export default router;

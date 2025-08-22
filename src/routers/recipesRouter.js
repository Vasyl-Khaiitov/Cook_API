import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
//import { getRecipeByIdController, getRecipesController } from '../controllers/recipesController.js'; //21.08.2025

import { auth } from '../middlewares/auth.js'; //21.08.2025

import {
  getRecipeByIdController,
  getRecipesController,
  postRecipeController,
} from '../controllers/recipesController.js'; //21.08.2025

import { upload } from '../middlewares/multer.js'; //21.08.2025

import { validateBody } from '../middlewares/validateBody.js'; //21.08.2025

import { recipeSchema } from '../validation/recipeSchema.js'; //21.08.2025

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

export default router;

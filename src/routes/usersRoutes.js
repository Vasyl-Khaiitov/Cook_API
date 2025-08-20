import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUserInfoController } from '../controllers/usersController.js';
import { recipesFavoriteController } from '../controllers/recipesController.js';
const router = express.Router();

router.get('/', ctrlWrapper(getUserInfoController));

router.get('/:userId/favorites', ctrlWrapper(recipesFavoriteController));

export default router;

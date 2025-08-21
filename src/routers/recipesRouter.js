import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getRecipeByIdController, getRecipesController } from '../controllers/recipesController.js';

const router = Router();

router.get('/', ctrlWrapper(getRecipesController));
router.get("/:id", ctrlWrapper(getRecipeByIdController));

export default router;
import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUserInfoController } from '../controllers/usersController.js';
const router = express.Router();

router.get('/', ctrlWrapper(getUserInfoController));

// <<<<<<< delete-recipe
// router.get('/:userId/favorites', ctrlWrapper(recipesFavoriteController));

// =======
// >>>>>>> main
export default router;

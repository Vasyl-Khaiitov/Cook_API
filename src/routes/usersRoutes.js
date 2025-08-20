import express from "express";
import {ctrlWrapper} from '../utils/ctrlWrapper.js';
import {getUserInfoController} from '../controllers/usersController.js';
const router = express.Router();

router.get('/', ctrlWrapper(getUserInfoController));

export default router;
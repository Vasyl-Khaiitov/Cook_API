import express from "express";
import { getMyRecipes } from "../controllers/gyo_recipesController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/my", authenticate, getMyRecipes);

export default router;

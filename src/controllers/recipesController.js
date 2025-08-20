import createHttpError from "http-errors";
import { getRecipesServices, getRecipeByIdServices } from "../services/recipesServices.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";



export const getRecipesController = async (req, res) => {

    const { page, perPage } = parsePaginationParams(req.query);
    const filter = parseFilterParams(req.query);

    const recipes = await getRecipesServices({
        page,
        perPage,
        filter,
    });

    res.json({
        status: 200,
        message: "Successfully found recipes!",
        data: recipes,
    });
};



export const getRecipeByIdController = async (req, res) => {
    const { id } = req.params;
    const recipe = await getRecipeByIdServices(id);

    if (recipe === null) {
        throw createHttpError(404, "Recipe not found");

    }

        res.json({
            status: 200,
            message: "Successfully found recipe!",
            data: recipe,
        });

};

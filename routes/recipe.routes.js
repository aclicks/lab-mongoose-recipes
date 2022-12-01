import express from "express";


const recipeRoute = express.Router();

recipeRoute.get("/all-recipies", async (req, res) => {
	try {
		const recipes = await RecipeModel.find();

		return res.status(200).json(recipies);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Algo de errado não está certo" });
	}
});

recipeRoute.delete("/delete-all", async (req, res) => {
	try {
		const deleteAll = await RecipeModel.deleteMany();

		return res.status(202).json(deleteAll);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Algo de errado não está certo" });
	}
});

recipeRoute.post("/create-recipe", async (req, res) => {
	try {
		const newRecipe = await RecipeModel.create(req.body);

		return res.status(201).json(newRecipe);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Algo de errado não está certo" });
	}
});




export default recipeRoute;

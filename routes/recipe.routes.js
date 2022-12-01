import express from "express";
import RecipeModel from "../models/Recipe.model.js";
import recipesData from "../data.json" assert { type: "json" };

const recipeRoute = express.Router();

recipeRoute.get("/all-recipes", async (req, res) => {
	try {
		const recipes = await RecipeModel.find({});

		return res.status(200).json(recipes);
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

recipeRoute.post("/create-all", async (req, res) => {
	try {
		const newRecipe = await RecipeModel.create(recipesData);

		return res.status(201).json(newRecipe);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Algo de errado não está certo" });
	}
});
recipeRoute.put("/edit/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const updatedRecipe = await RecipeModel.findByIdAndUpdate(
			id,
			{ ...req.body },
			{ new: true, runValidators: true }
		);

		return res.status(200).json(updatedRecipe);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error.errors);
	}
});

recipeRoute.delete("/delete/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const deletedRecipe = await RecipeModel.findByIdAndDelete(id);
	
		if (!deletedRecipe) {
		  return res.status(400).json({ msg: "Recipe not found!" });
		}
	



	} catch (error) {
		console.log(error);
		return res.status(500).json(error.errors);
	}
});

export default recipeRoute;

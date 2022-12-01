import express from "express";
import * as dotenv from "dotenv";
import recipeRoute from "./routes/recipe.routes.js";
import connect from "./config/db.config.js";
import RecipeModel from './models/Recipe.model.js';
import recipesData from "./data.json" assert { type: "json" };

dotenv.config();

const app = express();

app.use(express.json());

app.use("/recipes-app", recipeRoute);

connect();

const startRecipe = {
	title: "Carbonara",
	level: "UltraPro Chef",
	ingredients: [
		"4 eggs",
		"180g of spaghetti",
		"80g of Guanciale",
		"80g of Pecorino Cheese",
		"Pepper and Salt to taste",
	],
	cuisine: "Italian",
	dishType: "main_course",
	duration: 20,
	creator: "Italia",
};


RecipeModel.create(startRecipe).then(recipes => {console.log(recipes)});

RecipeModel.insertMany(recipesData).then(recipes => {console.log(recipes)});


RecipeModel.findOneAndUpdate({title: 'Rigatoni alla Genovese'},{duration: 100},{new: true, runValidators: true}).then(console.log);

RecipeModel.deleteOne({title: 'Carot Cake'});


app.listen(process.env.PORT, () => {
	console.log(
		`App up and running on port http://localhost:${process.env.PORT}`
	);
});

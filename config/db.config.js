import mongoose from 'mongoose';
import RecipeModel from "../models/Recipe.model.js";

async function connect() {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`Connected to data base: ${dbConnection.connection.name}`);
    return RecipeModel.deleteMany();
  } catch (error) {
    console.log(error);
  }
}

export default connect;
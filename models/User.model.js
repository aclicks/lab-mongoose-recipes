import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		bio: {
			type: String,
			// enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
		},
		age: {
			type: Number,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		isChef: {
			type: Boolean,
			default: false,
		},
        recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
	},
	{
		timestamps: true,
	}
);

const UserModel = model("User", userSchema);

export default UserModel;

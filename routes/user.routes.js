import express from "express";
import UserModel from "../models/User.model.js";

const userRoute = express.Router();

userRoute.post("/create-user", async (req, res) => {
	try {
		const form = req.body;

		const newUser = await UserModel.create(form);

		return res.status(201).json(newUser);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error.errors);
	}
});

userRoute.get("/read/:userid", async (req, res) => {
	try {
		const { userid } = req.params;

		const user = await UserModel.findById(userid);

		if (!user) {
			return res.status(400).json({ msg: " User not found!" });
		}

		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error.errors);
	}
});

userRoute.put("/update/:userid", async (req, res) => {
	try {
		const { userid } = req.params;

		const updatedUser = await UserModel.findByIdAndUpdate(
			userid,
			{ ...req.body },
			{ new: true, runValidators: true }
		);

		return res.status(200).json(updatedUser);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error.errors);
	}
});

userRoute.delete("/delete/:userid", async (req, res) => {
	try {
		const { userid } = req.params;

		const deletedUser = await UserModel.findByIdAndDelete(userid);

		if (!deletedUser) {
			return res.status(400).json({ msg: "User not found!" });
		}

		return res.status(200).json({ msg: "Deleted user" });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error.errors);
	}
});

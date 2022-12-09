const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		blogs: [
			{ type: mongoose.Types.ObjectId, ref: "BlogModel", required: true },
		],
	},
	{ timestamps: true },
	{ collection: "blogUsers" }
);
module.exports = mongoose.model("UserModel", userSchema);

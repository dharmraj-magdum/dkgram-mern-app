const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { colors } = require("colors");
const userModel = require("../models/UserModel");

const protector = asyncHandler(async (req, res, next) => {
	let token;
	//check authization string available or NOT
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			// console.log(`token : ${token}`.yellow);
			const { id } = jwt.verify(token, process.env.JWT_SECRET);

			// console.log(`id : ${id}`.bgCyan);
			if (!id) {
				res.status(401);
				throw new Error("token is not  authorized");
			} else {
				// const user = await userModel.findById(id).select("-password");
				//if we get user,store it in req object to provide further access
				// console.log(user);
				req.userId = id;
				next();
			}
		} catch (error) {
			res.status(401);
			console.log(`${error}`.red);
			throw new Error(" NOT/ WRONG TOKEN /CANT verify /");
		}
	} else {
		res.status(401);
		throw new Error(
			"dont have access due NO TOKEN so no authontication available"
		);
	}
});

module.exports = { protector };

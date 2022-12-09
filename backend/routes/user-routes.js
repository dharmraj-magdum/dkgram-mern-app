const express = require("express");
const {
	registerUser,
	loginUser,
	getMe,
} = require("../controllers/user-controller");

const router = express.Router();

router.post("/", registerUser);
router.post("/login/", loginUser);
//just to test
router.get("/me/:id", getMe);
module.exports = router;

const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
	getUserBlogs,
	getAllBlogs,
	addBlog,
	deleteBlog,
	updateBlog,
} = require("../controllers/blogController");

const { protector } = require("../middleware/authHandler");

const blogRouter = express.Router();

//all routes to blog are protected.

blogRouter.get("/", protector, getUserBlogs);
blogRouter.post("/", protector, upload.single("image"), addBlog);
blogRouter.put("/:id", protector, updateBlog);
blogRouter.delete("/:id", protector, deleteBlog);
//load all blogs to see as post in page
blogRouter.get("/all", protector, getAllBlogs);
//
module.exports = blogRouter;

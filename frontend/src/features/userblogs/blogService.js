import axios from "axios";

const API_URL = "/api/blogs/";

// Get user Blogs
const getBlogs = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	// console.log("calling api for get user blogs");
	var response;
	var AxiosError;
	await axios
		.get(API_URL, config)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});
	// console.log(response.data);

	if (response) {
		return response.data;
	}
	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
};

// Create new Blog
const createBlog = async (blogData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	// console.log("calling api for post blog");
	var response;
	var AxiosError;
	await axios
		.post(API_URL, blogData, config)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});
	// console.log(response.data);

	if (response) {
		return response.data;
	}
	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
};

// udate Blog blog sevice
const updateBlog = async (blogData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	// console.log("calling api for update blog/post");
	// console.log("newblog to update sended as", blogData);
	var response;
	var AxiosError;
	await axios
		.put(API_URL + blogData.blogId, blogData, config)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});
	// console.log(response.data);

	if (response) {
		return response.data;
	}
	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
};

// Delete user Blog
const deleteBlog = async (blogId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	// console.log("calling api for delete blog");
	var response;
	var AxiosError;
	await axios
		.delete(API_URL + blogId, config)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});
	// console.log(response.data);

	if (response) {
		return response.data;
	}
	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
};

const Blogservice = {
	createBlog,
	getBlogs,
	deleteBlog,
	updateBlog,
};

export default Blogservice;

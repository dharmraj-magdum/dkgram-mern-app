import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";

const initialState = {
	blogs: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// Get user blogs
export const getBlogs = createAsyncThunk(
	"blogs/getmyblogs",
	async (_, thunkAPI) => {
		try {
			// console.log("inside getblogs getting token");
			const token = thunkAPI.getState().auth.user.token;
			return await blogService.getBlogs(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Create new blog
export const createBlog = createAsyncThunk(
	"blogs/create",
	async (blogData, thunkAPI) => {
		try {
			// console.log("inside slice getting token ");
			const token = thunkAPI.getState().auth.user.token;
			// console.log(token);
			return await blogService.createBlog(blogData, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// update  blog of user
export const updateBlog = createAsyncThunk(
	"blogs/update",
	async (blogData, thunkAPI) => {
		try {
			// console.log("inside slice getting token ");
			const token = thunkAPI.getState().auth.user.token;
			// console.log(token);
			return await blogService.updateBlog(blogData, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Delete user blog
export const deleteBlog = createAsyncThunk(
	"blogs/delete",
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await blogService.deleteBlog(id, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const blogSlice = createSlice({
	name: "blogs",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createBlog.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createBlog.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.blogs.push(action.payload);
			})
			.addCase(createBlog.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getBlogs.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBlogs.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.blogs = action.payload;
			})
			.addCase(getBlogs.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateBlog.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateBlog.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				//here dont do anything to glogs array
				//bcs after edit app navigated to myblogs
				//so fresh myblogs are fetched that containes edited also
				//doing here update is unnessecary
			})
			.addCase(updateBlog.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteBlog.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteBlog.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.blogs = state.blogs.filter(
					(blog) => blog._id !== action.payload.blogId
				);
			})
			.addCase(deleteBlog.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;

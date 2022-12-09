import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	blogs: [],
	pageNo: 1,
	totalPages: 1,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// fetch all blogs
const API_URL = "/api/blogs/all/";
export const getAllBlogs = createAsyncThunk(
	"blogs/getAll",
	async (_, thunkAPI) => {
		try {
			//logic to fecth all blogs
			///pagination
			const pageNo = thunkAPI.getState().allblogs.pageNo;
			//
			const token = thunkAPI.getState().auth.user.token;
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			// console.log("calling api for page ", pageNo);
			var response;
			var AxiosError;
			await axios
				.get(API_URL + `?pageNo=${pageNo}`, config)
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

export const allblogsSlice = createSlice({
	name: "allblogs",
	initialState,
	reducers: {
		reset: (state) => {
			state.pageNo = 1;
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = "";
		},
		setPageNo: (state, action) => {
			const num = action.payload;
			if (num > state.totalPages) {
				// console.log("setting num in reducer to", num);
				state.pageNo = state.totalPages;
			} else {
				// console.log("setting num in reducer to", num);
				state.pageNo = num;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllBlogs.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllBlogs.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.blogs = action.payload.blogs;
				state.totalPages = action.payload.totalPages;
				// console.log(
				// 	"page",
				// 	state.pageNo,
				// 	"blogs--",
				// 	action.payload.blogs
				// );
			})
			.addCase(getAllBlogs.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			});
	},
});

export const { setPageNo, reset } = allblogsSlice.actions;
export default allblogsSlice.reducer;

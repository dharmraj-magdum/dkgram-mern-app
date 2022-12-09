import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import blogReducer from "../features/userblogs/blogSlice";
import allblogsReducer from "../features/allblogs/allblogsSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		blogs: blogReducer,
		allblogs: allblogsReducer,
	},
});
//-->{"objdataname":"its reducer(have state and actions)"}
//we can have multiple such obj and its reducer

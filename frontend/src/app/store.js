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

//IMP IMP
//flow of redux
//1)in component we call dispatch(get())
//2)get() called which is AsyncThunk(middleware) and its simply call service funtion
//3)the service/our fun then Avtually call Api ,the responce is send to step 2 middleware
//4)middler wait till that ,and this AsyncThunk is reducer of our action
//5)Slice for this state of consider its completion of task and
//6)finally store's real state get updated
//7)after this we will get this stored data via useSelect() which give data in state stored

//dispach->action->thunk/middlerware<<-API call)->reducer in slice->store->useSelect()

import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { getBlogs, reset } from "../features/userblogs/blogSlice";
// import Spinner from "../gcomponents/Spinner";
import MySpinner from "../components/MySpinner";
import MyBlogItem from "../components/MyBlogItem";

const MyBlogs = () => {
	// console.log("---my blogs refreshed");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const authobj = useSelector((state) => state.auth);
	const { blogs, isLoading, isError, message } = useSelector(
		(state) => state.blogs
	);

	useEffect(() => {
		if (authobj.isError) {
			console.log(authobj.message);
		}
		if (!authobj.user) {
			navigate("/login");
		}
		// console.log("---dispatch(getBlogs());");
		dispatch(getBlogs());

		return () => {
			if (!authobj.user) dispatch(reset());
		};
	}, [authobj.user, navigate, dispatch]);

	if (isLoading) {
		return <MySpinner size={200} />;
	}

	return (
		<div className="container2">
			<section className="heading">
				<h3>Manage your Posts</h3>
				<small>(Note:please don't delete posts we have few.. )</small>
			</section>
			<section className="my-blogs-container">
				{blogs.length > 0 ? (
					<div className="my-blogs-grid">
						{blogs.map((blog) => (
							<MyBlogItem key={blog._id} blog={blog} />
						))}
					</div>
				) : (
					<>
						<h3>You have not added any blogs yet</h3>
						<Link to="/blogfomr">
							<FaSignInAlt /> Add Blog
						</Link>
					</>
				)}
			</section>
			{isError && <div className="error">{message}</div>}
		</div>
	);
};

export default MyBlogs;

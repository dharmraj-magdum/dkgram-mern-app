import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	getAllBlogs,
	setPageNo,
	reset,
} from "../features/allblogs/allblogsSlice";
// import Spinner from "../gcomponents/Spinner";
import MySpinner from "../components/MySpinner";
import BlogItem from "../components/BlogItem";
import { useState } from "react";
import Pagination from "../components/Pagination";

function Dashboard() {
	// console.log("dashborad refreshed --");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const authobj = useSelector((state) => state.auth);

	//paginatoin
	const { blogs, totalPages, isLoading, isError, message } = useSelector(
		(state) => state.allblogs
	);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (authobj.isError) {
			console.log(authobj.message);
		}

		if (!authobj.user) {
			navigate("/login");
		}
		dispatch(setPageNo(currentPage));
		dispatch(getAllBlogs());

		return () => {
			dispatch(reset());
		};
	}, [authobj.user, currentPage, totalPages, navigate, dispatch]);

	if (isLoading) {
		return <MySpinner size={200} />;
	}
	return (
		<div className="container">
			{/* <section className="heading">
				<h3>Dashboard</h3>
			</section> */}

			<section className="blogs-container">
				{blogs.length > 0 ? (
					<div className="blogs-grid">
						{blogs.map((blog) => (
							<BlogItem key={blog._id} blog={blog} />
						))}
					</div>
				) : (
					<>
						<h3>NO blogs to see soryy</h3>
						<p>conatct dkamgdum23@gmail.com</p>
					</>
				)}
			</section>
			{isError && <div className="error">{message}</div>}
			<Pagination
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				pageCount={totalPages}
			/>
		</div>
	);
}

export default Dashboard;

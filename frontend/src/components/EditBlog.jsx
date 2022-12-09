import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateBlog } from "../features/userblogs/blogSlice";
import MySpinner from "./MySpinner";

const EditBlog = () => {
	const { id } = useParams();
	const blogId = id;
	// console.log("edit blog rendered for-", blogId);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [Loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	var image = null;
	var imageUrl = "";

	const authobj = useSelector((state) => state.auth);

	const { blogs, isLoading, isError, message } = useSelector(
		(state) => state.blogs
	);

	const blog = blogs.find((item) => item._id === blogId);
	const { title, description } = blog;
	const [blogData, setblogData] = useState({
		title,
		description,
	});
	//if not blog found malf/wrong blog id
	if (!blog) {
		return <h4>invalid blog id</h4>;
	}
	// console.log("found blog to edit-", blog);

	const onChange = (e) => {
		setblogData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const setImageUrl = async (image) => {
		///funtion upload image to cloudery and give its link
		let dataRes;
		// console.log(image);
		try {
			const formData = new FormData();
			formData.append("file", image);
			formData.append("upload_preset", process.env.REACT_APP_CPRESET);
			formData.append("cloud_name", process.env.REACT_APP_CNAME);
			// console.log("uploading image");
			dataRes = await axios.post(process.env.REACT_APP_CURL, formData);
		} catch (err) {
			// console.log("err in try-", err);
			// toast.error("image upload failed");
			setErrorMessage("image cannot be uploaded");
		}
		// console.log("out of try");
		imageUrl = dataRes.data.url;
		// console.log("done --dataRes.data.url", imageUrl);
		// console.log("setting image url to", imageUrl, "---");
		// console.log("set state--", blogData, "but-", imageUrl);
		actualSubmit();
	};
	const actualSubmit = () => {
		// console.log("imge---url---", imageUrl);
		// console.log("final blog--", blogData, "---");
		if (!blogData.title || !blogData.description || !imageUrl) {
			// toast.error("fill all fields");
			// console.log("fill all fields");
			setErrorMessage("all fields /image cannot be uploaded");
		} else {
			const newblogData = {
				title: blogData.title,
				description: blogData.description,
				image: imageUrl,
				blogId,
			};
			// console.log("blog submited dispatch called");
			dispatch(updateBlog(newblogData));
			//reset from
			setErrorMessage("");
			setLoading(false);
			navigate("/myblogs");
		}
		image = null;
		imageUrl = "";
	};
	const onSubmit = (e) => {
		e.preventDefault();
		if (!blogData.title || !blogData.description) {
			// toast.error("fill all fields");
			// console.log("fill all text fields");
			setErrorMessage("fill all text fields of post");
		} else {
			image = e.target.elements.image.files[0];
			if (image) {
				setErrorMessage("");
				setImageUrl(image);
				setLoading(true);
				// plesePause(3000);
			} else {
				// toast.error("image not selected");
				// console.log("image not selected");
				setErrorMessage("image not selected");
			}
		}
	};

	return (
		<div className="container2">
			<section className="form">
				<h2>Edit as you want a post</h2>
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="title">Edit title</label>
						<input
							type="text"
							className="form-control"
							id="title"
							name="title"
							value={blogData.title}
							placeholder="Enter your title"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="title">Edit description(caption)</label>
						<input
							type="text"
							className="form-control"
							id="description"
							name="description"
							value={blogData.description}
							placeholder="Enter your description"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="image">select a photo</label>
						<input
							type="file"
							accept="image/*"
							className="form-control"
							id="image"
							name="image"
							placeholder="add image"
						/>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-block">
							Update
						</button>
					</div>
				</form>
				<div className="status">
					{Loading && (
						<>
							<MySpinner size={40} />
							<p>uploading your data...please wait</p>
						</>
					)}
				</div>
			</section>
			{errorMessage && <div className="error">{errorMessage}</div>}
		</div>
	);
};

export default EditBlog;

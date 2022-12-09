import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createBlog } from "../features/userblogs/blogSlice";
import { useEffect } from "react";
import MySpinner from "./MySpinner";

function BlogForm() {
	const [blogData, setBlogData] = useState({
		title: "",
		description: "",
	});
	const [Loading, setLoading] = useState(false);
	const [Success, setSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	var image = null;
	var imageUrl = "";

	const dispatch = useDispatch();
	const onChange = (e) => {
		setBlogData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const setImageUrl = async (image) => {
		setErrorMessage("");
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
			console.log("err in try-", err);
			// toast.error("image upload failed");
			setErrorMessage("image cannot be uploaded" + err.toString());
			setLoading(false);
		}
		// console.log("out of try");
		imageUrl = dataRes.data.url;
		// console.log("done --dataRes.data.url", imageUrl);
		// console.log("setting image url to", imageUrl, "---");
		// console.log("set state--", blogData, "but-", imageUrl);
		actualSubmit();
		// console.log("actal not calling");
	};
	const actualSubmit = () => {
		// console.log("imge---url---", imageUrl);
		// console.log("final blog--", blogData, "---");
		if (!blogData.title || !blogData.description || !imageUrl) {
			// toast.error("fill all fields");
			// console.log("fill all fields");
			setErrorMessage("fill all text fields of post");
			setLoading(false);
		} else {
			const newblogData = {
				title: blogData.title,
				description: blogData.description,
				image: imageUrl,
			};
			// console.log("blog submited dispatch called");
			dispatch(createBlog(newblogData));
			//reset from
			setLoading(false);
			setSuccess(true);
			setErrorMessage("");
			setBlogData({
				title: "",
				description: "",
			});
		}
		image = null;
		imageUrl = "";
	};
	const onSubmit = (e) => {
		e.preventDefault();
		setSuccess(false);
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
				setErrorMessage("Image not selected");
				// console.log("---null");
			}
		}
	};

	useEffect(() => {}, [errorMessage, setErrorMessage]);

	return (
		<div className="container2">
			<section className="form">
				<h2>make a post / add your memories</h2>
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="title">title for your post</label>

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
						<label htmlFor="description">
							caption/description{" "}
						</label>
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
							Submit
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
					{Success && <p>Done--Done....add another or go see them</p>}
				</div>
			</section>
			{errorMessage && <div className="error">{errorMessage}</div>}
		</div>
	);
}

export default BlogForm;

// const plesePause = (ms) => {
// 	var start = new Date().getTime();
// 	var end = start;
// 	while (end - start <= ms) {
// 		end = new Date().getTime();
// 	}
// };

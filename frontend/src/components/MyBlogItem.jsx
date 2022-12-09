import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { deleteBlog } from "../features/userblogs/blogSlice";

var imgSrc =
	"https://webneel.com/daily/sites/default/files/images/daily/03-2013/5-landscape-photography.jpg";
function MyBlogItem({ blog }) {
	// console.log("---my blog item refreshed");

	// const navigate = useNavigate();
	const dispatch = useDispatch();

	const onDelete = () => {
		// console.log("delelte for--", blog._id);
		dispatch(deleteBlog(blog._id));
	};
	if (blog.image) {
		imgSrc = blog.image;
	}
	return (
		<div className="blog-content ">
			<div className="blog-image my-blog-options">
				<img src={imgSrc} alt="post image(not loaded)" />
				<div className="options">
					<button
						className="option-btn btn-delete"
						onClick={onDelete}
					>
						<MdDelete />
					</button>
					<Link to={`/editblog/${blog._id}`}>
						{/* here we send just id of blog in url to get by param
						bcs we are navigating to edit from not rendering it here.
					the easy way than actually passing whole object to edit*/}
						<button className="option-btn btn-edit">
							<TbEdit />
						</button>
					</Link>
				</div>
			</div>
			<div className="blog-text">
				<h2>{blog.title}</h2>
				<p>{blog.description}</p>
				<div className="creator">
					<small>
						<ReactTimeAgo
							date={blog.updatedAt}
							locale="en-US"
							timeStyle="twitter"
						/>
					</small>
					ago
					<small>
						by <b>{blog.creator || "DKM"}</b>
					</small>
				</div>
			</div>
		</div>
	);
}

export default MyBlogItem;

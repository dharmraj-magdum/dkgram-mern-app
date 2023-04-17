import { useDispatch } from "react-redux";
import ReactTimeAgo from "react-time-ago";
import { deleteBlog } from "../features/userblogs/blogSlice";
var imgSrc =
	"https://webneel.com/daily/sites/default/files/images/daily/03-2013/5-landscape-photography.jpg";
function BlogItem({ blog }) {
	const dispatch = useDispatch();

	if (blog.image) {
		imgSrc = blog.image;
	}
	return (
		<div className="blog-content">
			<div className="creator">
				<small>{blog.creator || "DKM"}</small>
				<small className="date">
					<ReactTimeAgo
						date={blog.updatedAt}
						locale="en-US"
						timeStyle="twitter"
					/>
				</small>
			</div>
			<div className="blog-image">
				<img src={imgSrc} alt="blog image(not loaded)" />
			</div>
			<div className="blog-text">
				<h2>{blog.title}</h2>
				<p>{blog.description}</p>
			</div>
		</div>
	);
}

export default BlogItem;

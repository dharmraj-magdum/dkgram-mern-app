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
			<div className="blog-image">
				<img src={imgSrc} alt="blog image(not loaded)" />
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
					<small>
						by <b>{blog.creator || "DKM"}</b>
					</small>
				</div>
			</div>
		</div>
	);
}

export default BlogItem;

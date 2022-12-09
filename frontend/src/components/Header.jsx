import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { IoMdImages } from "react-icons/io";
import { MdArrowUpward } from "react-icons/md";
import { MdArrowDownward } from "react-icons/md";

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const [navbarOpen, setNavbarOpen] = useState(false);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/");
	};
	const handleToggle = () => {
		// console.log("menu changed");
		setNavbarOpen((prev) => !prev);
	};
	const handleClick = () => {
		// console.log("menu changed");
		if (navbarOpen) {
			setNavbarOpen((prev) => false);
		}
	};

	return (
		<header className="header">
			<div className="logo">
				<NavLink to="/">&gt;&gt; DKGRAM &lt;&lt;</NavLink>
			</div>
			{user ? (
				<nav className="navBar">
					<button onClick={handleToggle}>
						{navbarOpen ? (
							<div className="menubtn">
								close
								<MdArrowUpward />
							</div>
						) : (
							<div className="menubtn">
								{user.name.split(" ")[0]}
								<MdArrowDownward />
							</div>
						)}
					</button>

					<ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
						<NavLink
							className={({ isActive }) =>
								isActive ? "active" : "inactive"
							}
							to="/"
							onClick={handleClick}
						>
							<li>
								<AiFillHome />
								Home
							</li>
						</NavLink>
						<NavLink
							to="/myblogs"
							className={({ isActive }) =>
								isActive ? "active" : "inactive"
							}
							onClick={handleClick}
						>
							<li>
								<IoMdImages /> My Blogs
							</li>
						</NavLink>

						<NavLink
							to="/blogform"
							className={({ isActive }) =>
								isActive ? "active" : "inactive"
							}
							onClick={handleClick}
						>
							<li>
								<RiImageAddFill /> Add Blog
							</li>
						</NavLink>

						{/* <button className="" onClick={onLogout}> */}
						<a href="" onClick={onLogout}>
							<li>
								<FaSignOutAlt /> Logout
							</li>
						</a>
					</ul>
				</nav>
			) : (
				<div className="no-user">
					<ul>
						<NavLink
							to="/login"
							className={({ isActive }) =>
								isActive ? "active" : "inactive"
							}
						>
							<li>
								<FaSignInAlt /> Login
							</li>
						</NavLink>
						<NavLink
							to="/register"
							className={({ isActive }) =>
								isActive ? "active" : "inactive"
							}
						>
							<li>
								<FaUser /> Register
							</li>
						</NavLink>
					</ul>
				</div>
			)}
			{/* <ul>
				{user ? (
					<>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? "active" : "inactive"
								}
								to="/"
							>
								<FaSignInAlt />
								-Home-
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/myblogs"
								className={({ isActive }) =>
									isActive ? "active" : "inactive"
								}
							>
								<FaSignInAlt /> My Blogs
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/blogform"
								className={({ isActive }) =>
									isActive ? "active" : "inactive"
								}
							>
								<FaSignInAlt /> Add Blog
							</NavLink>
						</li>
						<li>
							<button className="btn" onClick={onLogout}>
								<FaSignOutAlt /> Logout
							</button>
						</li>
					</>
				) : (
					<>
						<li>
							<NavLink to="/login" activeClassName="active">
								<FaSignInAlt /> Login
							</NavLink>
						</li>
						<li>
							<NavLink to="/register" activeClassName="active">
								<FaUser /> Register
							</NavLink>
						</li>
					</>
				)}
			</ul> */}
		</header>
	);
}

export default Header;

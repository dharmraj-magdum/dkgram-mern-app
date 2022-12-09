import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
// import Spinner from "../gcomponents/Spinner";
import MySpinner from "../components/MySpinner";

function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);
	useEffect(() => {
		if (isError) {
			// toast.error(message);
			console.log(message);
		}

		if (isSuccess || user) {
			navigate("/");
		}

		// dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email,
			password,
		};
		// console.log(userData);

		dispatch(login(userData));
	};

	if (isLoading) {
		return <MySpinner size={300} />;
	}

	return (
		<div className="container2">
			<section className="heading">
				<div className="title">
					<FaSignInAlt /> Login
				</div>
				<p>Login and start exploring</p>
			</section>

			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="email"
							name="email"
							value={email}
							placeholder="Enter your email"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="password"
							name="password"
							value={password}
							placeholder="Enter password"
							onChange={onChange}
						/>
					</div>

					<div className="form-group">
						<button type="submit" className="btn btn-block">
							Submit
						</button>
					</div>
				</form>
			</section>
			{isError && <div className="error">{message}</div>}
		</div>
	);
}

export default Login;

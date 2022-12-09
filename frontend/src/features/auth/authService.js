import axios from "axios";

const API_URL = "/api/user/";

// Register user
const register = async (userData) => {
	var response;
	var AxiosError;
	await axios
		.post(API_URL, userData)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});

	if (response) {
		localStorage.setItem("user", JSON.stringify(response.data));
		return response.data;
	}
	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
};

// Login user
const login = async (userData) => {
	var response;
	var AxiosError;
	await axios
		.post(API_URL + "login", userData)
		.then((res) => {
			response = res;
		})
		.catch((err) => {
			console.log(err);
			AxiosError = err;
		});

	if (response) {
		localStorage.setItem("user", JSON.stringify(response.data));
		return response.data;
	}
	if (AxiosError) {
		const message = AxiosError.response.data.message;
		// console.log(message);
		throw new Error(message);
	}
};

// Logout user
const logout = () => {
	localStorage.removeItem("user");
};

const authService = {
	register,
	logout,
	login,
};

export default authService;

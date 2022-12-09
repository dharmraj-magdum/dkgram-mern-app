import React from "react";
import { RingLoader } from "react-spinners";

const MySpinner = ({ size }) => {
	var CSSProperties;
	if (size <= 100) {
		CSSProperties = {
			display: "inline-block",
			margin: "10px auto",
			z_index: "5000",
		};
	} else {
		CSSProperties = {
			position: "fixed",
			top: "0",
			right: "0",
			bottom: "0",
			left: "0",
			display: "inline-block",
			margin: "auto",
			z_index: "5000",
		};
	}
	return (
		<RingLoader
			color="#482673"
			loading={true}
			cssOverride={CSSProperties}
			size={size}
			aria-label="Loading Spinner"
			data-testid="loader"
		/>
	);
};

export default MySpinner;

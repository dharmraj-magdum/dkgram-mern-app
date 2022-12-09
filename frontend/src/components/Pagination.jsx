import React, { useEffect } from "react";
import { useState } from "react";

const Pagination = ({ currentPage, setCurrentPage, pageCount }) => {
	const [goPrev, setGoPrev] = useState(true);
	const [goNext, setGoNext] = useState(true);

	// useEffect(() => {}, [currentPage]);

	const previousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			setGoPrev(true);
		} else {
			// console.log("go prev from ", currentPage);
			setGoPrev(false);
			setGoNext(true);
		}
	};
	const nextPage = () => {
		if (currentPage < pageCount) {
			// console.log("go prev from ", currentPage);
			setCurrentPage(currentPage + 1);
			setGoNext(true);
			setGoPrev(true);
		} else {
			setGoNext(false);
			setGoPrev(true);
		}
	};
	const setPage = (no) => {
		// console.log("go prev from ", currentPage);
		setCurrentPage(no);
	};
	// console.log("now current page is ", currentPage);
	// console.log("pagecount is  ", pageCount);
	return (
		<ul className="pagination">
			{goPrev ? (
				<li className="page-item">
					<a onClick={previousPage}>Prev</a>
				</li>
			) : (
				<li className="disable">
					<a>Prev</a>
				</li>
			)}

			{/* {PageNum.map((item) => (
					<li key={item} className="page-item">
						<a onClick={() => setPage(item)}> {item}</a>
					</li>
				))} */}
			{goNext ? (
				<li className="page-item">
					<a onClick={nextPage}>Next</a>
				</li>
			) : (
				<li className="disable">
					<a>next</a>
				</li>
			)}
		</ul>
	);
};

export default Pagination;

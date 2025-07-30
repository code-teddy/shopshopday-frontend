import React from "react";
import { Pagination } from "react-bootstrap";

const Paginator = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
    let active = currentPage;
    let items = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        items.push(
            <Pagination.Item
                key={i}
                active={active === i}
                onClick={() => paginate(i)}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
        <div className="d-flex justify-content-center me-5">
            <Pagination>{items}</Pagination>
        </div>
    );
};

export default Paginator;

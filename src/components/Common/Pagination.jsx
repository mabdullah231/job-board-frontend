import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination_wrap">
            <ul>
                <li>
                    <a href="#" onClick={() => onPageChange(currentPage - 1)}>
                        <i className="ti-angle-left"></i>
                    </a>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index + 1}>
                        <a href="#" onClick={() => onPageChange(index + 1)}>
                            <span>{index + 1}</span>
                        </a>
                    </li>
                ))}
                <li>
                    <a href="#" onClick={() => onPageChange(currentPage + 1)}>
                        <i className="ti-angle-right"></i>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
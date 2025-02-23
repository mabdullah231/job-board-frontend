import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const styles = {
        paginationWrap: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
        },
        ul: {
            listStyle: "none",
            display: "flex",
            padding: 0,
        },
        li: {
            margin: "0 5px",
        },
        link: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            backgroundColor: "#f5f5f5",
            color: "#333",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "background 0.3s, color 0.3s",
            cursor: "pointer",
        },
        linkHover: {
            backgroundColor: "#00D312",
            color: "#fff",
        },
        active: {
            backgroundColor: "#00D363",
            color: "#fff",
            fontWeight: "bold",
        },
    };

    return (
        <div style={styles.paginationWrap}>
            <ul style={styles.ul}>
                <li style={styles.li}>
                    <a
                        href="#"
                        style={styles.link}
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(currentPage - 1);
                        }}
                    >
                        <i className="ti-angle-left"></i>
                    </a>
                </li>
                {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === currentPage;

                    return (
                        <li key={pageNumber} style={styles.li}>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(pageNumber);
                                }}
                                style={{
                                    ...styles.link,
                                    ...(isActive ? styles.active : {}),
                                }}
                            >
                                <span>{pageNumber}</span>
                            </a>
                        </li>
                    );
                })}
                <li style={styles.li}>
                    <a
                        href="#"
                        style={styles.link}
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(currentPage + 1);
                        }}
                    >
                        <i className="ti-angle-right"></i>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;

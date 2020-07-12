import React from "react";

const Pagination = ({ episodePerPage, totalEpisode, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEpisode / episodePerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        {pageNumbers.map(num => (
          <li key={num} className="page-item">
            <span onClick={() => paginate(num)} className="page-link">
              {num}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

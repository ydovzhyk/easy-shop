import React from 'react';

import s from './Pagination.module.scss';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const displayRange = 2; // Кількість сторінок, які відображаються навколо поточної сторінки

    let startPage = Math.max(1, currentPage - displayRange);
    let endPage = Math.min(totalPages, currentPage + displayRange);

    if (currentPage <= displayRange) {
      endPage = Math.min(displayRange * 2 + 1, totalPages);
    }

    if (currentPage >= totalPages - displayRange) {
      startPage = Math.max(totalPages - displayRange * 2, 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pageNumbers.push(page);
    }

    return pageNumbers;
  };

  return (
    <div className={s.paginationSection}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <div className={s.pagesSet}>
        {getPageNumbers().map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? s.active : s.pageBox}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;

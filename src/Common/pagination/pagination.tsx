import React from "react";
import "./pagination.scss";

// Định nghĩa kiểu Props
type Props = {
  totalData: number;
  pagNumber: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({
  totalData,
  pagNumber,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalData / pagNumber);

  // Tạo mảng số trang
  const getPages = () => {
    let pages: number[] = [];

    if (totalPages <= 7) {
      pages = [...Array(totalPages).keys()].map((i) => i + 1);
    } else if (currentPage === totalPages - 2 || currentPage === 3) {
      if (currentPage === totalPages - 2) {
        pages = [
          1,
          2,
          3,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else if (currentPage === 3) {
        pages = [1, 2, 3, 4, totalPages - 2, totalPages - 1, totalPages];
      }
    } else if (currentPage === totalPages - 3 || currentPage === 4) {
      if (currentPage === totalPages - 3) {
        pages = [
          1,
          2,
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else if (currentPage === 4) {
        pages = [1, 2, 3, 4, 5, totalPages - 1, totalPages];
      }
    } else if (
      currentPage === totalPages - 1 ||
      currentPage === 2 ||
      currentPage === totalPages ||
      currentPage === 1
    ) {
      pages = [
        1,
        2,
        3,
        Math.floor(totalPages / 2),
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      pages = [1, 2];
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push(totalPages - 1, totalPages);
    }

    return pages;
  };

  const handleClick = (page: number) => {
    onPageChange(page);
  };

  const renderEllipsis = () => <span className="ellipsis">...</span>;

  const pages = getPages();

  return (
    <div className="pagination">
      <div
        className={`arrow-icon start-arrow ${
          currentPage === 1 ? "disabled" : ""
        }`}
        onClick={() => handleClick(1)}
      ></div>
      <div
        className={`arrow-icon pre-arrow ${
          currentPage === 1 ? "disabled" : ""
        }`}
        onClick={() => handleClick(currentPage - 1)}
      ></div>

      {pages.map((page, index) => (
        <div key={page} className="page">
          {index !== 0 && pages[index - 1] + 1 !== page
            ? renderEllipsis()
            : null}
          {index !== 0 &&
          (currentPage === 4 ||
            currentPage === 3 ||
            currentPage === totalPages - 2 ||
            currentPage === totalPages - 3) &&
          pages[index - 1] + 1 !== page
            ? renderEllipsis()
            : null}
          {/* {index !== 0 &&
          currentPage !== 4 &&
          currentPage !== 5 &&
          currentPage !== totalPages - 3 &&
          currentPage !== totalPages - 4 &&
          pages[index - 1] + 1 !== page
            ? renderEllipsis()
            : null} */}
          <span
            className={`page-number ${page === currentPage ? "active" : ""}`}
            onClick={() => handleClick(page)}
          >
            {page}
          </span>
        </div>
      ))}

      <div
        className={`arrow-icon next-arrow ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={() => handleClick(currentPage + 1)}
      ></div>
      <div
        className={`arrow-icon end-arrow ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={() => handleClick(totalPages)}
      ></div>
    </div>
  );
};

export default Pagination;

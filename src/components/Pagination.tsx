interface PaginationProps {
    pageCount: number,
    currentPage: number,
    onPageChange: Function
};

function Pagination({pageCount, currentPage, onPageChange}: PaginationProps) {

    const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  
    return (
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
              <button onClick={() => onPageChange(page)} className="page-link">
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
}

export default Pagination;
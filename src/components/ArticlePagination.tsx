import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/actions';
import { RootState, AppDispatch } from '../redux/store';
import './ArticlePagination.css';


interface PaginationProps {
    pageCount: number,
    currentPage: number,
    onPageChange: Function
};

function ArticlePagination({pageCount}: PaginationProps) {

    const dispatch = useDispatch<AppDispatch>();
    const currentPage = useSelector((state: RootState) => state.pagination.currentPage);
    const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    }; 

    return (
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
              <button onClick={() => handlePageChange(page)} className="page-link">
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
}

export default ArticlePagination;
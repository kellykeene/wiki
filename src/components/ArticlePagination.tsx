import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/articlesSlice';
import { RootState, AppDispatch } from '../redux/store';

import './ArticlePagination.css';

function ArticlePagination() {

    const dispatch = useDispatch<AppDispatch>();

    const currentPage = useSelector((state: RootState) => state.articles.currentPage);
    const totalPages = useSelector((state: RootState) => state.articles.totalPages);
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

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
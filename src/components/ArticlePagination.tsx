import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/articlesSlice';
import { RootState, AppDispatch } from '../redux/store';

import { Pagination } from 'react-bootstrap';

import './ArticlePagination.css';

function ArticlePagination() {

    const dispatch = useDispatch<AppDispatch>();

    const currentPage = useSelector((state: RootState) => state.articles.currentPage);
    const totalPages = useSelector((state: RootState) => state.articles.totalPages);
    
    // Determine the start and end pagination buttons to display
    // based on the current page and the total number of pages.
    // The goal is to display 5 buttons at a time, attempting to
    // keep the current page in the middle when possible.
    const startPage = currentPage >= totalPages-2 ? totalPages - 4 : Math.max(1, currentPage - 2);
    const endPage = Math.min(startPage + 4, totalPages);
    
    const pages = [];
    for (let page = startPage; page <= endPage; page++) {
        pages.push(page);
    }

    // Click handlers
    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    }; 

    const handlePrevClick = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    return (
        totalPages > 0 && 
            <Pagination aria-label="Paginate through the pages">
                <Pagination.Prev onClick={() => handlePrevClick()} disabled={currentPage === startPage} aria-label="View the previous page"></Pagination.Prev>
                {pages.map(page => (
                    <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => handlePageChange(page)}
                        aria-label={`View page ${page}`}
                        className={''}>
                        {page}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handleNextClick()} disabled={currentPage === totalPages} aria-label="View the next page"></Pagination.Next>
            </Pagination>
    );
}

export default ArticlePagination;
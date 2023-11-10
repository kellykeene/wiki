import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/articlesSlice';
import { RootState, AppDispatch } from '../redux/store';

import { Pagination } from 'react-bootstrap';

import './ArticlePagination.css';

function ArticlePagination() {

    const dispatch = useDispatch<AppDispatch>();

    const currentPage = useSelector((state: RootState) => state.articles.currentPage);
    const totalPages = useSelector((state: RootState) => state.articles.totalPages);
    
    const startPage = currentPage >= totalPages-2 ? totalPages - 4 : Math.max(1, currentPage - 2);
    const endPage = Math.min(startPage + 4, totalPages);
    
    const pages = [];
    for (let page = startPage; page <= endPage; page++) {
        pages.push(page);
    }

    const handlePageChange = (page: number) => {
        console.log(`handlePageChange: ${page}`);
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
        <Pagination>
            <Pagination.Prev onClick={() => handlePrevClick()} disabled={currentPage === startPage}></Pagination.Prev>
            {pages.map(page => (
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                    className={'page-link'}>
                    {page}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handleNextClick()} disabled={currentPage === totalPages}></Pagination.Next>
        </Pagination>
    );
}

export default ArticlePagination;
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { getMostViewedPages } from '../redux/wikiSlice';

import ArticleDatePicker from './ArticleDatePicker';
import Pagination from './Pagination';

function WikiView() {

    // User filters
    const [date, setDate] = useState<Date>(new Date(Date.now() - 86400000)); // default to yesterday
    const [resultsPerPage, setResultsPerPage] = useState<number>(100); // default to 100 results per page
    const [country, setCountry] = useState('en.wikipedia'); // default to english

    // Redux
    const dispatch = useDispatch<AppDispatch>();
    const { articles, loading, error } = useSelector((state: RootState) => state.wiki);
    
    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);   // default to page 1
    const pageCount = Math.ceil(articles.length/resultsPerPage); // calulate how many pages we need 
                                                                 // per results per page setting
    // Determine the articles to display on the current page
    const indexOfLastArticle = currentPage * resultsPerPage;
    const indexOfFirstArticle = indexOfLastArticle - resultsPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    // Handler for paginating
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Handler for Search button submit
    const handleSubmit = () => {
        dispatch(getMostViewedPages({ project: country, date }));
    };

  return (
    <div>
        <ArticleDatePicker value={date} onChange={setDate} />

        <select value={resultsPerPage.toString()} onChange={(e) => setResultsPerPage(Number(e.target.value))}>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
            <option value="200">200</option>
        </select>

        <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="en.wikipedia">English</option>
            <option value="de.wikipedia">German</option>
            {/* Add more options as needed */}
        </select>

        <button onClick={handleSubmit}>Search</button>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <ul>
            {currentArticles.map((article, index) => (
            <li key={index}>
                {article.rank}. {article.article} - Views: {article.views}
            </li>
            ))}
        </ul>

        <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageChange} />
    </div>
  );
}

export default WikiView;

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { getMostViewedPages } from '../redux/wikiSlice';
import ArticleDatePicker from './ArticleDatePicker';
import Pagination from './Pagination';

function WikiView() {
    // User filters
    const [date, setDate] = useState<Date>(new Date(Date.now() - 24 * 60 * 60 * 1000)); // default to yesterday
    const [resultsPerPage, setResultsPerPage] = useState<number>(100);
    const [country, setCountry] = useState('en.wikipedia');

    // Redux
    const dispatch = useDispatch<AppDispatch>();

    // Articles and pagination
    const { articles, loading, error } = useSelector((state: RootState) => state.wiki);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageCount = Math.ceil(articles.length/resultsPerPage);

    const indexOfLastArticle = currentPage * resultsPerPage;
    const indexOfFirstArticle = indexOfLastArticle - resultsPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    console.log(`articles.length: ${articles.length} currentPage: ${currentPage} pageCount: ${pageCount} indexOfFirstArticle: ${indexOfFirstArticle} indexOfLastArticle: ${indexOfLastArticle}`);

    const handlePageChange = (pageNumber: number) => {
        console.log(`Setting current page to ${pageNumber}`);
        setCurrentPage(pageNumber);
    };

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

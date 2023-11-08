import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { getMostViewedPages } from '../redux/wikiSlice';

import ArticleDatePicker from './ArticleDatePicker';
import Pagination from './Pagination';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import './WikiArticlesView.css';

function WikiArticlesView() {

    // User filters
    const [date, setDate] = useState<Date>(new Date(Date.now() - 86400000)); // default to yesterday
    const [datePickerIsOpen, setDatePickerIsOpen] = useState<boolean>(false); // default to date picker closed
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

    <Container fluid>
        <Row>
            <Col>
                <h2>Top Wikipedia articles</h2>
            </Col>
        </Row>
        <Row>
            <Col sm>
                <FloatingLabel controlId="floatingSelectDate" label="Date">
                    <Form.Select onFocus={(e) => e.stopPropagation()} onClick={() => setDatePickerIsOpen(!datePickerIsOpen)} value={date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}>
                        <option value="1">{date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}</option>
                    </Form.Select>
                </FloatingLabel>
                <ArticleDatePicker isOpen={datePickerIsOpen} value={date} onChange={setDate} />
            </Col>
            <Col sm>
                <FloatingLabel controlId="floatingSelectResults" label="Num results">
                    <Form.Select value={resultsPerPage.toString()} onChange={(e) => setResultsPerPage(Number(e.target.value))}>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                    </Form.Select>
                </FloatingLabel>
            </Col>
            <Col sm>
                <FloatingLabel controlId="floatingSelectResults" label="Num results">
                    <Form.Select value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option value="en.wikipedia">English</option>
                        <option value="de.wikipedia">German</option>
                        {/* Add more options as needed */}
                    </Form.Select>
                </FloatingLabel>
            </Col>
            <Col sm>
                <Button variant='light' style={{ color: '#FFFFFF', backgroundColor: '#025B4B' }} className="btn btn-lg center modal-button rounded-pill" onClick={handleSubmit}>Search</Button>
            </Col>
        </Row>
        <Row>
            <Col>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                <Container id="articlesContainer">
                    {currentArticles.map((article) => (
                        <Row>
                            <Col className="p-2 rank">{article.rank}</Col>
                            <Col className="p-2 title">{(article.article).toString().replaceAll('_', ' ')}</Col>
                            <Col className="p-2 views">{article.views} views</Col>
                        </Row>
                    ))}
                </Container>
            </Col>
            <Col></Col>
            <Col></Col>
        </Row>
        <Row>
            <Col>
                <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageChange} />
            </Col>
        </Row>
    </Container>
  );
}

export default WikiArticlesView;

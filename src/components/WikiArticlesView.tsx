import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { getMostViewedPages } from '../redux/wikiSlice';

import ArticleDatePicker from './ArticleDatePicker';
import ArticlePagination from './ArticlePagination';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import datepickerIcon from '../assets/datepicker.png';
import numResultsIcon from '../assets/numresults.png';
import countryIcon from '../assets/country.png';

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
            <Col xs={12}>
                <h2>Top Wikipedia articles</h2>
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                <Container id="filterContainer" fluid>
                    <Row>
                        <Col xs={12} md={3}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={datepickerIcon} alt='Date picker icon' />
                                <FloatingLabel controlId="floatingSelectDate" label="Date">
                                    <Form.Select onFocus={(e) => e.stopPropagation()} onClick={() => setDatePickerIsOpen(!datePickerIsOpen)} value={date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}>
                                        <option value="1">{date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}</option>
                                    </Form.Select>
                                </FloatingLabel>
                                <div className="vr d-none d-md-block" />
                            </div>
                            <ArticleDatePicker isOpen={datePickerIsOpen} value={date} onChange={setDate} />
                        </Col>
                        <Col xs={12} md={3}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={numResultsIcon} alt='Num results icon' />
                                <FloatingLabel controlId="floatingSelectResults" label="Num results">
                                    <Form.Select value={resultsPerPage.toString()} onChange={(e) => setResultsPerPage(Number(e.target.value))}>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="75">75</option>
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                    </Form.Select>
                                </FloatingLabel>
                                <div className="vr d-none d-md-block" />
                            </div>
                        </Col>
                        <Col xs={12} md={3}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={countryIcon} alt='Country icon' />
                                <FloatingLabel controlId="floatingCountry" label="Country">
                                    <Form.Select value={country} onChange={(e) => setCountry(e.target.value)}>
                                        <option value="en.wikipedia">English</option>
                                        <option value="de.wikipedia">German</option>
                                        <option value="fr.wikipedia">French</option>
                                        <option value="es.wikipedia">Spanish</option>
                                        <option value="ru.wikipedia">Russian</option>
                                        <option value="ja.wikipedia">Japanese</option>
                                        <option value="it.wikipedia">Italian</option>
                                        <option value="zh.wikipedia">Chinese</option>
                                        <option value="pt.wikipedia">Portuguese</option>
                                        <option value="ar.wikipedia">Arabic</option>
                                        <option value="pl.wikipedia">Polish</option>
                                        <option value="fa.wikipedia">Persian</option>
                                        <option value="tr.wikipedia">Turkish</option>
                                        <option value="nl.wikipedia">Dutch</option>
                                        <option value="id.wikipedia">Indonesian</option>
                                        <option value="sv.wikipedia">Swedish</option>
                                        <option value="uk.wikipedia">Ukrainian</option>
                                        <option value="he.wikipedia">Hebrew</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </div>
                        </Col>
                        <Col xs={12} md={3}>
                            <div className="d-grid gap-2">
                                <Button variant='light' style={{ color: '#FFFFFF', backgroundColor: '#025B4B' }} className="btn btn-lg center modal-button rounded-pill" onClick={handleSubmit}>Search</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                <Container id="articlesContainer" fluid>
                    {currentArticles.map((article, index) => (
                        <Row key={index}>
                            <Col xs={1} className="p-2 rank">{article.rank}</Col>
                            <Col className="p-2 title">{(article.article).toString().replaceAll('_', ' ')}</Col>
                            <Col className="p-2 views">{article.views} views</Col>
                        </Row>
                    ))}
                </Container>
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                <ArticlePagination currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageChange} />
            </Col>
        </Row>
    </Container>
  );
}

export default WikiArticlesView;

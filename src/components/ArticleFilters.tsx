import { useState, useEffect, useRef } from 'react';
import { RootState, AppDispatch } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticles, setResultsPerPage } from '../redux/articlesSlice';

import ArticleDatePicker from './ArticleDatePicker';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import datepickerIcon from '../assets/datepicker.png';
import numResultsIcon from '../assets/numresults.png';
import countryIcon from '../assets/country.png';

import './ArticleFilters.css';

function ArticleFilters() {

    // Redux dispatcher
    const dispatch = useDispatch<AppDispatch>();

    // Date filter
    const [date, setDate] = useState<Date>(new Date(Date.now() - 86400000)); // default to yesterday
    const selectedDateDisplay = date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
    const [datePickerIsOpen, setDatePickerIsOpen] = useState<boolean>(false); // default to date picker closed
    
    // Country filter
    const [country, setCountry] = useState('en.wikipedia'); // default to english

    // Number of results filter
    const resultsPerPage = useSelector((state: RootState) => state.articles.resultsPerPage);
    
    // Handler for setting the number of results per page
    const handleSetResultsPerPage = (numResults: number) => {
        dispatch(setResultsPerPage(numResults));
    };

    // Handler for Search button submit
    const handleSubmit = () => {
        dispatch(fetchArticles({country, date}));
    };
    
    // Logic for closing the datepicker when the user clicks outside of it
    const datepickerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        // Close the datepicker
        if (datepickerRef.current && !datepickerRef.current.contains(event.target as Node)) {
            setDatePickerIsOpen(false);
        }
    };

    useEffect(() => {
        // Add when the component is mounted
        document.addEventListener('mousedown', handleClickOutside, true);
        
        // Remove when the component is unmounted
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, []);

    const handleDateSelectChange = () => {
        setDatePickerIsOpen(false);
    };

    return (
        <Container id="filterContainer" fluid>
            <Row>
                <Col sm={12} md={3} className="vertical-rule">

                    {/* datePickerRef is used to define the area around the open datepicker control 
                    so that we can detect when the user clicks outside of it and close the control. */}
                    <div ref={datepickerRef}>

                        {/* Grouping of icon, select, and label */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={datepickerIcon} alt='Date picker icon' />
                            <div className="select-container">
                                <FloatingLabel title="floatingSelectDateLabel" label="Date">
                                    <Form.Select data-testid="date-select" value={selectedDateDisplay} onChange={() => handleDateSelectChange()}>
                                        <option data-testid="date-select-option" value="1">{selectedDateDisplay}</option>
                                    </Form.Select>
                                </FloatingLabel>
                                <div title="dateOverlay" className="overlay" onClick={() => setDatePickerIsOpen(!datePickerIsOpen)} aria-label="Select a date"></div>
                            </div>
                        </div>
                        <ArticleDatePicker isOpen={datePickerIsOpen} value={date} onChange={setDate} />
                    </div>
                </Col>
                <Col sm={12} md={3} className="vertical-rule">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={numResultsIcon} alt='Num results icon' />
                        <FloatingLabel title="floatingSelectResultsLabel" label="Num results">
                            <Form.Select data-testid="num-results-select" value={resultsPerPage.toString()} onChange={(e) => handleSetResultsPerPage(Number(e.target.value))} aria-label="Select the number of results per page">
                                <option data-testid="num-results-select-option" value="25">25</option>
                                <option data-testid="num-results-select-option" value="50">50</option>
                                <option data-testid="num-results-select-option" value="75">75</option>
                                <option data-testid="num-results-select-option" value="100">100</option>
                                <option data-testid="num-results-select-option" value="200">200</option>
                            </Form.Select>
                        </FloatingLabel>
                    </div>
                </Col>
                <Col sm={12} md={3}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={countryIcon} alt='Country icon' />
                        <FloatingLabel title="floatingCountryLabel" label="Country">
                            <Form.Select data-testid="country-select" value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Select a country">
                                <option data-testid="country-select-option" value="en.wikipedia">English</option>
                                <option data-testid="country-select-option" value="de.wikipedia">German</option>
                                <option data-testid="country-select-option" value="fr.wikipedia">French</option>
                                <option data-testid="country-select-option" value="es.wikipedia">Spanish</option>
                                <option data-testid="country-select-option" value="ru.wikipedia">Russian</option>
                                <option data-testid="country-select-option" value="ja.wikipedia">Japanese</option>
                                <option data-testid="country-select-option" value="it.wikipedia">Italian</option>
                                <option data-testid="country-select-option" value="zh.wikipedia">Chinese</option>
                                <option data-testid="country-select-option" value="pt.wikipedia">Portuguese</option>
                                <option data-testid="country-select-option" value="ar.wikipedia">Arabic</option>
                                <option data-testid="country-select-option" value="pl.wikipedia">Polish</option>
                                <option data-testid="country-select-option" value="fa.wikipedia">Persian</option>
                                <option data-testid="country-select-option" value="tr.wikipedia">Turkish</option>
                                <option data-testid="country-select-option" value="nl.wikipedia">Dutch</option>
                                <option data-testid="country-select-option" value="id.wikipedia">Indonesian</option>
                                <option data-testid="country-select-option" value="sv.wikipedia">Swedish</option>
                                <option data-testid="country-select-option" value="uk.wikipedia">Ukrainian</option>
                                <option data-testid="country-select-option" value="he.wikipedia">Hebrew</option>
                            </Form.Select>
                        </FloatingLabel>
                    </div>
                </Col>
                <Col sm={12} md={3}>
                    <div className="d-grid gap-2">
                        <Button 
                            variant='light' 
                            style={{ color: '#FFFFFF', backgroundColor: '#025B4B' }} 
                            className="btn btn-lg center modal-button rounded-pill" 
                            onClick={handleSubmit} 
                            aria-label="Search for top articles">
                                Search
                            </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ArticleFilters;
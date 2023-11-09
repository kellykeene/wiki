import { useState, useEffect, useRef } from 'react';
import { RootState, AppDispatch } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { getMostViewedPages } from '../redux/articlesSlice';
import { setResultsPerPage } from '../redux/actions';

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

    // User filters
    const [date, setDate] = useState<Date>(new Date(Date.now() - 86400000)); // default to yesterday
    const selectedDateDisplay = date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
    const [datePickerIsOpen, setDatePickerIsOpen] = useState<boolean>(false); // default to date picker closed
    const resultsPerPage = useSelector((state: RootState) => state.pagination.resultsPerPage);
    const [country, setCountry] = useState('en.wikipedia'); // default to english

    // Handler for setting the number of results per page
    const handleSetResultsPerPage = (numResults: number) => {
        dispatch(setResultsPerPage(numResults));
    };

    // Handler for Search button submit
    const handleSubmit = () => {
        dispatch(getMostViewedPages({ country: country, date }));
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

    return (
        <Container id="filterContainer" fluid>
            <Row>
                <Col sm={12} md={3}>

                    {/* datePickerRef is used to define the area around the open datepicker control 
                    so that we can detect when the user clicks outside of it and close the control. */}
                    <div ref={datepickerRef}>

                        {/* Grouping of icon, select, and label */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={datepickerIcon} alt='Date picker icon' />
                            <div className="select-container">
                                <FloatingLabel controlId="floatingSelectDate" label="Date">
                                    <Form.Select onFocus={(e) => e.stopPropagation()} onChange={undefined} value={selectedDateDisplay}>
                                        <option value="1">{selectedDateDisplay}</option>
                                    </Form.Select>
                                </FloatingLabel>
                                <div className="overlay" onClick={() => setDatePickerIsOpen(!datePickerIsOpen)}></div>
                            </div>
                            <div className="vr d-none d-md-block" />
                        </div>
                        
                        <ArticleDatePicker isOpen={datePickerIsOpen} value={date} onChange={setDate} />
                    
                    </div>
                </Col>
                <Col sm={12} md={3}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={numResultsIcon} alt='Num results icon' />
                        <FloatingLabel controlId="floatingSelectResults" label="Num results">
                            <Form.Select value={resultsPerPage.toString()} onChange={(e) => handleSetResultsPerPage(Number(e.target.value))}>
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
                <Col sm={12} md={3}>
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
                <Col sm={12} md={3}>
                    <div className="d-grid gap-2">
                        <Button variant='light' style={{ color: '#FFFFFF', backgroundColor: '#025B4B' }} className="btn btn-lg center modal-button rounded-pill" onClick={handleSubmit}>Search</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ArticleFilters;
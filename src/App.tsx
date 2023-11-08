import { Provider } from 'react-redux';
import { store } from './redux/store';
import WikiArticlesView from './components/WikiArticlesView';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <WikiArticlesView />
      </div>
    </Provider>
  );
}

export default App;

// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Container, Navbar, Nav, Form, FormControl, Button, Row, Col, Dropdown } from 'react-bootstrap';
// import DatePicker from 'react-datepicker';

// const App: React.FC = () => {
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [articlesCount, setArticlesCount] = useState<number>(10);
//   const [country, setCountry] = useState<string>('us');
//   // Define other states and logic for fetching articles here

//   const handleFetchArticles = () => {
//     // Logic to fetch articles based on the filters
//   };

//   return (
//     <div>
//       <Navbar bg="light" expand="lg">
//         <Container fluid>
//           <Navbar.Brand href="#">Article Viewer</Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="me-auto my-2 my-lg-0"
//               style={{ maxHeight: '100px' }}
//               navbarScroll
//             >
//               {/* Date Picker Filter */}
//               <Form inline>
//                 <DatePicker
//                   selected={selectedDate}
//                   onChange={(date: Date) => setSelectedDate(date)}
//                   className="form-control"
//                 />
//               </Form>

//               {/* Number of Results Filter */}
//               <Dropdown>
//                 <Dropdown.Toggle variant="success" id="dropdown-basic">
//                   {articlesCount} Results
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu>
//                   {[10, 20, 30, 40, 50].map((count) => (
//                     <Dropdown.Item key={count} onClick={() => setArticlesCount(count)}>
//                       {count} Results
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </Dropdown>

//               {/* Country Filter */}
//               <Form inline>
//                 <FormControl
//                   type="text"
//                   placeholder="Country"
//                   className="mr-sm-2"
//                   value={country}
//                   onChange={(e) => setCountry(e.target.value)}
//                 />
//               </Form>
//             </Nav>

//             {/* Search Button */}
//             <Button variant="outline-success" onClick={handleFetchArticles}>Search</Button>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <Container>
//         <Row>
//           {/* List of articles should be rendered here */}
//           {/* This is just a placeholder */}
//           <Col>
//             <h2>Articles List</h2>
//             {/* You would map over your fetched articles here */}
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default App;



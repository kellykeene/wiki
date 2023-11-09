import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import ArticleFilters from './ArticleFilters';
import ArticlePagination from './ArticlePagination';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './ArticlesLayout.css';

function ArticlesLayout() {

    // Articles
    const { articles, loading, error } = useSelector((state: RootState) => state.articles);
    
    // Pagination
    const currentPage = useSelector((state: RootState) => state.pagination.currentPage);
    const resultsPerPage = useSelector((state: RootState) => state.pagination.resultsPerPage);

    // Determine the subset of articles to display on the current page
    const pageCount = Math.ceil(articles.length/resultsPerPage);
    const indexOfLastArticle = currentPage * resultsPerPage;
    const indexOfFirstArticle = indexOfLastArticle - resultsPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    return (
        <Container fluid>
            <Row>
                <Col xs={12}>
                    <h2>Top Wikipedia articles</h2>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <ArticleFilters />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Container id="articlesContainer" fluid>
                        {loading && <p>Loading...</p>}
                        {error && <p>An error occurred: {error}</p>}
                        {!loading && !error && articles.length === 0 && <p>No articles found</p>}
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
                    <ArticlePagination pageCount={pageCount} />
                </Col>
            </Row>
        </Container>
    );
}

export default ArticlesLayout;

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import ArticleFilters from './ArticleFilters';
import ArticlePagination from './ArticlePagination';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './ArticlesLayout.css';

function ArticlesLayout() {

    // Article fetching state, subset of fetched articles to display for the current/active page
    const { loading, error, currentPageArticles } = useSelector((state: RootState) => state.articles);
    
    return (
        <Container fluid>
            <Row>
                <Col xs={12}>
                    <ArticleFilters data-testid="articleFilters" />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Container id="articlesContainer" fluid>
                        {loading && <p>Loading...</p>}
                        {error && <p>An error occurred: {error}</p>}
                        {!loading && !error && currentPageArticles.length === 0 && <p>No articles found</p>}
                        {currentPageArticles.map((article, index) => (
                            <Row key={index}>
                                <Col xs={2} md={1} className="p-2 rank">{article.rank}</Col>
                                <Col className="p-2 title">{(article.article).toString().replaceAll('_', ' ')}</Col>
                                <Col className="p-2 views">{article.views} views</Col>
                            </Row>
                        ))}
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <ArticlePagination data-testid="articlePagination" />
                </Col>
            </Row>
        </Container>
    );
}

export default ArticlesLayout;

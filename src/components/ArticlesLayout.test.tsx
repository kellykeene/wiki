import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

import ArticlesLayout from './ArticlesLayout';

describe('ArticlesLayout component', () => {

    test('ArticlesLayout component contains layout elements'), () => {
        render(<ArticlesLayout />)
  
        const articleContainerElement = screen.getByTestId('articlesContainer') as HTMLElement;
        expect(articleContainerElement).toBeInTheDocument();

        const articleFiltersElement = screen.getByTestId('articleFilters');
        expect(articleFiltersElement).toBeInTheDocument();

        const articlePaginationElement = screen.getByTestId('articlePagination');
        expect(articlePaginationElement).toBeInTheDocument();
    }

    test('should handle Search button click', () => {
        render(<Provider store={store}>
            <ArticlesLayout />
        </Provider>);

        const articleContainerElement = screen.getByTestId('articlesContainer');
        expect(articleContainerElement).toBeInTheDocument();

        const articleContainerDefaultText = screen.getByText('No articles found');
        expect(articleContainerDefaultText).toBeInTheDocument();

        expect(articleContainerElement).toContainElement(articleContainerDefaultText);

        const searchButtonElement = screen.getByText('Search');
        
        fireEvent.click(searchButtonElement);

        expect(articleContainerElement).not.toContainElement(articleContainerDefaultText);
    })
});
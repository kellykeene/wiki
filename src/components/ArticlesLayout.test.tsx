import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import ArticlesLayout from './ArticlesLayout';

describe('ArticlesLayout component', () => {

    test('ArticlesLayout component contains layout elements'), () => {
        render(<ArticlesLayout />)
  
        const articleContainerElement = screen.getByLabelText('articleContainer');
        expect(articleContainerElement).toBeInTheDocument();

        const articleFiltersElement = screen.getByTestId('articleFilters');
        expect(articleFiltersElement).toBeInTheDocument();

        const articlePaginationElement = screen.getByTestId('articlePagination');
        expect(articlePaginationElement).toBeInTheDocument();
    }
});
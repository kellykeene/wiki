import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import ArticleFilters from './ArticleFilters';

describe('ArticleFilter component', () => {
    
    test('ArticleFilters component contains elements'), () => {
        render(<ArticleFilters />)
  
        const titleElement = screen.getByRole('heading');
        expect(titleElement).toBeInTheDocument();

        const dateInputElement = screen.getByLabelText('Date');
        expect(dateInputElement).toBeInTheDocument();

        screen.debug();
    }

    test('ArticleFilters component contains filter icons'), () => {
        render(<ArticleFilters />)
  
        const datePickerImage = screen.getByAltText("Date picker icon");
        expect(datePickerImage).toBeInTheDocument();

        const numResultsImage = screen.getByAltText("Num results icon");
        expect(numResultsImage).toBeInTheDocument();

        const countryImage = screen.getByAltText("Country icon");
        expect(countryImage).toBeInTheDocument();
    }

    test('ArticleFilters component contains filter labels'), () => {
        render(<ArticleFilters />)
  
        const numResultsInputElement = screen.getByLabelText('Num results');
        expect(numResultsInputElement).toBeInTheDocument();

        const countryInputElement = screen.getByLabelText('Country');
        expect(countryInputElement).toBeInTheDocument();

        const articleContainerElement = screen.queryByText('#articleContainer');
        expect(articleContainerElement).toBeInTheDocument();
    }
});
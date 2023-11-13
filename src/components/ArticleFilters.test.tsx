import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux';
import { store } from '../redux/store';

import ArticleFilters from './ArticleFilters';

describe('ArticleFilters component', () => {
    
    test('ArticleFilters component contains elements'), () => {
        render(<ArticleFilters />)
  
        const articleContainerElement = screen.queryByText('#articleContainer');
        expect(articleContainerElement).toBeInTheDocument();
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
  
        const dateInputElement = screen.getByLabelText('Date');
        expect(dateInputElement).toBeInTheDocument();

        const numResultsInputElement = screen.getByLabelText('Num results');
        expect(numResultsInputElement).toBeInTheDocument();

        const countryInputElement = screen.getByLabelText('Country');
        expect(countryInputElement).toBeInTheDocument();
    }

    test('ArticleFilters component contains Search button'), () => {
        render(<ArticleFilters />)
  
        const searchButtonElement = screen.getByText('Search');
        expect(searchButtonElement).toBeInTheDocument();
    }

    test('ArticleFilters component contains date picker'), () => {
        render(<ArticleFilters />)
  
        const datePickerElement = screen.getByLabelText('Date picker');
        expect(datePickerElement).toBeInTheDocument();
    }
});

describe('ArticleFilters date picker button, select and click events', () => {
    
    test('The date picker button elements are in the document'), () => {
        render(<Provider store={store}>
                <ArticleFilters />
            </Provider>);
        
        const dateOverlayDiv = screen.getByTitle('dateOverlay');
        expect(dateOverlayDiv).toBeInTheDocument();
        
        const dateSelect = screen.getByTestId('date-select') as HTMLSelectElement;
        expect(dateSelect).toBeInTheDocument();
        expect(dateSelect.value).to.equal('1'); // Display Date

        const dateSelectOptions = screen.getAllByTestId('date-select-option') as HTMLOptionElement[];
        expect(dateSelectOptions.length).toBe(1);
    }
});

describe('ArticleFilters num results select and click events', () => {
    test('should correctly set the num results default option', () => {
        render(<Provider store={store}>
            <ArticleFilters />
        </Provider>);

        // Check that the num results option is set to the default of 100
        const options = screen.getAllByTestId('num-results-select-option') as HTMLOptionElement[];
        expect(options[0].selected).toBeFalsy();  // 25
        expect(options[1].selected).toBeFalsy();  // 50
        expect(options[2].selected).toBeFalsy();  // 75
        expect(options[3].selected).toBeTruthy(); // 100
        expect(options[4].selected).toBeFalsy();  // 200
    })
      
    test('should display the correct number of results options', () => {
        render(<Provider store={store}>
            <ArticleFilters />
        </Provider>);
    
        const options = screen.getAllByTestId('num-results-select-option') as HTMLOptionElement[];
        expect(options.length).toBe(5);
    })
      
    test('should allow user to change the num results select', () => {
        render(<Provider store={store}>
            <ArticleFilters />
        </Provider>);

        const numResultsSelect = screen.getByTestId('num-results-select') as HTMLSelectElement;

        // Set the num results option to 25
        fireEvent.change(numResultsSelect, { target: { value: 25 } });
        
        // Check that the num results option is set to 25
        const options = screen.getAllByTestId('num-results-select-option') as HTMLOptionElement[];
        expect(options[0].selected).toBeTruthy(); // 25
        expect(options[1].selected).toBeFalsy();  // 50
        expect(options[2].selected).toBeFalsy();  // 75
        expect(options[3].selected).toBeFalsy();  // 100
        expect(options[4].selected).toBeFalsy();  // 200
    })
});

describe('ArticleFilters country select and click events', () => {
    test('should correctly set the country default option', () => {
        render(<Provider store={store}>
            <ArticleFilters />
        </Provider>);

        // Check that the country option is set to the default of en.wikipedia
        const options = screen.getAllByTestId('country-select-option') as HTMLOptionElement[];
        expect(options[0].selected).toBeTruthy(); // en.wikipedia default
        expect(options[1].selected).toBeFalsy();  // de.wikipediad
        expect(options[2].selected).toBeFalsy();  // fr.wikipedia
        expect(options[3].selected).toBeFalsy(); // es.wikipedia
    })
      
    test('should display the correct country options', () => {
        render(<Provider store={store}>
            <ArticleFilters />
        </Provider>);
    
        const options = screen.getAllByTestId('country-select-option') as HTMLOptionElement[];
        expect(options.length).toBe(18);
    })
      
    test('should allow user to change the country select option', () => {
        render(<Provider store={store}>
            <ArticleFilters />
        </Provider>);

        const countrySelect = screen.getByTestId('country-select') as HTMLSelectElement;

        // Set the country to French
        fireEvent.change(countrySelect, { target: { value: "fr.wikipedia" } });

        // Check that the country option is set to French
        const options = screen.getAllByTestId('country-select-option') as HTMLOptionElement[];
        expect(options[0].selected).toBeFalsy(); // en.wikipedia default
        expect(options[1].selected).toBeFalsy();  // de.wikipediad
        expect(options[2].selected).toBeTruthy();  // fr.wikipedia
        expect(options[3].selected).toBeFalsy(); // es.wikipedia
    })
});

describe('ArticleFilters Search submit', () => {
    test('should handle Search button click', () => {
        render(<Provider store={store}>
            <ArticleFilters />
        </Provider>);

        const searchButtonElement = screen.getByText('Search');
        
        fireEvent.click(searchButtonElement);

        // expect
    })
});
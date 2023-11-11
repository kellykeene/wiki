import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import ArticlesLayout from './ArticlesLayout';

describe('ArticlesLayout component', () => {
    
    test('ArticlesLayout component contains elements'), () => {
        render(<ArticlesLayout />)
  
        const titleElement = screen.getByRole('heading');
        expect(titleElement).toBeInTheDocument();

        const nameInputElement = screen.getByLabelText('Name');
        expect(nameInputElement).toBeInTheDocument();

        const articleContainerElement = screen.getByLabelText('articleContainer');
        expect(articleContainerElement).toBeInTheDocument();
    }
});
import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import ArticlePagination from './ArticlePagination';

describe('ArticlePagination component', () => {
    
    test('ArticlePagination component renders'), () => {
        render(<ArticlePagination />)
  
        screen.debug();
    }
});

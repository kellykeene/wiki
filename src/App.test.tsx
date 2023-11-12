import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';

import App from './App';

describe('App component', () => {
    test('renders App component', () => {
        const { container } = render(<App />);
        
        const h2Element = container.querySelector('h2');

        expect(h2Element).toBeInTheDocument();
        expect(h2Element?.textContent).toBe('Top Wikipedia articles');
    });
});

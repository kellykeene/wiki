import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';

import App from './App';

describe('App component', () => {
    test('renders App component', () => {
        const wrapper = render(<App />);
        expect(wrapper).toBeTruthy();

        const h2 = wrapper.container.querySelector('h2')
        expect(h2?.textContent).toBe('Top Wikipedia articles')
    });
});

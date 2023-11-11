import axios from "axios";

// Example API call:
// https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}

const WIKI_REST_BASE_URL = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top';
    
export const fetchMostViewedPages = async (date: Date, country: string) => {
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    try {
        const response = await axios.get(`${WIKI_REST_BASE_URL}/${country}/all-access/${year}/${month}/${day}`);
        
        if (response && response.data && response.data.items && response.data.items[0] && response.data.items[0].articles) {
            return response.data.items[0].articles;
        } else {
            throw new Error('Invalid response.');
        }
    } catch (error) {
        throw error;
    }
};

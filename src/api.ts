// Example API call:
// https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}

const WIKI_BASE_URL = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top';
    
export const fetchMostViewedPages = async (project: string, date: Date, limit: number) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    console.log(`year: {year} - month: {month} - day: {day}`);
    console.log(`Fetching: ${WIKI_BASE_URL}/${project}/all-access/${year}/${month}/${day}`);

    const response = await fetch(`${WIKI_BASE_URL}/${project}/all-access/${year}/${month}/${day}`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Error fetching data');
    }
  
    const data = await response.json();
    
    return data.items[0].articles.slice(0, limit);
};

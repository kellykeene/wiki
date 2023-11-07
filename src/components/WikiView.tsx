import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { getMostViewedPages } from '../redux/wikiSlice';
import ArticleDatePicker from './ArticleDatePicker';

function WikiView() {
  const [date, setDate] = useState<Date>(new Date(Date.now() - 24 * 60 * 60 * 1000)); // default to yesterday
  const [limit, setLimit] = useState(100);
  const [country, setCountry] = useState('en.wikipedia');
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector((state: RootState) => state.wiki);

  const handleSubmit = () => {
    dispatch(getMostViewedPages({ project: country, date, limit }));
  };

  return (
    <div>
        <ArticleDatePicker value={date} onChange={setDate} />

      {/* <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /> */}
      <input type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value))} />
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="en.wikipedia">English</option>
        <option value="de.wikipedia">German</option>
        {/* Add more options as needed */}
      </select>
      <button onClick={handleSubmit}>Fetch Data</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            {article.rank}. {article.article} - Views: {article.views}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WikiView;

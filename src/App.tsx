import { Provider } from 'react-redux';
import { store } from './redux/store';
import ArticlesLayout from './components/ArticlesLayout';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ArticlesLayout />
      </div>
    </Provider>
  );
}

export default App;
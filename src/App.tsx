import { Provider } from 'react-redux';
import { store } from './redux/store';
import WikiArticlesView from './components/WikiArticlesView';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <WikiArticlesView />
      </div>
    </Provider>
  );
}

export default App;


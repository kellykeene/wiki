import { Provider } from 'react-redux';
import { store } from './redux/store';
import WikiView from './components/WikiView';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <WikiView />
      </div>
    </Provider>
  );
}

export default App;


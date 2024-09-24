import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SearchResultProvider } from './Context/SearchResultContext.jsx';
import { SearchDrawerProvider } from './Context/SearchDrawerContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <SearchResultProvider>
    <SearchDrawerProvider>
      <App />
    </SearchDrawerProvider>
  </SearchResultProvider>,
);

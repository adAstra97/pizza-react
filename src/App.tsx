import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart';
import { SearchProvider } from './context/SearchContext';

import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <SearchProvider>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchProvider>
    </div>
  );
}

export default App;

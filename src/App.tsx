import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home';
import './scss/app.scss';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart';
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

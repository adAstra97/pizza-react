// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { Categories } from './components/Categories/Categories';
import { Header } from './components/Header/Header';
import PizzaItem from './components/PizzaItem/PizzaItem';
import { Sort } from './components/Sort/Sort';
import { pizzaList } from './mocks/pizza.mock';
import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzaList.map(item => (
              <PizzaItem key={item.id} pizza={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

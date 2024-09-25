import { useEffect, useState } from 'react';
import { Categories } from './components/Categories/Categories';
import { Header } from './components/Header/Header';
import PizzaItem from './components/PizzaItem/PizzaItem';
import { Sort } from './components/Sort/Sort';
import './scss/app.scss';
import { IPizza } from './models/pizza.model';
import { Skeleton } from './components/PizzaItem/Skeleton';

function App() {
  const [pizzasData, setPizzasData] = useState<IPizza[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setPizzasData(jsonData);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchData();
  }, []);

  if (error) return <p>Error: {error}</p>;

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
            {isLoading
              ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
              : pizzasData.map(item => (
                  <PizzaItem key={item.id} pizza={item} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

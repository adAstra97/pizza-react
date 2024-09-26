import { useEffect, useState } from 'react';
import { Categories } from '../components/Categories/Categories';
import { Sort } from '../components/Sort/Sort';
import { IPizza } from '../models/pizza.model';
import { Skeleton } from '../components/PizzaItem/Skeleton';
import PizzaItem from '../components/PizzaItem/PizzaItem';

export const Home = () => {
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

        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : pizzasData.map(item => <PizzaItem key={item.id} pizza={item} />)}
      </div>
    </div>
  );
};

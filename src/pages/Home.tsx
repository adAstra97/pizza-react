import { useEffect, useState } from 'react';
import { Categories } from '../components/Categories/Categories';
import { Sort } from '../components/Sort/Sort';
import { IPizza } from '../models/pizza.model';
import { Skeleton } from '../components/PizzaItem/Skeleton';
import PizzaItem from '../components/PizzaItem/PizzaItem';

export const Home = () => {
  const [pizzasData, setPizzasData] = useState<IPizza[]>([]);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeSortType, setSortType] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}?category=${activeCategory}`,
        );

        if (response.status === 404) {
          setErrorMessage('Пиццы не найдены :(');
          setPizzasData([]);
        } else if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          const jsonData = await response.json();
          setErrorMessage(null);
          setPizzasData(jsonData);
        }

        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unknown error occurred');
        }
      }
    };

    fetchData();
  }, [activeCategory]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={(id: number) => setActiveCategory(id)}
        />
        <Sort
          activeSortType={activeSortType}
          setSortType={(id: number) => setSortType(id)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? (
          [...new Array(10)].map((_, index) => <Skeleton key={index} />)
        ) : errorMessage ? (
          <p className="content__no-found">{errorMessage}</p>
        ) : (
          pizzasData.map(item => <PizzaItem key={item.id} pizza={item} />)
        )}
      </div>
    </div>
  );
};

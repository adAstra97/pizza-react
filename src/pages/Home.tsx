import { useEffect, useState } from 'react';
import { Categories } from '../components/Categories/Categories';
import { Sort } from '../components/Sort/Sort';
import { IPizza, ISortType } from '../models/pizza.model';
import { Skeleton } from '../components/PizzaItem/Skeleton';
import PizzaItem from '../components/PizzaItem/PizzaItem';

interface IHomeProps {
  searchValue: string;
}

export const Home: React.FC<IHomeProps> = ({ searchValue }) => {
  const [pizzasData, setPizzasData] = useState<IPizza[]>([]);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeSortType, setSortType] = useState<ISortType>({
    name: 'популярности',
    sortBy: 'rating',
  });
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}?category=${activeCategory}&sortBy=${activeSortType.sortBy}&order=${isAscending ? 'asc' : 'desc'}`,
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unknown error occurred');
        }
      }
    };

    fetchData();
  }, [activeCategory, activeSortType, isAscending]);

  const pizzas = pizzasData
    .filter(pizza => {
      return pizza.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map(item => <PizzaItem key={item.id} pizza={item} />);

  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={(id: number) => setActiveCategory(id)}
        />
        <Sort
          activeSortType={activeSortType}
          setSortType={(sort: ISortType) => setSortType(sort)}
          isAscending={isAscending}
          setIsAscending={setIsAscending}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? (
          skeletons
        ) : errorMessage ? (
          <p className="content__no-found">{errorMessage}</p>
        ) : (
          pizzas
        )}
      </div>
    </div>
  );
};

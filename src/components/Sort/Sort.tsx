import { useState } from 'react';
import upArrow from '../../assets/up-arrow.svg';
import downArrow from '../../assets/bottom-arrow.svg';
import { ISortType } from '../../models/pizza.model';

interface ISortProps {
  activeSortType: ISortType;
  isAscending: boolean;
  setSortType: (id: ISortType) => void;
  setIsAscending: (value: boolean) => void;
}

const sortTypes: ISortType[] = [
  { name: 'популярности', sortBy: 'rating' },
  { name: 'цене', sortBy: 'price' },
  { name: 'алфавиту', sortBy: 'title' },
];

export const Sort: React.FC<ISortProps> = ({
  activeSortType,
  setSortType,
  isAscending,
  setIsAscending,
}) => {
  const [isVisibleSort, setIsVisibleSort] = useState<boolean>(false);

  const handleVisibleSort = (sortType: ISortType): void => {
    setSortType(sortType);
    setIsVisibleSort(!isVisibleSort);
  };

  const toggleSortingDirection = (): void => {
    setIsAscending(!isAscending);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisibleSort(!isVisibleSort)}>
          {activeSortType.name}
        </span>
        <div className="sort__direction">
          <button onClick={() => toggleSortingDirection()}>
            {isAscending ? <img src={upArrow} /> : <img src={downArrow} />}
          </button>
        </div>
      </div>
      {isVisibleSort && (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((sortType, index) => (
              <li
                onClick={() => handleVisibleSort(sortType)}
                className={
                  activeSortType.sortBy === sortType.sortBy ? 'active' : ''
                }
                key={index}>
                {sortType.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

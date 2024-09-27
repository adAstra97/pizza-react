import { useState } from 'react';
import upArrow from '../../assets/up-arrow.svg';
import downArrow from '../../assets/bottom-arrow.svg';

const sortTypes = ['популярности', 'цене', 'алфавиту'];

export const Sort = () => {
  const [activeSortType, setSortType] = useState<number>(0);
  const [isVisibleSort, setIsVisibleSort] = useState<boolean>(false);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const sortName = sortTypes[activeSortType];

  const handleVisibleSort = (index: number): void => {
    setSortType(index);
    setIsVisibleSort(!isVisibleSort);
  };

  const toggleSortingDirection = (): void => {
    setIsAscending(!isAscending);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisibleSort(!isVisibleSort)}>{sortName}</span>
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
                onClick={() => handleVisibleSort(index)}
                className={activeSortType === index ? 'active' : ''}
                key={index}>
                {sortType}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

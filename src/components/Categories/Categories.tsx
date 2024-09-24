import { useState } from 'react';

const caterogies: string[] = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

export const Categories = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const handleActiveCategory = (index: number): void => {
    setActiveCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {caterogies.map((category, index) => (
          <li
            onClick={() => handleActiveCategory(index)}
            key={index}
            className={activeCategory === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

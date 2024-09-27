interface CategoriesProps {
  activeCategory: number;
  setActiveCategory: (id: number) => void;
}

const caterogies: string[] = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

export const Categories: React.FC<CategoriesProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className="categories">
      <ul>
        {caterogies.map((category, index) => (
          <li
            onClick={() => setActiveCategory(index)}
            key={index}
            className={activeCategory === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

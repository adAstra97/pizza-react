export interface IPizza {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number[];
  rating: number;
}

export interface ISortType {
  name: string;
  sortBy: string;
}

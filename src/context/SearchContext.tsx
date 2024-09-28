import React, { createContext, useState, ReactNode } from 'react';

interface ISearchContext {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const defaultContextValue: ISearchContext = {
  searchValue: '',
  setSearchValue: () => {},
};

export const SearchContext = createContext<ISearchContext>(defaultContextValue);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};

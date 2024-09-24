import { createContext, useContext, useState } from 'react';

const SearchResultContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchResult = () => {
  return useContext(SearchResultContext);
};

export const SearchResultProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);
  return (
    <SearchResultContext.Provider value={{ searchResult, setSearchResult }}>
      {children}
    </SearchResultContext.Provider>
  );
};

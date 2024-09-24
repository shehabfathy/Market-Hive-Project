import { createContext, useContext, useState } from 'react';

const SearchDrawerContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchDrawer = () => {
  return useContext(SearchDrawerContext);
};

export const SearchDrawerProvider = ({ children }) => {
  const [showSearchDrawer, setShowSearchDrawer] = useState(false);
  return (
    <SearchDrawerContext.Provider
      value={{ showSearchDrawer, setShowSearchDrawer }}
    >
      {children}
    </SearchDrawerContext.Provider>
  );
};

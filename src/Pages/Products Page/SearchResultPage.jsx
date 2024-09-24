import ProductsPage from './ProductsPage';
import { useSearchResult } from '../../Context/SearchResultContext';

export const SearchResultPage = () => {
  const { searchResult } = useSearchResult();
  return (
    <div className="paddingX py-8 space-y-3">
      <h2 className="text-xl">
        Search Results, {searchResult.length} item(s) found.
      </h2>
      <ProductsPage productsList={searchResult} />
    </div>
  );
};

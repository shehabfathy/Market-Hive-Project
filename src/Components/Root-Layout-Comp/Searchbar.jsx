import { AutoComplete } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchResult } from '../../Context/SearchResultContext';
import { useProductSearch } from '../../Custom Hooks/useProductSearch';

export const SearchBar = () => {
  const { setSearchResult } = useSearchResult();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { searchProducts, getStoreNameFromId } = useProductSearch(searchTerm);

  const handleSelect = (value) => {
    const valueArr = value.split(',');
    setSearchTerm(
      searchProducts.find((product) => product.id === valueArr[0]).title,
    );
    navigate(`/stores/${valueArr[1]}/${valueArr[0]}`);
  };

  const searchHandler = (e) => {
    if (searchTerm.length > 0) {
      if (e.code === 'Enter') {
        setSearchResult(searchProducts);
        navigate(`/search-result/${searchTerm}`);
      }
    }
  };

  const searchSuggestions = searchProducts
    .map((prod) => ({
      label: (
        <div className="search-item flex gap-2">
          <img
            src={prod.images[0]}
            className="size-10 rounded-md object-contain"
            alt={prod.title}
          />
          <div className="product-info flex flex-col w-full">
            <h1 className="text-wrap line-clamp-2">{prod.title}</h1>
            <p className="self-end text-gray-500">
              {getStoreNameFromId(prod.storeId)}
            </p>
          </div>
        </div>
      ),
      value: `${prod.id},${prod.storeId}`,
    }))
    .slice(0, 5);
  return (
    <AutoComplete
      options={searchSuggestions}
      filterOption={false}
      onSelect={handleSelect}
      onKeyDown={searchHandler}
    >
      <div className="hidden sm:block">
        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[300px] transition-all duration-300 rounded-full
          border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary"
        />
      </div>
    </AutoComplete>
  );
};

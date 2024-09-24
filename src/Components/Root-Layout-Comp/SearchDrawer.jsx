import { Drawer } from 'antd';
import { useSearchDrawer } from '../../Context/SearchDrawerContext';
import { Input } from 'antd';
import { useProductSearch } from '../../Custom Hooks/useProductSearch';
import { useState } from 'react';
import { Button } from 'antd';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSearchResult } from '../../Context/SearchResultContext';

export const SearchDrawer = () => {
  const navigate = useNavigate();
  const { setSearchResult } = useSearchResult();
  const [searchTerm, setSearchTerm] = useState('');
  const { showSearchDrawer, setShowSearchDrawer } = useSearchDrawer();
  const { searchProducts, getStoreNameFromId } = useProductSearch(searchTerm);
  const searchSuggestions = searchProducts.slice(0, 5);
  const searchResultHandler = (e) => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      setSearchResult(searchProducts);
      navigate(`/search-result/${searchTerm}`);
      setShowSearchDrawer(false);
      setSearchTerm('');
    }
  };
  const selectedProductHandler = (prod) => {
    navigate(`/stores/${prod.storeId}/${prod.prodId}`);
    setShowSearchDrawer(false);
    setSearchTerm('');
  };

  return (
    <Drawer
      title="Search Products"
      placement="right"
      open={showSearchDrawer}
      onClose={() => setShowSearchDrawer(false)}
    >
      <div className="search-drawer-content space-y-2">
        <form onSubmit={searchResultHandler} className="flex flex-col gap-2">
          <Input
            placeholder="Search for products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            onClick={searchResultHandler}
            icon={<FaSearch />}
            type="primary"
          >
            Search Products
          </Button>
        </form>
        {searchTerm.length === 0 ? (
          <p className="text-xl font-semibold ms-2">Search for products.</p>
        ) : searchProducts.length > 0 ? (
          searchSuggestions.map((prod) => (
            <div
              key={prod.id}
              onClick={() =>
                selectedProductHandler({
                  prodId: prod.id,
                  storeId: prod.storeId,
                })
              }
              className="select-none cursor-pointer py-1 px-2 text-white font-semibold bg-primary hover:bg-primary/80 rounded-md flex gap-2"
            >
              <img
                src={prod.images[0]}
                className="size-10 rounded-md object-contain"
                alt={prod.title}
              />
              <div className="product-info flex flex-col w-full">
                <h1>{prod.title}</h1>
                <p className="self-end text-gray-200">
                  {getStoreNameFromId(prod.storeId)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl font-semibold ms-2">No products found.</p>
        )}
      </div>
    </Drawer>
  );
};

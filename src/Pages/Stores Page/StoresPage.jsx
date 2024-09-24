import { CollectionCard } from '../../Components/EcommerceCards.jsx';
import { SkeletonCollectionCard } from '../../Components/EcommerceCards.jsx';
import { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { Select, Input, AutoComplete } from 'antd';
import { useOutlet } from 'react-router-dom';
import { EmptyList } from '../../Components/EmptyList.jsx';

export default function StoresPage() {
  const [storesList, setStoresList] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [storeSearchTerm, setStoreSearchTerm] = useState('');
  const [isStoresLoading, setIsStoresLoading] = useState(true);
  const outlet = useOutlet();
  const allStoresList = useRef();
  const categorizedStoresFilter = useRef();

  const handleCategoryChange = (e) => {
    if (e == 'all') {
      setStoresList(allStoresList.current);
      categorizedStoresFilter.current = allStoresList.current;
    } else {
      const storesFilteredByCategory = allStoresList.current.filter(
        (store) => store.categoryId === e,
      );
      setStoresList(storesFilteredByCategory);
      categorizedStoresFilter.current = storesFilteredByCategory;
    }
  };

  const handleStoreSearchTermChange = (e) => {
    if (e.target.value.length > 0) {
      setStoreSearchTerm(e.target.value);
      setStoresList([
        ...categorizedStoresFilter.current.filter((store) =>
          store.name.toLowerCase().includes(storeSearchTerm.toLowerCase()),
        ),
      ]);
    } else {
      setStoresList(categorizedStoresFilter.current);
    }
  };

  const handleSortBy = (e) => {
    setStoresList((stores) => [
      ...stores.sort((a, b) => {
        switch (e) {
          case 'NewToOld':
            return b.creationDate - a.creationDate;
          case 'OldToNew':
            return a.creationDate - b.creationDate;
          case 'mostProducts':
            return b.products.length - a.products.length;
          case 'leastProducts':
            return a.products.length - b.products.length;
          default:
            break;
        }
      }),
    ]);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const storeCategories = [];
        const categoriesSnapshot = await getDocs(collection(db, 'Categories'));
        categoriesSnapshot.forEach((category) => {
          storeCategories.push({ ...category.data(), id: category.id });
        });
        setCategoryList(storeCategories);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchStores = async () => {
      try {
        const storeData = [];
        const storeSnapshot = await getDocs(collection(db, 'Stores'));
        storeSnapshot.forEach((store) => {
          storeData.push({ ...store.data(), id: store.id });
        });

        setIsStoresLoading(false);
        allStoresList.current = storeData;
        categorizedStoresFilter.current = storeData;
        setStoresList(storeData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStores();
    fetchCategories();
  }, []);

  return (
    outlet || (
      <div className="paddingX space-y-2 py-4">
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="flex gap-2">

            <Select
              className="min-w-36"
              onChange={(e) => { handleCategoryChange(e); }}
              showSearch
              placeholder="Category"
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: 'all', label: 'All' },
                ...CategoryList.map((category) => ({
                  value: category.id,
                  label: category.categoryName,
                })),
              ]}
            />

            {/* Search for Stores */}
            <AutoComplete
              onSelect={(value) => {
                setStoresList([
                  ...categorizedStoresFilter.current.filter((store) =>
                    store.name.toLowerCase().includes(value.toLowerCase()),
                  ),
                ]);
              }}
              filterOption={false}
              options={storesList.map((store) => ({
                label: store.name,
                value: store.name,
              }))}
            >
              <Input
                placeholder="Search for store"
                value={storeSearchTerm}
                onChange={handleStoreSearchTermChange}
              />
            </AutoComplete>

          </div>
          
          <Select
            className="min-w-36"
            defaultValue="Sort By"
            onChange={(e) => {
              handleSortBy(e);
            }}
            options={[
              {
                value: 'NewToOld',
                label: 'New to Old',
              },
              {
                value: 'OldToNew',
                label: 'Old to New',
              },
              {
                value: 'mostProducts',
                label: 'Most Products',
              },
              {
                value: 'leastProducts',
                label: 'Least Products ',
              },
            ]}
          />
        </div>

        {isStoresLoading ? (
          <div className="media">
            {Array(8)
              .fill()
              .map((_, index) => (
                <SkeletonCollectionCard key={index} />
              ))}
          </div>
        ) : storesList.length > 0 ? (
          <div className="media">
            {storesList.map((store) => (
              <CollectionCard
                key={store.id}
                path={`/stores/${store.id}`}
                prodImg={store.logo}
                prodTitle={store.name}
                contain
              />
            ))}
          </div>
        ) : (
          <EmptyList type="stores" />
        )}
      </div>
    )
  );
}

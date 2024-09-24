import { useOutlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { ProductCard } from '../../Components/EcommerceCards';
import { SkeletonProdsCard } from '../../Components/EcommerceCards';
import { EmptyList } from '../../Components/EmptyList';
import { useLocation } from 'react-router-dom';

export default function ProductsPage({ productsList, isLoading }) {
  const outlet = useOutlet();
  const [products, setProducts] = useState([]);
  const location = useLocation().pathname;
  const productsOriginPath = location.substring(1, location.lastIndexOf('/'));

  useEffect(() => {
    setProducts(productsList);
  }, [productsList]);

  function handleFilter(value) {
    if (value === 'all') {
      setProducts(productsList);
    }
    if (value === 'discount') {
      setProducts([...productsList.filter((prod) => prod.discount > 0)]);
    }
    if (value === 'availability') {
      setProducts([...productsList.filter((prod) => prod.stockQuantity > 0)]);
    }
  }

  function handleSort(value) {
    setProducts((prods) => [
      ...prods.sort((a, b) => {
        const aPrice = a.discount ? a.price - a.price * a.discount : a.price;
        const bPrice = b.discount ? b.price - b.price * b.discount : b.price;
        switch (value) {
          case 'priceAsc':
            return aPrice - bPrice;
          case 'priceDesc':
            return bPrice - aPrice;
          case 'nameAsc':
            return a.title.localeCompare(b.title);
          case 'nameDesc':
            return b.title.localeCompare(a.title);
          case 'newToOld':
            return b.creationDate - a.creationDate;
          case 'oldToNew':
            return a.creationDate - b.creationDate;
          case 'highRate':
            return b.reviews.length - a.reviews.length;
          case 'lowRate':
            return a.reviews.length - b.reviews.length;
          default:
            return 0;
        }
      }),
    ]);
  }

  return (
    outlet || (
      <div className="space-y-3 ">
        <div className="flex gap-2">
          <Select
            defaultValue={'Filter By'}
            className="min-w-36"
            onChange={handleFilter}
            options={[
              {
                value: 'all',
                label: 'All',
              },
              {
                value: 'discount',
                label: 'Discount',
              },
              {
                value: 'availability',
                label: 'Available',
              },
            ]}
          />
          <Select
            defaultValue={'Sort By'}
            className="min-w-44"
            onChange={handleSort}
            options={[
              {
                value: 'priceAsc',
                label: 'Price - Low to High',
              },
              {
                value: 'priceDesc',
                label: 'Price - High to Low',
              },
              {
                value: 'nameAsc',
                label: 'Alphabetically - A to Z',
              },
              {
                value: 'nameDesc',
                label: 'Alphabetically -  Z to A',
              },
              {
                value: 'newToOld',
                label: 'Most Recent',
              },
              {
                value: 'oldToNew',
                label: 'Old Products',
              },
              {
                value: 'highRate',
                label: 'Highest Rate',
              },
              {
                value: 'lowRate',
                label: 'Lowest Rate',
              },
            ]}
          />
        </div>

        {isLoading ? (
          <div className="media">
            {Array(8)
              .fill()
              .map((_, index) => (
                <SkeletonProdsCard key={index} />
              ))}
          </div>
        ) : products.length > 0 ? (
          <div className="media">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showStore={productsOriginPath !== 'stores'}
              />
            ))}
          </div>
        ) : (
          <EmptyList type="products" />
        )}
      </div>
    )
  );
}

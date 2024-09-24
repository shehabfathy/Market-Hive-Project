import { fetchProducts } from '../../util/fetchProducts';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductsPage from './ProductsPage';
import { useParams } from 'react-router-dom';
import { BreadCrumb } from '../../Components/BreadCrumb';
import { FaHome } from 'react-icons/fa';
import { FaShoppingBag } from 'react-icons/fa';
import { useFetchCategory } from '../../Custom Hooks/useFetchCategory';

export const ProductsCategoryPage = () => {
  const { categoryId } = useParams();
  const { category, isCategoryLoading } = useFetchCategory(categoryId);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const fetchedProducts = await fetchProducts('categoryId', categoryId);
      setCategoryProducts(fetchedProducts);
      setIsLoading(false);
    };
    fetchCategoryProducts();
  }, [categoryId]);
  return (
    <div className="paddingX py-5 space-y-3">
      <BreadCrumb
        items={[
          {
            href: '/',
            icon: <FaHome />,
            title: 'Home',
          },
          {
            href: `/categories`,
            icon: <FaShoppingBag />,
            title: 'Categories',
          },
          {
            title: isCategoryLoading
              ? 'Loading...'
              : (category.categoryName ?? 'Invalid category'),
          },
        ]}
      />
      <ProductsPage productsList={categoryProducts} isLoading={isLoading} />
    </div>
  );
};

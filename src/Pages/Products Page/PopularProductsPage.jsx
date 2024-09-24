import { useState } from 'react';
import { useEffect } from 'react';
import ProductsPage from './ProductsPage';
import { BreadCrumb } from '../../Components/BreadCrumb';
import { FaHome } from 'react-icons/fa';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';

export const PopularProductsPage = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPopularProducts = async () => {
      const popularProducts = await getDocs(collection(db, 'Products'));
      popularProducts.docs.forEach((prodDoc) => {
        setPopularProducts((prevProds) =>
          [...prevProds, { ...prodDoc.data(), id: prodDoc.id }]
            .filter((prod) => prod.reviews.length > 0)
            .sort((a, b) => b.reviews.length - a.reviews.length),
        );
      });
      setIsLoading(false);
    };
    fetchPopularProducts();
  }, []);
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
            title: 'Popular Products',
          },
        ]}
      />
      <ProductsPage productsList={popularProducts} isLoading={isLoading} />
    </div>
  );
};

import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchProducts = async (field, value) => {
  const fetchedProducts = [];
  const q = query(collection(db, 'Products'), where(field, '==', value));
  const res = await getDocs(q);
  res.docs.forEach((product) => {
    fetchedProducts.push({ ...product.data(), id: product.id });
  });
  return fetchedProducts;
};

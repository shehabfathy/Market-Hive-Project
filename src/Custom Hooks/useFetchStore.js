import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export const useFetchStore = (storeId) => {
  const [store, setStore] = useState({});
  const [isStoreLoading, setIsStoreLoading] = useState(true);
  const [storeError, setStoreError] = useState('');
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const storeData = await getDoc(doc(db, 'Stores', storeId));
        setStore({ ...storeData.data(), id: storeData.id });
        setIsStoreLoading(false);
      } catch (error) {
        setStoreError(error.message);
      }
    };
    fetchStore();
  }, [storeId]);
  return { store, isStoreLoading, storeError };
};

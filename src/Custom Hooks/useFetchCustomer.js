import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';

export const useFetchCustomer = (customerId) => {
  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const fetchedCustomer = await getDoc(doc(db, 'Customers', customerId));
        setCustomer({ ...fetchedCustomer.data(), id: fetchedCustomer.id });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };
    fetchCustomer();
  }, [customerId]);
  return { customer, isLoading, error };
};

export const useCustomerSnapshot = (customerId) => {
  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        onSnapshot(doc(db, 'Customers', customerId), (customerSnapshot) => {
          setCustomer({ ...customerSnapshot.data(), id: customerSnapshot.id });
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };
    fetchCustomer();
  }, [customerId]);
  return { customer, isLoading, error };
};

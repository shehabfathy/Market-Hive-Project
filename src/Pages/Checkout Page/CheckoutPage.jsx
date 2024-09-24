import { Spin } from 'antd';
import { useCustomerSnapshot } from '../../Custom Hooks/useFetchCustomer';
import { auth } from '../../firebase';
import PlaceOrderPage from './PlaceOrderPage';

function CheckoutPage() {
  const { customer, isLoading } = useCustomerSnapshot(auth.currentUser.uid);
  return (
    <div>
      {isLoading ? (
        <div className="h-full absolute left-1/2 flex flex-col justify-center">
          <Spin size="large" className="self-stretch " />
        </div>
      ) : (
        <PlaceOrderPage customer={customer} />
      )}
    </div>
  );
}

export default CheckoutPage;

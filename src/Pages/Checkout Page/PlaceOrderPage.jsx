import { useState } from 'react';
import { useFetchCartItems } from '../../Custom Hooks/useFetchCartItems';
import deliveryAddress from '../../assets/Delivery-address.svg';
import OrderSummary from '../../Components/CartDetails-comp/OrderSummary';
import ShippingAddress from './ShippingAddress';
import OrderShipment from './OrderShipment';
import AddressForm from './AddressForm';
import Payment from './Payment';

function PlaceOrderPage({ customer }) {
  const [editing, setEditing] = useState(!customer.address?.city);
  const [update, setUpdate] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { cartItems } = useFetchCartItems();
  return (
    <div>
      <div className="flex justify-center items-start  min-h-screen bg-white">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full flex ">
          <div className="w-full p-4">
            {editing ? (
              <>
                <AddressForm
                  address={customer.address}
                  setEditing={setEditing}
                  update={update}
                />
              </>
            ) : (
              <div className="grid md:grid-cols-3 gap-4 ">
                <div className="md:col-span-2 ">
                  <ShippingAddress
                    setEditing={setEditing}
                    setUpdate={setUpdate}
                    customer={customer}
                    setIsDisabled={setIsDisabled}
                  />
                  <OrderShipment />
                  <Payment setIsDisabled={setIsDisabled} />
                </div>
                <div className="md:col-span-1">
                  <OrderSummary
                    cartItems={cartItems}
                    isDisabled={isDisabled}
                    customerAddress={customer.address}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {editing ? (
          <div className="hidden md:flex items-center justify-center w-full md:w-3/2 self-center">
            <img
              src={deliveryAddress}
              alt="Add Address Illustration"
              className="w-3/4 h-auto"
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default PlaceOrderPage;

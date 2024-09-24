import { Divider } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import PlaceOrderModal from '../../Pages/Checkout Page/PlaceOrderModal';
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  arrayUnion,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { Button } from 'antd';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function OrderSummary({
  cartItems,
  customerAddress,
  isDisabled,
}) {
  const [isPlaceOrderLoading, setIsPlaceOrderLoading] = useState(false);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.subTotal, 0);
  const shippingFees = 0;
  const totalAmount = subtotal + shippingFees;
  const navigate = useNavigate();
  const wordPlusS = () => {
    if (totalItems == 1) {
      return 'Item';
    } else {
      return 'Items';
    }
  };
  const wordItem = wordPlusS();
  const location = useLocation();

  const emptyShoppingCart = () => {
    cartItems.forEach(async (cartItem) => {
      await deleteDoc(doc(db, 'ShoppingCart', cartItem.id));
    });
  };

  const updateStoresDocWithNewOrderData = (orderId) => {
    cartItems.forEach(async (cartItem) => {
      const store = await getDoc(doc(db, 'Products', cartItem.prodId));
      const storeId = store.data().storeId;
      await updateDoc(doc(db, 'Stores', storeId), {
        orders: arrayUnion(orderId),
        customers: arrayUnion(auth.currentUser.uid),
      });
    });
  };

  const updateCustomerDocWithNewOrder = async (orderId) => {
    await updateDoc(doc(db, 'Customers', auth.currentUser.uid), {
      orders: arrayUnion(orderId),
    });
  };

  const placeOrderHandler = async () => {
    setIsPlaceOrderLoading(true);
    try {
      const order = await addDoc(collection(db, 'Orders'), {
        customerId: auth.currentUser?.uid,
        products: cartItems.map((cartItem) => {
          return {
            prodId: cartItem.prodId,
            quantity: cartItem.quantity,
            subTotal: cartItem.subTotal,
          };
        }),
        shippingFees,
        totalAmount,
        orderHistory: [{ orderStatus: 'pending', date: new Date() }],
        destinationAddress: customerAddress,
        paymentMethod: 'Cash on delivery',
      });
      updateStoresDocWithNewOrderData(order.id);
      updateCustomerDocWithNewOrder(order.id);
      emptyShoppingCart();
      navigate('/my-orders');
      PlaceOrderModal();
      setIsPlaceOrderLoading(false);
    } catch (error) {
      setIsPlaceOrderLoading(false);
      toast.error('Error occurred, please try again later.');
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-md sticky top-0 space-y-2">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>
            Subtotal ({totalItems} {wordItem})
          </span>
          <span>{subtotal.toLocaleString()} EGP</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fees</span>

          {shippingFees === 0 ? (
            <span className="text-green-600 bold font-bold">Free</span>
          ) : (
            <span className="font-bold">{shippingFees} EGP</span>
          )}
        </div>
        <Divider />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{totalAmount.toLocaleString()} EGP</span>
        </div>
      </div>
      <Button
        type="primary"
        loading={isPlaceOrderLoading}
        className="w-full"
        disabled={isDisabled}
        onClick={() =>
          location.pathname == '/cart'
            ? navigate('/checkout')
            : placeOrderHandler()
        }
      >
        {location.pathname == '/cart' ? 'Checkout' : 'PLACE ORDER'}
      </Button>
    </div>
  );
}

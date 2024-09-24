import { useState } from 'react';
import cash from '../../assets/cash.png';
import valu from '../../assets/valu.jpeg';
import credit from '../../assets/Wallet-pana.png';
import { PaymentModal } from './PlaceOrderModal';
function Payment({ setIsDisabled }) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const paymentMethods = [
    {
      id: 1,
      name: 'Debit/Credit Card',
      imageSrc: credit,
    },
    {
      id: 2,
      name: 'ValU',
      imageSrc: valu,
    },
    {
      id: 3,
      name: 'Cash On Delivery',
      imageSrc: cash,
    },
  ];

  const handlePlaceOrder = (methodId) => {
    if (methodId === 3) {
      setIsDisabled(false);
      setSelectedPayment(methodId);
    } else {
      PaymentModal();
    }
  };
  return (
    <div className="mt-6">
      <h2 className="text-2xl">Payment </h2>
      <div className="sm:flex border border-gray-200  rounded-md">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => handlePlaceOrder(method.id)}
            className={`flex flex-col items-center justify-center border-r border-b flex-grow cursor-pointer p-6 ${selectedPayment === method.id ? 'border-b-blue-500 text-blue-500' : ''}`}
          >
            <img
              className="w-16 h-15"
              src={method.imageSrc}
              alt={method.name}
            />
            <p>{method.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Payment;

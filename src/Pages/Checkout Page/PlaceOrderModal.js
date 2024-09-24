import { Modal } from 'antd';

export default function PlaceOrderModal() {
  let secondsToGo = 5;
  const modal = Modal.success({
    title: 'Order Placed Successfully!',
    content: `Thank you for your purchase. Your order has been successfully placed.`,
  });

  setTimeout(() => {
    modal.destroy();
  }, secondsToGo * 1000);
}

export function PaymentModal() {
  let secondsToGo = 10;
  const modal = Modal.warning({
    title:
      'We are actively working on implementing this feature and will notify our customers as soon as it becomes available.',
    content:
      'please explore our alternative payment options to complete your purchase. Thank you for your understanding and continued support.',
  });

  setTimeout(() => {
    modal.destroy();
  }, secondsToGo * 1000);
}

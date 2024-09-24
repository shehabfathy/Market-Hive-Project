import { Skeleton } from 'antd';
import { PageSpiner } from '../../Components/PageSpiner';
import { useFetchOrders } from '../../Custom Hooks/useFetchOrders';
import { useFetchProduct } from '../../Custom Hooks/useFetchProduct';
import { EmptyList } from '../../Components/EmptyList';

function MyOrdersPage() {
  const { order, isOrderLoading } = useFetchOrders();
  return (
    <div className="container paddingX space-y-2 py-4">
      {isOrderLoading ? (
        <PageSpiner />
      ) : order.length > 0 ? (
        <div className="space-y-6">
          {order.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md p-6 rounded-lg space-y-4"
            >
              {/* Order Details */}
              <div className="text-lg font-semibold">
                Order Placed:{' '}
                {item.orderHistory[0].date.toDate().toLocaleString('en-AU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour12: true,
                  minute: 'numeric',
                  hour: 'numeric',
                })}
              </div>
              <div className="text-gray-500">
                Shipping Fees:{' '}
                {item.shippingFees === 0 ? 'Free' : `${item.shippingFees} EGP`}
              </div>
              <div className="text-gray-500">
                Total Amount: {item.totalAmount} EGP
              </div>
              <div className="text-gray-500">
                Destination: {item.destinationAddress.streetAddress},{' '}
                {item.destinationAddress.city}
              </div>
              <div className="text-gray-500">
                Payment Method: {item.paymentMethod}
              </div>
              <div className="text-gray-500">
                Status:{' '}
                {item.orderHistory[item.orderHistory.length - 1].orderStatus}
              </div>
              {/* Product Items */}
              <div className="space-y-4">
                {item.products.map((product) => (
                  <ProductDetails
                    key={product.prodId}
                    prodId={product.prodId}
                    quantity={product.quantity}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyList type={'order'} />
      )}
    </div>
  );
}

export function ProductDetails({ prodId, quantity }) {
  const { product, store, isProductLoading } = useFetchProduct(prodId);

  return (
    <div>
      {isProductLoading ? (
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      ) : (
        <div className="flex items-center space-x-4 border-t pt-4">
          <div className="relative">
            <img
              className="w-28 h-28 object-contain rounded"
              src={product.images}
              alt={product.title}
            />
            <div className="absolute top-0 right-0 bg-primary p-1 rounded-full text-xs text-white ">
              {quantity} X
            </div>
          </div>
          <div className="flex-1">
            <div className="font-medium">{product.title}</div>
            <div className="text-sm text-gray-500">{store.name}</div>
          </div>
          <div className="font-medium">{product.price} EGP</div>
        </div>
      )}
    </div>
  );
}

export default MyOrdersPage;

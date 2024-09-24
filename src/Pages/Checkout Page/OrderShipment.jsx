import { useFetchCartItems } from '../../Custom Hooks/useFetchCartItems';
import { useFetchProduct } from '../../Custom Hooks/useFetchProduct';
import { useFetchStore } from '../../Custom Hooks/useFetchStore';
import { Skeleton } from 'antd';
function OrderShipment() {
  const { cartItems, isCartLoading } = useFetchCartItems();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const date = new Date();
  date.setDate(date.getDate() + 2);
  const orderDate = date.toDateString();

  return (
    <div>
      <div className="mt-6">
        <h2 className="text-2xl">Your Order</h2>
        <div className="border border-gray-200 p-4 rounded-md">
          <div className="flex justify-between">
            <h2 className="bolder text-xl">
              Shipment <span>({totalItems} items)</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3 mt-2">
            {isCartLoading ? (
              <Skeleton
                avatar
                paragraph={{
                  rows: 4,
                }}
              />
            ) : (
              cartItems.map((item) => (
                <Items
                  key={item.prodId}
                  quantity={item.quantity}
                  subTotal={item.subTotal.toLocaleString()}
                  prodId={item.prodId}
                />
              ))
            )}
          </div>

          <p className="pt-3">
            Get it by{' '}
            <span className="text-primary font-bold">{orderDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderShipment;

const Items = ({ quantity, subTotal, prodId }) => {
  const { product, isProductLoading } = useFetchProduct(prodId);
  const { store } = useFetchStore(product?.storeId);

  return (
    <div className="flex gap-2 justify-start items-center">
      {isProductLoading ? (
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      ) : (
        <>
          <div className="relative">
            <img className="w-24 object-cover " src={product.images} alt="" />
            <div className="absolute top-0 right-0 bg-primary p-1 rounded-full text-xs text-white ">
              {quantity} X
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm">{store?.name}</p>
            <p className="text-sm font-bold">
              {product?.title?.slice(0, 20)}...
            </p>
            <p className="text-sm">
              <strong>{subTotal} EGP</strong>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

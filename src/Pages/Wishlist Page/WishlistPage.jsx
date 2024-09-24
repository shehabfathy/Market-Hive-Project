import { useFetchProduct } from '../../Custom Hooks/useFetchProduct';
import { auth } from '../../firebase';
import { ProductCard } from '../../Components/EcommerceCards';
import { useCustomerSnapshot } from '../../Custom Hooks/useFetchCustomer';
import { SkeletonProdsCard } from '../../Components/EcommerceCards';
import { PageSpiner } from '../../Components/PageSpiner';
import { EmptyList } from '../../Components/EmptyList';

function WishlistPage() {
  const { customer, isLoading } = useCustomerSnapshot(auth.currentUser.uid);
  return (
    <div>
      <div className="paddingX space-y-2 py-4">
        {isLoading ? (
          <PageSpiner />
        ) : customer.wishlist.length > 0 ? (
          <div className="media">
            {customer.wishlist
              .map((item, index) => (
                <WishlistItem key={index} id={item}></WishlistItem>
              ))
              .reverse()}
          </div>
        ) : (
          <EmptyList />
        )}
      </div>
    </div>
  );
}

export default WishlistPage;

function WishlistItem({ id }) {
  const { product, isProductLoading } = useFetchProduct(id);
  return (
    <>
      {isProductLoading ? (
        <SkeletonProdsCard />
      ) : (
        <ProductCard product={product} isWishlistItem />
      )}
    </>
  );
}

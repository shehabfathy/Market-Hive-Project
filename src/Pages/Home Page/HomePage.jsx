import Header from '../../Components/Homepage-comp/Header.jsx';
import { HomeSection } from '../../Components/Homepage-comp/HomeSection.jsx';
import {
  ProductCard,
  CollectionCard,
} from '../../Components/EcommerceCards.jsx';
import { SkeletonProdsCard } from '../../Components/EcommerceCards.jsx';
import { SkeletonCollectionCard } from '../../Components/EcommerceCards.jsx';
import useFetchData from '../../Custom Hooks/useFetchData.js';

export default function HomePage() {
  const {
    products,
    categories,
    stores,
    isProdsLoading,
    isCatsLoading,
    isStoresLoading,
  } = useFetchData();
  const popularProdList = products
    .sort((a, b) => b.reviews.length - a.reviews.length)
    .slice(0, 4);
  const popularStoresList = stores
    .sort((a, b) => b.products.length - a.products.length)
    .slice(0, 4);
  const popularCategoryList = categories.slice(0, 4);
  return (
    <>
      <Header />
      <div className="paddingX">
        <HomeSection
          title="Popular Products"
          pathTitle={'Products'}
          sectionPath={'/popular-products'}
        >
          {isProdsLoading
            ? Array.from(Array(4)).map((_, index) => (
                <SkeletonProdsCard key={index} />
              ))
            : popularProdList.map((prod) => {
                return <ProductCard key={prod.id} product={prod} />;
              })}
        </HomeSection>
        <HomeSection
          title="Stores Collection"
          pathTitle={'Stores'}
          sectionPath={'/stores'}
        >
          {isStoresLoading
            ? Array.from(Array(4)).map((_, index) => (
                <SkeletonCollectionCard key={index} />
              ))
            : popularStoresList.map((store) => {
                return (
                  <CollectionCard
                    key={store.id}
                    path={`/stores/${store.id}`}
                    prodImg={store.logo}
                    prodTitle={store.name}
                    contain
                  />
                );
              })}
        </HomeSection>
        <HomeSection
          title="Popular Categories"
          pathTitle={'Categories'}
          sectionPath={'/categories'}
        >
          {isCatsLoading
            ? Array.from(Array(4)).map((_, index) => (
                <SkeletonCollectionCard key={index} />
              ))
            : popularCategoryList.map((cat) => {
                return (
                  <CollectionCard
                    key={cat.id}
                    path={`/categories/${cat.id}`}
                    prodImg={cat.categoryImage}
                    prodTitle={cat.categoryName}
                    cover
                  />
                );
              })}
        </HomeSection>
      </div>
    </>
  );
}

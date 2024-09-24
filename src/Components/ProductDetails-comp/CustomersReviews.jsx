import { ReviewBox } from './ReviewBox';

export const CustomersReviews = ({ reviews }) => {
  return (
    <div className="product-reviews space-y-2">
      {reviews.length > 0 ? (
        reviews.map((review) => <ReviewBox key={review.id} review={review} />)
      ) : (
        <p className="py-2 text-lg font-semibold text-center">
          There are no any reviews yet.
        </p>
      )}
    </div>
  );
};

import { useFetchCustomer } from '../../Custom Hooks/useFetchCustomer';
import { Rate } from 'antd';
import { Skeleton } from 'antd';
export const ReviewBox = ({ review }) => {
  const { customer, isLoading, error } = useFetchCustomer(review.cstId);

  const reviewDate = review.reviewDate.toDate().toLocaleString('en-AU', {
    hour12: true,
    minute: '2-digit',
    hour: '2-digit',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <div className="rounded-md shadow-md p-4 ">
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {' '}
          <div className="customer-info flex items-center justify-between">
            <Rate disabled value={review.rating} allowHalf />
            {error ? (
              <p>Error: {error}</p>
            ) : (
              <div className="name-and-date text-end">
                <h1 className="font-bold">
                  {customer.firstName} {customer.lastName}
                </h1>
                <p className="font-semibold text-xs">{reviewDate}</p>
              </div>
            )}
          </div>
          <h3 className=" font-bold text-lg">{review.comment.reviewTitle}</h3>
          <p className="text-lg text-gray-500">
            {review.comment.reviewMessage}
          </p>
        </>
      )}
    </div>
  );
};

import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import { Rate } from 'antd';
import { Button } from 'antd';
import { useState } from 'react';
import {
  updateDoc,
  doc,
  arrayUnion,
  addDoc,
  collection,
} from 'firebase/firestore';
import { auth } from '../../firebase';
import { db } from '../../firebase';
export const ReviewForm = ({ productId }) => {
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [reviewRate, setReviewRate] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const clearForm = () => {
    setReviewTitle('');
    setReviewMessage('');
    setReviewRate(0);
  };
  const reviewSubmitHandler = async () => {
    if (reviewTitle && reviewRate) {
      setSubmitLoading(true);
      try {
        const reviewDoc = await addDoc(collection(db, 'Reviews'), {
          productId,
          cstId: auth.currentUser.uid,
          comment: { reviewTitle, reviewMessage },
          rating: reviewRate,
          reviewDate: new Date(),
        });

        await updateDoc(doc(db, 'Products', productId), {
          reviews: arrayUnion(reviewDoc.id),
        });
        setSubmitLoading(false);
        clearForm();
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <form className="reviews space-y-2">
      <h1 className="text-2xl select-none">Reviews</h1>
      <Input
        placeholder="Review Title"
        value={reviewTitle}
        onChange={(e) => setReviewTitle(e.target.value)}
      />
      <TextArea
        placeholder="Review Message"
        rows={4}
        value={reviewMessage}
        onChange={(e) => setReviewMessage(e.target.value)}
      />
      <div className="submit-rate flex justify-between">
        <Rate
          allowHalf
          value={reviewRate}
          onChange={(val) => setReviewRate(val)}
        />
        <Button
          loading={submitLoading}
          onClick={reviewSubmitHandler}
          type="primary"
        >
          Submit Review
        </Button>
      </div>
    </form>
  );
};

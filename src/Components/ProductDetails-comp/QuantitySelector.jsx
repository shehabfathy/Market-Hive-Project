import { FaPlus, FaMinus } from 'react-icons/fa';

export const QuantitySelector = ({ value, onChange, maxValue }) => {
  const incrementQtyHandler = () => {
    if (value < maxValue) {
      onChange((qty) => (qty = qty + 1));
    }
  };
  const decrementQtyHandler = () => {
    if (value > 1) {
      onChange((qty) => (qty = qty - 1));
    }
  };
  return (
    <div className="qty-selector flex items-center gap-3">
      <button
        onClick={decrementQtyHandler}
        className="dec-btn p-2 rounded-md shadow-md bg-slate-50 hover:bg-slate-100"
      >
        <FaMinus />
      </button>
      <div className="qty select-none">{value}</div>
      <button
        onClick={incrementQtyHandler}
        className="inc-btn p-2 rounded-md shadow-md bg-slate-50 hover:bg-slate-100"
      >
        <FaPlus />
      </button>
    </div>
  );
};

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useState } from "react";
import { productFilter } from "../../store/Slice/productSlice";

const FilterProducts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [priceRange, setRange] = useState({ min: 0, max: 10000 });
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState(0);
  const isFilterValid = () => {
    return (
      rating > 0 ||
      discount > 0 ||
      category.trim() !== "" ||
      priceRange.min > 0 ||
      priceRange.max < 10000
    );
  };

  const handleFilterProduct = () => {
    dispatch(
      productFilter({
        category,
        minprice: priceRange.min,
        maxprice: priceRange.max,
        minDiscount: discount,
        maxDiscount: discount,
      })
    );
  };

  return (
    <div className="p-4 border rounded-md space-y-4 w-full max-w-md mx-auto bg-soft_mint shadow">
      <div>
        <label className="block font-medium mb-1">Price Range:</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setRange({ ...priceRange, min: +e.target.value })}
            className="border p-1 w-24"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setRange({ ...priceRange, max: +e.target.value })}
            className="border p-1 w-24"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Minimum Rating:</label>
        <input
          type="number"
          min={0}
          max={5}
          step={0.1}
          value={rating}
          onChange={(e) => setRating(+e.target.value)}
          className="border p-1 w-24"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Minimum Discount (%):</label>
        <input
          type="number"
          min={0}
          max={100}
          step={1}
          value={discount}
          onChange={(e) => setDiscount(+e.target.value)}
          className="border p-1 w-24"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Category (optional):</label>
        <input
          type="text"
          placeholder="e.g. smartphones"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-1 w-full"
        />
      </div>

      <button
        onClick={handleFilterProduct}
        disabled={!isFilterValid()}
        className={`w-full px-4 py-2 text-white rounded transition 
          ${
            isFilterValid()
              ? "bg-teal-600 hover:bg-teal-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterProducts;

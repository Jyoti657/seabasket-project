import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { sortProducts } from "../../store/Slice/productSlice";

const SortProducts: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("");
  const sort = useSelector((state: RootState) => state.product.sortProducts);
  const error = useSelector((state: RootState) => state.product.error);
  const loading = useSelector((state: RootState) => state.product.loading);
  const dispatch = useDispatch<AppDispatch>();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    dispatch(sortProducts(e.target.value));
  };

  useEffect(() => {
    if (sortBy) {
      dispatch(sortProducts(sortBy));
    }
  }, [sortBy, dispatch]);

  return (
    <>
      <div className="flex justify-between items-center bg-soft_mint p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Filters and Sorting</h2>
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            className="border rounded p-1"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="">Select Sorting Option</option>
            <option value="price">Price</option>
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        {loading && <p className="text-blue-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && sort.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sort.map((product, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                {/* <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                /> */}
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-500">Price: ₹{product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          !loading && !error && <p>No products available</p>
        )}
      </div>
    </>
  );
};

export default SortProducts;

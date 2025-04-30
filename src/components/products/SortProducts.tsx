import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useState } from "react";
import { productFilter } from "../../store/Slice/productSlice";

const SortProducts: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, allProducts } = useSelector(
    (state: RootState) => state.product
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSortBy(selectedValue);

    let sortField = "";
    let sortOrder: "asc" | "desc" | undefined;

    switch (selectedValue) {
      case "title":
        sortField = "name";
        sortOrder = "asc";
        break;
      case "price":
        sortField = "price";
        sortOrder = "asc";
        break;

      default:
        return;
    }

    if (allProducts.length > 0) {
      dispatch(
        productFilter({
          sort: sortOrder,
          SortFeild: sortField,
        })
      );
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 mb-4">
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm font-medium">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={handleSortChange}
          className="p-2 border rounded-md"
        >
          <option value="">Select</option>
          <option value="title">Title (A-Z)</option>
          <option value="price">Price (Low to High)</option>
        </select>
      </div>

      {loading && (
        <p className="text-sm text-gray-500">Loading sorted products...</p>
      )}
      {error && <p className="text-sm text-red-500">Error: {error}</p>}
    </div>
  );
};

export default SortProducts;

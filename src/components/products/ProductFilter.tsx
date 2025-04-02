

// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store";
// import { setPriceFilter, setRatingFilter } from "../../store/Slice/productSlice";

// const ProductFilter: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const filters = useSelector((state: RootState) => state.product.filters);

//   const handleMinFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(setPriceFilter({ minPrice: Number(e.target.value), maxPrice: filters.maxPrice }));
//   };

//   const handleMaxFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(setPriceFilter({ minPrice: filters.minPrice, maxPrice: Number(e.target.value) }));
//   };

//   const handleRatingFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     dispatch(setRatingFilter(Number(e.target.value)));
//   };

//   return (
//     <div className="p-4 border rounded-lg shadow-md">
//       <h3 className="text-lg font-semibold mb-2">Filter by Price</h3>
//       <input
//         className="border p-2 rounded-md mr-2"
//         type="number"
//         min="0"
//         max="1000"
//         value={filters.minPrice}
//         onChange={handleMinFilter}
//         placeholder="Min Price"
//       />
//       <input
//         className="border p-2 rounded-md"
//         type="number"
//         min="0"
//         max="1000"
//         value={filters.maxPrice}
//         onChange={handleMaxFilter}
//         placeholder="Max Price"
//       />

//       <h3 className="text-lg font-semibold mt-4 mb-2">Filter by Rating</h3>
//       <select
//         className="border p-2 rounded-md"
//         value={filters.rating}
//         onChange={handleRatingFilter}
//       >
//         <option value="0">All Ratings</option>
//         <option value="4">4★ & Above</option>
//         <option value="3">3★ & Above</option>
//       </select>
//     </div>
//   );
// };

// export default ProductFilter;

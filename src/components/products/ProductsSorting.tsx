// // sorting the filert with usstate



// import { useState, useEffect } from "react";
// import { ProductProps } from "../../types";
// import { currencyFormatter } from "../../util/formatting";

// interface ProductSortingProps {
//   products: ProductProps[];
// }

// const ProductSorting: React.FC<ProductSortingProps> = ({ products }) => {
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(10000);
//   const [rating, setRating] = useState(0);
//   const [sortBy, setSortBy] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>(products);

//   useEffect(() => {
//     let updatedProducts = products.filter(
//       (product) =>
//         product.price >= minPrice &&
//         product.price <= maxPrice &&
//         (product.rating?.rate ?? 0) >= rating
//     );

//     if (sortBy === "Low-High") {
//       updatedProducts.sort((a, b) => a.price - b.price);
//     } else if (sortBy === "High-Low") {
//       updatedProducts.sort((a, b) => b.price - a.price);
//     } else if (sortBy === "Name") {
//       updatedProducts.sort((a, b) => a.title.localeCompare(b.title));
//     }

//     setFilteredProducts(updatedProducts);
//   }, [minPrice, maxPrice, rating, sortBy, products]);

//   return (
//     <div className="container mx-auto py-6">
//       <div className="flex flex-wrap gap-4 justify-center">
//         <input
//           type="number"
//           className="border p-2 rounded-md w-32"
//           placeholder="Min Price"
//           value={minPrice}
//           onChange={(e) => setMinPrice(Number(e.target.value))}
//         />
//         <select className=" border p-2 rounded-md w-32">
//             <option value="300">300</option>
//             <option value="400">400</option>
//             <option value="500">500</option>
//         </select>
//         <input
//           type="number"
//           className="border p-2 rounded-md w-32"
//           placeholder="Max Price"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(Number(e.target.value))}
//         />

//         <select
//           className="border p-2 rounded-md"
//           value={rating}
//           onChange={(e) => setRating(Number(e.target.value))}
//         >
//           <option value="0">All Ratings</option>
//           <option value="4">4★ & Above</option>
//           <option value="3">3★ & Above</option>
//         </select>

//         <select
//           className="border p-2 rounded-md"
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//         >
//           <option value="">Sort By</option>
//           <option value="Low-High">Price: Low to High</option>
//           <option value="High-Low">Price: High to Low</option>
//           <option value="Name">Name (A-Z)</option>
//         </select>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="border p-4 rounded-lg shadow-md hover:shadow-xl transition">
//             <img
//               src={product.image}
//               alt={product.title}
//               className="w-full h-40 object-contain mb-4"
//             />
//             <h3 className="text-lg font-semibold text-gray-800 text-center">{product.title}</h3>
//             <p className="text-center text-gray-600">Price: {currencyFormatter.format(product.price)}</p>
//             <p className="text-center text-gray-600">Rating: {product.rating?.rate ?? "N/A"}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductSorting;
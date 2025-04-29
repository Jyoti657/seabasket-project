// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store";
// import { useEffect } from "react";
// import { productCategories } from "../../store/Slice/productSlice";
// import { useNavigate } from "react-router-dom";


// const CategoryList: React.FC = () => {
//   const navigate = useNavigate();
//   const rawCategories = useSelector(
//     (state: RootState) => state.product.productCategories
//   );
 
  
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     dispatch(productCategories());
//   }, [dispatch]);

//   if (!rawCategories || rawCategories.length === 0) {
//     return <p className="text-gray-700 text-center">No Categories Found</p>;
//   }
//   const handleCategoryClick = (categoryName: string) => {
//     navigate(`/category/${categoryName}`);
//   };

//   return (
//     <div className="p-5">
//       <h2 className="font-semibold mb-5 text-3xl text-center bg-charcoal text-soft_mint">
//         Categories
//       </h2>
//       <div className="">
//         <ul className="flex flex-wrap justify-center gap-4">
//           {rawCategories.map((category, index) => (
//             <li
//               key={index}
//               onClick={() => handleCategoryClick(category.name)}
//               className="p-3 border hover:bg-seabasket_green hover:text-white cursor-pointer text-center transition rounded-l bg-soft_mint shadow-md"
//             >
              
//                 <img
//                   src={category.imageUrl}
//                   alt={category.name}
//                   className="w-16 h-16 object-cover mx-auto mt-2 rounded-full border-2 border-seabasket_green"
//                 />
            

//               {typeof category.name === "string" ? (
//                 <span>{category.name}</span>
//               ) : (
//                 <span>Invalid category name</span>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };
// export default CategoryList;

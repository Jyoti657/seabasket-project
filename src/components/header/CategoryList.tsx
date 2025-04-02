
import {  useSelector } from "react-redux";
import { Category } from "../../types";
import {  RootState } from "../../store/store";
import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import electronics from "../../assets/electronic.png"
import jewelly from "../../assets/jewelly.jpg"
import men from "../../assets/men.jpg"
import women from "../../assets/women.jpg"



const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  
  const { allProducts, error, loading } = useSelector(
    (state: RootState) => state.product
  );

  // // Function to extract categories from the product list
  // const extraCategories = () => {
  //   const categorySet = new Set<string>(); // Set to store unique categories
  //   allProducts.forEach((product) => {
  //     if (product.category) {
  //       categorySet.add(product.category);
  //     }
  //   });

  //   const categoryList: Category[] = Array.from(categorySet).map((category) => {
  //     let CategoryImage= "";
  //      switch(category){
  //       case "electronics":
  //         CategoryImage=electronics
  //         break;
  //         case "women's clothing":
  //         CategoryImage=women
  //         break;
  //         case "jewelery":
  //           CategoryImage= jewelly
  //           break;
  //           case "mens":
  //            CategoryImage=men
  //            break;
  //            default:
  //             CategoryImage=electronics

  //      }
  //      return{
  //       name: category,
  //       image: CategoryImage,
  //      }
     
  //   });

  //   setCategories(categoryList);
  // };


  
  // useEffect(() => {
  //   if (allProducts?.length > 0) {
  //     extraCategories();
  //   }
  // }, [allProducts]);

  // const  categories=useMemo(()=>{
  //   if (!allProducts?.length)  return [];

  //   const categorySet = new Set<string>(); // Unique category storage
  //   allProducts.forEach((product) => categorySet.add(product.category));

  //   return Array.from(categorySet).map((category) => {
  //     const categoryImageMap: Record<string, string> = {
  //       "electronics": electronics,
  //       "women's clothing": women,
  //       "jewelery": jewelly,
  //       "mens": men,
  //     };

  //     return {
  //       name: category,
  //       image: categoryImageMap[category] || electronics, // Default image
  //     };
  //   });
  // }, [allProducts]);
  useEffect(() => {
    if (!allProducts?.length) return;
  
    const categorySet = new Set<string>();
    allProducts.forEach((product) => categorySet.add(product.category));
  
    const categoryList = Array.from(categorySet).map((category) => {
      const categoryImageMap: Record<string, string> = {
        "electronics": electronics,
        "women's clothing": women,
        "jewelery": jewelly,
        "mens": men,
      };
  
      return {
        name: category,
        image: categoryImageMap[category] || electronics,
      };
    });
  
    setCategories(categoryList);
  }, [allProducts]);
  const handleCategoriesClick = (category: Category) => {
    navigate(`/category/${category.name}`);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6">All Categories</h1>
      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : error ? (
        <p className="text-center text-xl text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategoriesClick(category)}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48  object-contain mb-4 cursor-pointer"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-700 text-center">
                  {category.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryList;


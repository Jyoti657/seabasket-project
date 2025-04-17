import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const CategoryList: React.FC = () => {
const categories=  useSelector((state:RootState)=>state.product.productCategories)
 if(!categories ||categories.length===0){
  return <p className=" text-gray-700 text-center">No Categories Found</p>;
 }
 console.log(categories)
  
    return(
      <div className="p-5">
        <h2 className="font-semibold mb-5 text-xl"> Categories</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map((category:string,index:number)=>(
              <li
              key={index}
              className="p-3 border rounded hover:bg-seabasket_green hover:text-white cursor-pointer text-center transition"
            >
              {category}
            </li>
          ))}
          
        </ul>
      
      
      </div>
    )
};

export default CategoryList;

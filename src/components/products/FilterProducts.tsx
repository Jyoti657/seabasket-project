import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useState } from "react";
import { filterProducts } from "../../store/Slice/productSlice";

const FilterProducts:React.FC = () => {
    const dispatch= useDispatch<AppDispatch>();
     const [priceRange,setRange]=useState({min:0,max:10000})
     const [rating,setRating]=useState(0)
     const [category,setCategory]=useState("")
     const[discount ,setDiscount]=useState(0)

      const handlefilterProduct=()=>{
        dispatch(filterProducts({priceRange,rating,category,discount}))
        
      }
      console.log(priceRange)
        console.log(rating)
        console.log(category)
    return (
        <div className="p-4 border rounded-md space-y-4">
        <div>
          <label>Price Range: </label>
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setRange({ ...priceRange, min: +e.target.value })}
            className="border p-1 mx-1 w-20"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setRange({ ...priceRange, max: +e.target.value })}
            className="border p-1 w-20"
          />
        </div>
        <div>
          <label>Min Rating: </label>
          <input
            type="number"
            max={5}
            min={0}
            step={0.1}
            value={rating}
            onChange={(e) => setRating(+e.target.value)}
            className="border p-1 w-20"
          />
        </div>
        <div>
          <label>Min Discount (%): </label>
          <input
            type="number"
            max={100}
            min={0}
            step={1}
            value={discount}
            onChange={(e) => setDiscount(+e.target.value)}
            className="border p-1 w-20"
          />
        </div>
        <div>
        <label>Category (Optional): </label>
        <input
          type="text"
          placeholder="e.g. smartphones"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-1 w-40"
        />
      </div>
        <button
          onClick={handlefilterProduct}
          className="px-4 py-1 bg-blue-600 text-white rounded"
        >
          Apply Filters
        </button>
      </div>
    );

}
 export default FilterProducts;
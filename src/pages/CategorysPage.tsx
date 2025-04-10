import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { ProductProps } from "../types";
import Button from "../components/ui/Button";
import { addToCart } from "../store/Slice/cartSlice";
import { currencyFormatter } from "../util/formatting";

const Category: React.FC = () => {
    const { categoryName } = useParams();
  
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { allProducts } = useSelector((state: RootState) => state.product);
    const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  
    useEffect(() => {
      const categoryProducts = allProducts.filter(
        (product) => product.category === categoryName
      );
      setFilteredProducts(categoryProducts);
    }, [categoryName, allProducts]);
  
    const handleAddToCart = (product: ProductProps) => {
      dispatch(addToCart(product));
    };
  
    const handleProductClick = (id: number | string) => {
      navigate(`/products/${id}`);
    };
  
    return (
      <>
        <h1 className="container mx-auto py-10 text-center font-extrabold">
          Products in {categoryName}
        </h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pb-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition flex
              flex-col justify-between h-full
              "
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain mb-4 cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              />
              <div className="flex-1 p-4">
                <h2 className="text-lg font-semibold text-gray-700 text-center mb-2">
                  {product.title}
                </h2>
                <p className="text-center text-gray-600">
                  {currencyFormatter.format(product.price)}
                </p>
              </div>
              <div className="mt-6 flex gap-4">
                <Button
                  label="Buy Now"
                  className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
                />
  
                <Button
                  label="Add to Cart"
                  className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
                  onClick={() => handleAddToCart(product)}
                />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  
  export default Category;
  
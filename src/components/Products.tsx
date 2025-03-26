import { ProductProps } from "../types";
import { FaShoppingCart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart, addToFavorite } from "../store/slice";
import { AppDispatch } from "../store/store";

interface ProductsProps {
  productData: ProductProps[];
}

const Products: React.FC<ProductsProps> = ({ productData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleAddToCart = (product: ProductProps) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        description: product.description,
        rating: product.rating,
      })
    );
  };
  const handleAddToFavorite = (Product: ProductProps) => {
    dispatch(
      addToFavorite({
        id: Product.id,
        title: Product.title,
        price: Product.price,
        image: Product.image,
        category: Product.category,
        description: Product.description,
        rating: Product.rating,
      })
    );
  };
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-6">Products List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productData.length > 0 ? (
          productData.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col justify-between h-full"
            >
              <div className="flex-grow">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-contain mb-4"
                />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-gray-500">{product.category}</p>
                {/* <p className="text-gray-500">{product.description}</p> */}
                {/* <p className="text-gray-500">{product.rating.rate}</p> */}
                {/* <p className="text-gray-500">{product.rating.count}</p> */}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <FaShoppingCart
                  className="text-xl"
                  onClick={() => handleAddToCart(product)}
                />

                <button
                  className="flex items-center gap-2 bg-seabasket_green text-white py-2 px-4 rounded-md hover:bg-green-700 transition "
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>

                <button className="text-red-500 hover:text-red-700">
                  <MdFavorite
                    className="text-2xl"
                    onClick={() => handleAddToFavorite(product)}
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Products;

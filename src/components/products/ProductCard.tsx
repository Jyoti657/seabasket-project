import { ProductProps } from "../../types";
import { ShoppingCart } from "@mui/icons-material";
import FavoriteButton from "../header/FavoriteButton";
import Button from "../ui/Button";
import { currencyFormatter } from "../../util/formatting";

interface ProductCardProps {
  product: ProductProps;
  handleAddToCart: (product: ProductProps) => void;
  handleProductClick: (id: number) => void;
}

const ProductCards: React.FC<ProductCardProps> = ({
  product,
  handleAddToCart,
  handleProductClick,
}) => {
  return (
    <div
      className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between h-full bg-soft_mint"
    >
      <div className="flex-grow">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 object-contain mb-4 cursor-pointer"
          onClick={() => handleProductClick(product.id)}
        />
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">{currencyFormatter.format(product.price)}</p>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <Button
          className="text-xl cursor-pointer bg-seabasket_green hover:bg-teal-950 text-white"
          label="Add to Cart"
          onClick={() => handleAddToCart(product)}
        />
        <ShoppingCart
          className="text-xl cursor-pointer"
          onClick={() => handleAddToCart(product)}
        />
        <FavoriteButton product={product} />
      </div>
    </div>
  );
};

export default ProductCards;

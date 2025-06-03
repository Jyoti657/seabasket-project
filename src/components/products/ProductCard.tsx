import { ProductProps } from "../../types";
import { ShoppingCart } from "@mui/icons-material";
import FavoriteButton from "../header/FavoriteButton";
import Button from "../ui/Button";
import { currencyFormatter } from "../../util/formatting";

interface ProductCardProps {
  product: ProductProps;
  onAddToCart?: (product: ProductProps) => void;
  onProductClick?: (id: number) => void;
  onFavoriteSuccess?: () => void;
  onRemove?: (id: number) => void;
  showFavorite?: boolean;
  showRemoveButton?: boolean;
  removeLabel?: string;
  customActionButtons?: React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onProductClick,
  onFavoriteSuccess,
  onRemove,
  showFavorite = true,
  showRemoveButton = false,
  removeLabel = "Remove",
  customActionButtons,
}) => {
  return (
    <div className="border p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full bg-soft_mint">
      <div className="flex-grow">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 object-contain mb-4 rounded cursor-pointer hover:scale-105 transition"
          onClick={() => onProductClick?.(product.id)}
        />
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
          {product.name}
        </h2>
        <p className="text-gray-600 font-medium">
          {currencyFormatter.format(product.price)}
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-5 pt-4 border-t border-gray-200">
        {onAddToCart && (
          <div className="flex items-center justify-between gap-3">
            <Button
              className="flex-1 text-sm sm:text-base bg-seabasket_green hover:bg-teal-950 text-white rounded-md"
              label="Add to Cart"
              onClick={() => onAddToCart(product)}
            />
            <ShoppingCart
              className="text-seabasket_green hover:text-teal-900 text-[28px] cursor-pointer transition-transform duration-150 hover:scale-110"
              onClick={() => onAddToCart(product)}
            />
          </div>
        )}

        {showFavorite && (
          <FavoriteButton product={product} onsuccess={onFavoriteSuccess} />
        )}

        {showRemoveButton && onRemove && (
          <Button
            label={removeLabel}
            className="bg-red-500 text-white hover:bg-red-700 rounded-md"
            onClick={() => onRemove(product.id)}
          />
        )}

        {customActionButtons}
      </div>
    </div>
  );
};

export default ProductCard;

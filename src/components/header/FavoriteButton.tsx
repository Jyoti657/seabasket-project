import { Favorite } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { wishlistadd } from "../../store/Slice/favoriteSlice";
import { AppDispatch, RootState } from "../../store/store";
import { ProductProps } from "../../types";

interface FavoriteButtonProps {
  product: ProductProps;
  onsuccess: () => void;
}
const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  product,
  onsuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const favoriteProducts = useSelector(
    (state: RootState) => state.favorites.favoriteProducts
  );

  const matchedFavorite = favoriteProducts.find((fav) => fav.id === product.id);
  const isFavorited = !!matchedFavorite;

  const handleToggleFavorite = () => {
    dispatch(wishlistadd(product.id));
    if (onsuccess) {
      onsuccess();
    }
  };
  return (
    <button
      className={`text-2xl cursor-pointer transition ${
        isFavorited
          ? "text-red-500 hover:text-red-700"
          : "text-gray-400 hover:text-gray-600"
      }`}
      onClick={handleToggleFavorite}
    >
      <Favorite />
    </button>
  );
};

export default FavoriteButton;

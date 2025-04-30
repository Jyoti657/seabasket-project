import { Favorite } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { wishlistadd } from "../../store/Slice/favoriteSlice";
import { AppDispatch, RootState } from "../../store/store";
import { ProductProps } from "../../types";

interface FavoriteButtonProps {
  product: ProductProps;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const favoriteProducts = useSelector((state: RootState) => state.favorites);

  const handleToggleFavorite = () => {
    dispatch(wishlistadd(product.id.toString()));
  };

  return (
    <button
      className={`text-2xl cursor-pointer transition ${
        favoriteProducts
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

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { removeFavorites, resetFavorites } from "../store/Slice/favoriteSlice";
import { Favorite } from "@mui/icons-material";
import { currencyFormatter } from "../util/formatting";
import Button from "../components/ui/Button";

const FavoritesPage: React.FC = () => {
  const { favoriteProducts } = useSelector(
    (state: RootState) => state.favorites
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorites({ id }));
  };
  const handleResetFavorite = () => {
    dispatch(resetFavorites());
  };
  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold text-center mb-6">MY WishList</h1>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col justify-between h-full"
              >
                <div className="flex-grow">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-contain mb-4 cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  />
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-gray-600">
                    {currencyFormatter.format(product.price)}
                  </p>
                  <p className="text-gray-500">{product.category}</p>
                </div>

                <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                  <Button
                  className="bg-red"
                    label="Remove"
                    onClick={() => handleRemoveFavorite(product.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No favorites yet!</p>
        )}
      </div>
      <div className="flex justify-center m-10">
        <Button label="Reset Favorites" onClick={handleResetFavorite}
         className="bg-red-500"
         />
      </div>
    </>
  );
};

export default FavoritesPage;

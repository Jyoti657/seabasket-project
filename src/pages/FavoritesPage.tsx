import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import {
  deleteWishlist,
  getWhislist,
  resetFavorites,
} from "../store/Slice/favoriteSlice";

import { currencyFormatter } from "../util/formatting";
import Button from "../components/ui/Button";
import { useEffect } from "react";

const FavoritesPage: React.FC = () => {
  const { favoriteProducts } = useSelector(
    (state: RootState) => state.favorites
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRemoveFavorite = (id: string) => {
      dispatch(deleteWishlist(id));
      console.log("Deleting item from wishlist:", id); 


  };
  const handleResetFavorite = () => {
    dispatch(resetFavorites());
  };
  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };
  useEffect(() => {
    dispatch(getWhislist());
  }, [dispatch]);
  return (
    <>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold text-center mb-6">MY WishList</h1>

        {favoriteProducts && favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="border p-4 bg-soft_mint rounded-lg shadow-lg hover:shadow-xl transition flex flex-col justify-between h-full"
              >
                <div className="flex-grow">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-contain mb-4 cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  />
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-500">{product.category}</p>
                  <p className="text-gray-600">
                    {currencyFormatter.format(product.price)}
                  </p>
                </div>

                <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                  <Button
                    className="text-xl cursor-pointer bg-seabasket_green hover:bg-teal-950 text-white"
                    label="Remove"
                    onClick={() => handleRemoveFavorite(product.id.toString())}
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
        <Button
          label="Reset Favorites"
          onClick={handleResetFavorite}
          className="bg-seabasket_green"
        />
      </div>
    </>
  );
};

export default FavoritesPage;

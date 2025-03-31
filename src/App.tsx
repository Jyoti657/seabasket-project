import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Cart from "./pages/CartPage";
import Checkout from "./pages/CheckoutPage";
import Order from "./pages/OrderPage";
import Products from "./pages/ProductsPage";
// import ProductsDetails from "./pages/ProductDetailsPage"
import Profile from "./pages/ProfilePage";
import RootLayout from "./components/RootLayout";
import CategoryPage from "./pages/categoryPage";
import ProductDetails from "./pages/ProductDetailsPage";
import FavoritesPage from "./pages/FavoritesPage"


const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<Order />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails/>}/>
          <Route path="/Profile" element={<Profile />} />
          <Route path="/favorites" element={<FavoritesPage/>}/>
        </Route>
      </Routes>
      
    </>
  );
};
export default App;

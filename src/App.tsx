import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Cart from "./pages/CartPage";
import Checkout from "./pages/CheckoutPage";
import Order from "./pages/OrderPage";
import Products from "./pages/ProductsPage";
import Profile from "./pages/ProfilePage";
import RootLayout from "./components/RootLayout";
import CategoryPage from "./pages/CategorysPage";
import ProductDetails from "./pages/ProductDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import Login from "./pages/Login";
import AddressPage from "./pages/AddressPage";
import SignUpPage from "./pages/SignUpPage";

import OrderDetails from "./pages/OrderDetails";
import Error from "./pages/Error";
import SearchPage from "./pages/SearchPage";
import Opt from "./pages/OTP";
import ForgotPasswordPage from "./pages/ForgetPasswordsPage";
import PrivateRoute from "./pages/PrivateRoute";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage/>}/>


          <Route element={<PrivateRoute />}>
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/otp" element={<Opt />} />
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/address" element={<AddressPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;

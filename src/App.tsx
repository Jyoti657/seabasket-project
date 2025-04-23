import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
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
import Opt from "./pages/Opt";
import ForgotPasswordPage from "./pages/ForgetPasswordsPage";
import { checkAuthLoader, tokenLoader } from "./util/auth";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      id: "root",
      loader: tokenLoader,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login />,
        

         },
        { path: "category/:categoryName", element: <CategoryPage /> },
        { path: "cart", element: <Cart /> },
        { path: "products", element: <Products /> },
        { path: "products/:id", element: <ProductDetails /> },
        { path: "favorites", element: <FavoritesPage /> },
        { path: "signUp", element: <SignUpPage /> },
        { path: "forgotPassword", element: <ForgotPasswordPage /> },
        { path: "search", element: <SearchPage /> },
        { path: "otp", element: <Opt /> },
        { path: "profile", element: <Profile />, 
          loader:checkAuthLoader,
        },
        { path: "address", element: <AddressPage />, 
          loader:checkAuthLoader,
        },
        { path: "checkout", element: <Checkout /> },
        { path: "order", element: <Order />,
          loader:checkAuthLoader,
         },
        { path: "order/:id", element: <OrderDetails />, 
          loader:checkAuthLoader,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

  import { Outlet } from "react-router-dom";
  import Header from "./header/Header";
  import Footer from "./Footer";

  import HeadBottom from "./header/HeaderBottom";

  const RootLayout: React.FC = () => {
    return (
      <>
        <Header />
        <HeadBottom />
        <Outlet />
        <Footer />
      </>
    );
  };
  export default RootLayout;

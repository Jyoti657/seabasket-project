import { Outlet} from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
import HeadBottom from "./header/HeaderBottom";

const RootLayout: React.FC = () => {
return (
    <>
      <div className="min-h-screen flex flex-col ">
        <Header />
        <HeadBottom />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};
export default RootLayout;

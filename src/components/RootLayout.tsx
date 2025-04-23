import { Outlet, useRouteLoaderData, useSubmit } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
import HeadBottom from "./header/HeaderBottom";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

const RootLayout: React.FC = () => {

  const token=useRouteLoaderData("root") as string;
  const submit=useSubmit();
  useEffect(() => {
      if(token==="Expired"){
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        submit(null, {action:"/logout"});
        return;

      
      }
    const tokenDuration=getTokenDuration();
    console.log(tokenDuration);
    if(tokenDuration<0){
      submit(null, {action:"/logout", method:"post"});
      return;
    }
    },[token, submit]);
  
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

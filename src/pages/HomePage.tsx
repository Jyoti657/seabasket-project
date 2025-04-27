import { useEffect, useState } from "react";
import CategoryList from "../components/header/CategoryList";
import TrendingProducts from "../components/header/TrendingProducts";
import Spinner from "../components/ui/Spinner";

const Home: React.FC = () => {
 const[loading,setLoading]= useState(true)
 useEffect(()=>{
  const timer=setTimeout(()=>{
    setLoading(false)
  }
  ,2000)
  return () => clearTimeout(timer)
 },[])
 if(loading){
  return <Spinner/>
 }
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div>
         <TrendingProducts /> 
      </div>
      <div>
        <CategoryList /> 
      </div>
    </div>
  );
};

export default Home;

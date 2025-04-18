import CategoriesListProduct from "../components/header/CategoriesListProduct";
import CategoryList from "../components/header/CategoryList";
import TrendingProducts from "../components/header/TrendingProducts";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div> 
        <TrendingProducts/>
        
        </div>
      <div>
        <CategoryList />
      </div>
       {/* < className="flex flex-col items-center">
        <h2 className="font-semibold mb-5 text-xl">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
  {/* <CategoriesListProduct /> 
</div> */}

      </div> 
    
  );
};

export default Home;

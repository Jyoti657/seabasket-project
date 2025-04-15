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

    </div>
  );
};

export default Home;

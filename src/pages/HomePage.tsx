
import Banner from "../components/header/Banner";

import CategoryList from "../components/header/CategoryList";

const Home: React.FC = () => {
  
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Banner />
      <CategoryList/>
      

    </div>
  );
};

export default Home;

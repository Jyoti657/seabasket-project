import CategoryList from "../components/header/CategoryList";
// import Trending from "../components/header/Trending";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* <Trending /> */}
      <CategoryList />
    </div>
  );
};

export default Home;

import CategoryList from "../components/header/CategoryList";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div>{/* <TrendingProducts/> */}</div>
      <div>
        <CategoryList />
      </div>
    </div>
  );
};

export default Home;

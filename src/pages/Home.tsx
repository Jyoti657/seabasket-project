import Banner from "../components/Banner";
import Products from "../components/Products";
import { useEffect, useState } from "react";
import { ProductProps } from "../types";

const Home: React.FC = () => {
  const [productData, setProductData] = useState<ProductProps[]>([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const respone = await fetch("https://fakestoreapi.com/products ");
        const data: ProductProps[] = await respone.json();
        setProductData(data);
      } catch (e) {
        console.error("failed to fetch products", e);
      }
    };
    fetchProduct();
  }, []);

  return (
    <>
      <Banner />
      <Products productData={productData} />
    </>
  );
};
export default Home;

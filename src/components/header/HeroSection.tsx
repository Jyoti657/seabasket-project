import React from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import logo1 from "../../assets/logo1.png";
const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const handleproducts = () => {
    navigate("/products");
  };

  return (
    <section className="bg-soft_mint py-16 px-4 md:px-10 lg:px-20 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
            Quality Products for {" "}
            <span className="text-seabasket_green">Every Need</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-xl">
            Discover our exclusive collection of premium products at unbeatable
            prices. Shop smart, live better.
          </p>
          <Button
            label="Shop Now"
            className="bg-seabasket_green hover:bg-green-700 text-white px-6 py-3 text-lg rounded-xl transition duration-300"
            onClick={handleproducts}
          />
        </div>

        <div className="flex justify-center">
          <img
            src={logo1}
            alt="Premium Products"
            className="rounded-full shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg h-auto "

          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

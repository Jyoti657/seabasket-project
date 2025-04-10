import { NavLink } from "react-router-dom";
import Button from "../components/ui/Button";

const Error: React.FC = () => {
  return (
    <>
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <NavLink to={"/"}>
          <Button className="bg-soft_mint" label="Go To Home" />
        </NavLink>
      </div>
    </>
  );
};
export default Error;

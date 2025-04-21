// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";
import { useState } from "react";
import { Outlet , Navigate} from "react-router-dom";

const PrivateRoute:React.FC=()=>{
//  const isAuthenticated=   useSelector((state:RootState)=>state.auth.isAuthenticated)
const [isAuthenticated,setIsAuthenicated]=useState(true)


    return isAuthenticated ? <Outlet/>:<Navigate to={("/login")} replace/>
}
export default PrivateRoute;
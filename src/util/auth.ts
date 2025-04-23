import { redirect } from "react-router-dom";

export const getTokenDuration = () => {
  const expriation = localStorage.getItem("expiration");
  const expirationDate = new Date(expriation!);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};
export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "Expired";
  }
  return token;
};
export const tokenLoader = () => {
  return getToken();
};
export const checkAuthLoader = () => {
  const token = getToken();
  if (!token) {
    return redirect("/otp");
  }
};

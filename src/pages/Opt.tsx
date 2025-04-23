import { redirect } from "react-router-dom";
import OTPVerification from "../components/auth/OTPVerification";

const Opt: React.FC = () => {
  return (
    <>
      <OTPVerification />
    </>
  );
};
export default Opt;
export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const otp = formData.get("otp");
    const email = formData.get("email");
  
    const response = await fetch("http://localhost:3100/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, email }),
    });
  
    if (!response.ok) {
      return new Response("OTP verification failed", { status: response.status });
    }
  
    const data = await response.json();
    const token = data.token;
  
    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());
  
    return redirect("/");
  }
  

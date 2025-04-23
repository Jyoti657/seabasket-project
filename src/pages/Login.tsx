// import { redirect, json } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const Login: React.FC = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};
export default Login;

export async function action({ request }: any) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode");
  if (mode !== "login" && mode !== "signup") {
    return json({ message: "unsported mode" }, { status: 422 });
  }
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch("http://localhost:3100/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 401 || response.status === 422) {
    return json({ message: "Invalid credentials" }, { status: 401 });
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
    });
  }

  const data = await response.json();
  const token = data.token;
  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}

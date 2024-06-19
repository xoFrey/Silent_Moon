import { useContext, useState } from "react";
import ButtonPink from "../components/ButtonPink";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../api/api.js";
import { TokenContext, UserContext } from "../../context/Context.jsx";

const Login = () => {
  const [email, setEmail] = useState("goodomen@outlook.org");
  const [password, setPassword] = useState("hallo123");

  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (!data.result) return setErrorMessage(data.message || "Failed login");

    setUser(data?.result.user);
    setToken(data?.result.tokens.accessToken);
    navigate("/home");
  };
  return (
    <main>
      <h4 className="font-bold text-maintext text-3xl leading-10 text-center mt-36">
        Welcome Back!
      </h4>
      <form className="flex flex-col items-center gap-7">
        <div>
          <div>
            <input
              className=" w-72 mb-5 bg-slate-600 text-slate-200 px-4 py-2 rounded-lg"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className=" w-72 mb-5 bg-slate-600 text-slate-200 px-4 py-2 rounded-lg"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          className=" border-slate-600 border px-4 py-2 rounded-lg duration-300 hover:scale-105 hover:bg-slate-600 hover:text-slate-200"
          onClick={loginUser}
        >
          Login
        </button>
        <p className=" text-center">{errorMessage}</p>
      </form>
    </main>
  );
};

export default Login;

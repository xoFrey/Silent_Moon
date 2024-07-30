import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../api/api.js";
import { TokenContext, UserContext } from "../../context/Context.jsx";
import GoBackButton from "../components/GoBackButton.jsx";
import Header from "../components/Header.jsx";
import PinkButton from "../components/PinkButton.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    await setUser(data?.result.user);
    await setToken(data?.result.tokens.accessToken);
    navigate("/home");
  };
  return (
    <main >
      <GoBackButton />
      <div className='flex justify-center '>
        <Header />
      </div>
      <h4 className='font-black text-maintext text-4xl leading-10 text-center mt-12 mb-20 tracking-wide'>
        Welcome Back!
      </h4>
      <form>
        <div>
          <div className='flex flex-col items-center '>
            <input
              className='mb-5 h-16 lg:w-1/2 w-10/12 border-solid border border-pink text-subtext rounded-full text-center text-base font-semibold leading-5 tracking-wider'
              id='email'
              type='email'
              placeholder='E-Mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-center'>
            <input
              className='mb-5 h-16 lg:w-1/2 w-10/12 border-solid border border-pink text-subtext rounded-full text-center text-base font-semibold leading-5 tracking-wider'
              id='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <PinkButton
          name='LOGIN'
          funktion={loginUser}
        />
        <p className=' text-center'>{errorMessage}</p>
      </form>
      <p className='uppercase text-subtext leading-5 text-center pb-24 mt-3.5 mx-3.5 font-semibold'>
        don't have an account yet?
        <a
          href='/register'
          className='pl-1 text-pink'>
          sign up
        </a>
      </p>
    </main>
  );
};

export default Login;

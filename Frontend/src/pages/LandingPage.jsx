import { useNavigate } from "react-router-dom";
import HeaderDark from "../components/HeaderDark";

import { backendUrl } from "../api/api";
import { useContext } from "react";
import { TokenContext, UserContext } from "../../context/Context";
import PinkButton from "../components/PinkButton";

const LandingPage = () => {
  const { setUser } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  const getRouted = () => {
    navigate(`/register`);
  };

  const guestLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email: "guest@guest.com", password: "hallo" }),
      credentials: "include",
    });

    const data = await res.json();

    if (!data.result) return setErrorMessage(data.message || "Failed login");

    await setUser(data?.result.user);
    await setToken(data?.result.tokens.accessToken);
    navigate("/home");

  };



  return (
    <section className="h-screen  mb-48">
      <div className="bg-landingImg  bg-top bg-contain bg-no-repeat h-3/4">
        <HeaderDark />
      </div>
      <div className="flex flex-col -mt-16">
        <h4 className="font-bold text-maintext text-3xl leading-10 text-center">
          We are what we do
        </h4>
        <p className="text-subtext leading-5 text-center mt-3.5 mx-3.5 font-semibold">
          Thousand of people are using silent moon for meditation and yoga
          classes.
        </p>
      </div>
      <div>
        <div className=" mt-16 mb-5">
          <PinkButton name="Sign Up" funktion={getRouted} />
        </div>
        <p className="uppercase text-subtext leading-5 text-center pb-8 mt-3.5 mx-3.5 font-semibold">
          already have an account?
          <a href="/login" className="pl-1 text-pink">
            log in
          </a>
        </p>
        <PinkButton name="Login as Guest" funktion={guestLogin} />
      </div>
    </section>
  );
};

export default LandingPage;

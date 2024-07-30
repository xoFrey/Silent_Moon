import { useNavigate } from "react-router-dom";
import HeaderDark from "../components/HeaderDark";
import { backendUrl } from "../api/api";
import { useContext, useState } from "react";
import { TokenContext, UserContext } from "../../context/Context";
import PinkButton from "../components/PinkButton";
const LandingPage = () => {
  const { setUser } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();

  const getRouted = () => {
    navigate(`/register`);
  };

  const guestLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email: "guest@guest.com",
        password: "guest",
      }),
      credentials: "include",
    });

    const data = await res.json();

    if (!data.result) return setErrorMessage(data.message || "Failed login");

    await setUser(data?.result.user);
    await setToken(data?.result.tokens.accessToken);
    navigate("/home");
  };

  return (

    <section className="h-screen w-screen ">
      <div className="bg-landingImg bg-top bg-contain bg-no-repeat sm:bg-cover sm:h-full h-3/4 lg:bg-contain  md:bg-contain  ">
        <HeaderDark />
      </div>
      <div className="flex flex-col pb-12 -mt-24 sm:-mt-10 lg:mt-24 ">
        <h4 className="font-bold text-maintext text-3xl leading-10 text-center">
          We are what we do
        </h4>
        <p className="text-subtext leading-5 text-center mt-3.5 mx-3.5 font-semibold">
          Thousand of people are using silent moon for meditation and yoga
          classes.
        </p>

        <div>
          <div className=" mt-8 mb-5">
            <PinkButton name="Register" funktion={getRouted} />
          </div>
          <p className="uppercase text-subtext leading-5 text-center mb-3.5 mt-3.5 mx-3.5 font-semibold">
            already have an account?
            <a href="/login" className="pl-1 text-pink">
              log in
            </a>
          </p>
          <PinkButton name="Login as Guest" funktion={guestLogin} />
        </div>
      </div>
    </section>
  );
};

export default LandingPage;

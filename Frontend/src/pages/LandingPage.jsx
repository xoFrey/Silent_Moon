import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ButtonPink from "../components/ButtonPink";

const LandingPage = () => {
  const navigate = useNavigate();

  const getRouted = () => {
    navigate(`/register`);
  };

  return (
    <section className="h-screen ">
      <div className="bg-landingImg  bg-top bg-contain bg-no-repeat h-3/4">
        <Header />
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
          <ButtonPink name="Sign Up" funktion={getRouted} />
        </div>
        <p className="uppercase text-subtext leading-5 text-center pb-24 mt-3.5 mx-3.5 font-semibold">
          already have an account?
          <a href="/login" className="pl-1 text-pink">
            log in
          </a>
        </p>
      </div>
    </section>
  );
};

export default LandingPage;

import { useNavigate } from "react-router-dom";
import PinkButton from "../components/PinkButton";
import HeaderDark from "../components/HeaderDark";

const GetStarted = () => {
  const navigate = useNavigate();
  const getRouted = () => {
    navigate(`/notification`);
  };

  return (
    <section className="h-screen w-screen">
      <div className="bg-getStartedImg  bg-top bg-contain bg-no-repeat sm:bg-cover sm:h-full h-3/4 lg:bg-contain  md:bg-contain  ">
        <HeaderDark />
        <div className="">
          <h1 className="font-black text-lightcreme text-4xl leading-10">
            Hi Leon, welcome to Silent Moon
          </h1>
        </div>
      </div>
      <div className=" ">
        <PinkButton name="GET STARTED" funktion={getRouted} />
      </div>
    </section>
  );
};

export default GetStarted;

import { useNavigate } from "react-router-dom";
import PinkButton from "../components/PinkButton";

const GetStarted = () => {
  const navigate = useNavigate();

  const getRouted = () => {
    navigate(`/notification`);
  };

  return (
    <section className="h-screen">
      <div className="bg-getStartedImg bg-contain bg-no-repeat h-full">
        <div className="flex justify-end mr-3 pt-3">
          <img src="/image/SilentMoonDarkLogo.png" className="h-20" />
        </div>
        <div className="w-44 mt-20 ml-8">
          <h1 className="font-black text-lightcreme text-4xl leading-10">
            Hi Leon, welcome to Silent Moon
          </h1>
        </div>
      </div>
      <div className="-mt-28 ">
        <PinkButton name="GET STARTED" funktion={getRouted} />
      </div>
    </section>
  );
};

export default GetStarted;

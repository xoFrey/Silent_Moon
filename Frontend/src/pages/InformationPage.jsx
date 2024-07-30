import GoBackButton from "../components/GoBackButton";
import Header from "../components/Header";

const InformationPage = () => {
  return (
    <>
      <div className="fixed">
        <GoBackButton />
      </div>
      <Header />
      <h4 className="font-black text-maintext text-4xl mt-10 mx-4 leading-10 text-center tracking-wide">
        SILENT MOON 2.0
      </h4>
      <p className=" text-subtext leading-5 pb-12 text-center mt-3  mx-4 font-semibold">
        is comming up on december 2024
      </p>
      <div className=" px-5">
        <p className=" mb-5 font-semibold text-maintext text-lg">
          Patchnotes for the next upcoming Update:
        </p>
        <ul className="leading-5 font-black text-lg text-maintext p-5 list-disc">
          <li className="mb-1">Social Aspect</li>
          <p className="ml-3 mb-2 font-semibold text-subtext">
            - You will have the ability to follow other Users and see their
            favorite exercises.
          </p>
          {/* <li className="mb-1">Adult Check</li>
          <p className="ml-3 mb-2 font-semibold text-subtext">
            - Are you already 18 or not?
          </p> */}
          <li className="mb-1">Tantra Yoga Exercises</li>
          <p className="ml-3 mb-2 font-semibold text-subtext">
            - Sensual partner exercises.
          </p>
          <li className="mb-1">AI Chatbot </li>
          <p className="ml-3 mb-2 font-semibold text-subtext">
            - Examples for appropriate exercises that can help against specific
            pains or injuries.
          </p>
          <li className="mb-1">
            Achievements for successfully completed Exercises
          </li>
          <p className="ml-3 mb-2 font-semibold text-subtext">
            - for example badges or titles
          </p>
        </ul>
      </div>
    </>
  );
};

export default InformationPage;

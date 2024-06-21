import GoBackButton from "../components/GoBackButton";
import Header from "../components/Header";

const InformationPage = () => {
  return (
    <><div className="fixed">
      <GoBackButton />
    </div>
      <Header />
      <h4 className="font-black text-maintext text-4xl mt-10 mx-3.5 leading-10 text-center  tracking-wide">
        SILENT MOON 2.0
      </h4>
      <p className=" text-subtext leading-5  pb-28 text-center mt-3  mx-3.5  font-semibold">
        is comming up on december 2024
      </p>
      <ul className="  p-5 ">
        <li>Adult Check</li>
        <li>Tantra Yoga Exercises</li>

        <li>AI for getting more Information about injuries </li>
      </ul>
    </>
  );
};

export default InformationPage;

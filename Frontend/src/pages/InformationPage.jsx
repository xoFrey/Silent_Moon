import GoBackButton from "../components/GoBackButton";
import Header from "../components/Header";

const InformationPage = () => {
  return (
    <>
      <div className="fixed">
        <GoBackButton />
      </div>
      <Header />
      <h4 className="font-black text-maintext text-4xl mt-10 mx-3.5 leading-10 text-center  tracking-wide">
        SILENT MOON 2.0
      </h4>
      <p className=" text-subtext leading-5 pb-20 text-center mt-3  mx-3.5  font-semibold">
        is comming up on december 2024
      </p>
      <div className=" ml-3 mr-3">
        <p className=" mb-5 font-normal text-maintext text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ullam
          mollitia vero nemo quasi nostrum est unde voluptatem porro eius.
        </p>
        <ul className="leading-5 font-black text-lg text-maintext p-5  list-disc">
          <li>Adult Check</li>
          <p className=" font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            dolorum.
          </p>
          <li>Tantra Yoga Exercises</li>
          <p className=" font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            dolorum.
          </p>
          <li>AI for getting more Information about injuries </li>
          <p className=" font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            dolorum.
          </p>
          <li>Achievements for successfully completed Exercises</li>
        </ul>
      </div>
    </>
  );
};

export default InformationPage;

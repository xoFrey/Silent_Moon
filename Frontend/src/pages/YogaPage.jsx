import CatergoryTiles from "../components/CategoryTiles";
import Categorys from "../components/Categorys";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";

const YogaPage = () => {
  return (
    <main>
      <Header />
      <h1 className="font-black text-maintext text-4xl leading-10 text-center mt-12 tracking-wide">
        Yoga
      </h1>
      <p className="text-subtext leading-5 text-center mt-7 mb-12 font-semibold">
        Find your inner zen from anywhere
      </p>
      <div className="mb-12">
        <Categorys />
      </div>
      <div className="mb-5">
        <Searchbar />
      </div>
      <div
        id="DailyCalmPlayerSub"
        className="flex justify-between h-24 w-11/12 bg-gradient-to-br from-green to-circle rounded-2xl items-center pl-7 ml-4 mb-5"
      >
        <div>
          <h1 className="text-maintext leading-5 font-semibold mb-2">
            Daily Calm
          </h1>
          <p className="text-subtext leading-5 font-semibold">
            APR 30 · Pause Practice
          </p>
        </div>
        <button className=" bg-maintext bg-opacity-80 w-10 h-10 rounded-full justify-center items-center flex mr-4">
          <img src="/image/PlayVector.png" alt="" />
        </button>
      </div>
      <div className="mb-20">
        <CatergoryTiles />
      </div>
    </main>
  );
};

export default YogaPage;

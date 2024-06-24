import CatergoryTiles from "../components/CategoryTiles";
import Categorys from "../components/Categorys";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import { backendUrl } from "../api/api";
import { TokenContext } from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import VerficationPopUp from "../components/VerificationPopUp";
import Navbar from "../components/Navbar";

const YogaPage = () => {
  const [category, setCategory] = useState("All");
  const [yoga, setYoga] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useContext(TokenContext);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    const allYoga = async () => {
      const res = await fetch(
        `${backendUrl}/api/v1/yoga/filterCategory/?categorySelection=${category}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!data.result)
        return (
          setErrorMessage(data.message || "No Yogas in this category found"),
          setYoga([])
        );
      setYoga(data.result);
    };
    if (inputSearch.length === 0) {
      allYoga();
    } else {
      const filteredYoga = yoga.filter((item) =>
        item.title.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setYoga(filteredYoga);
    }
  }, [category, inputSearch]);

  console.log(yoga);

  return (
    <main>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-black text-maintext text-4xl leading-10 text-center mt-8 tracking-wide">
          Yoga
        </h1>
        <p className="text-subtext leading-5 text-center mt-4 mb-8 font-semibold">
          Find your inner zen from anywhere
        </p>
      </div>
      <div className="mb-12">
        <Categorys category={category} setCategory={setCategory} />
      </div>
      <div className="mb-5">
        <Searchbar inputSearch={inputSearch} setInputSearch={setInputSearch} />
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
        <button className=" bg-maintext bg-opacity-80 w-10 h-10 rounded-full justify-center items-center flex mr-4 cursor-pointer">
          <img src={"/image/PlayVector.png"} alt="" />
        </button>
      </div>
      <section className="columns-2 ml-2 mb-12">
        {yoga.length !== 0 ? (
          yoga.map((yogaItem) => (
            <div key={yogaItem._id} className="">
              <CatergoryTiles
                id={yogaItem._id}
                imgUrl={`${backendUrl}/${yogaItem.fileUrl?.split("\\")[1]}`}
                title={yogaItem.title}
              />
            </div>
          ))
        ) : (
          <p>{errorMessage}</p>
        )}
      </section>
      <Navbar />
    </main>
  );
};

export default YogaPage;

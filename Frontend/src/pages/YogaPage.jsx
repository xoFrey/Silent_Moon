import CatergoryTiles from "../components/CategoryTiles";
import Categorys from "../components/Categorys";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import { backendUrl } from "../api/api";
import { TokenContext } from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { GoDotFill } from "react-icons/go";

const YogaPage = () => {
  const [category, setCategory] = useState("All");
  const [yoga, setYoga] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useContext(TokenContext);
  const [inputSearch, setInputSearch] = useState("");
  const [randomYoga, setRandomYoga] = useState();
  const [showMore, setShowMore] = useState(4);

  const currentDate = new Date();
  const formatDateToMMMDD = (date) => {
    const options = { month: "short", day: "2-digit" };
    const localeString = date.toLocaleString("en-US", options);
    const [month, day] = localeString.split(" ");
    return `${month.toUpperCase()}/${day.padStart(2, "0")}`;
  };
  const today = formatDateToMMMDD(currentDate);

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

  useEffect(() => {
    const fetchRandomYoga = async () => {
      const res = await fetch(`${backendUrl}/api/v1/yoga/getRandomYoga`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.result)
        return (
          setErrorMessage(data.message || "No random yoga found"),
          setRandomYoga([])
        );
      setRandomYoga(data.result);
    };
    fetchRandomYoga();
  }, []);

  return (
    <main className="mb-24">
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
        <Link to={`/yoga/${randomYoga?._id}`}>
          <div>
            <h1 className="text-maintext leading-5 font-semibold mb-2">
              {randomYoga?.title}
            </h1>
            <p className="text-subtext leading-5 font-semibold">
              {today} · {randomYoga?.category}
            </p>
          </div>
        </Link>
        <button className=" bg-maintext bg-opacity-80 w-10 h-10 rounded-full justify-center items-center flex mr-4 cursor-pointer">
          <img src={"/image/PlayVector.png"} alt="" />
        </button>
      </div>
      <section className="columns-2 ml-2 ">
        {yoga.length !== 0 ? (
          yoga.slice(0, showMore).map((yogaItem) => (
            <div key={yogaItem._id}>
              <CatergoryTiles
                id={yogaItem._id}
                imgUrl={yogaItem.fileUrl}
                title={yogaItem.title}
              />
            </div>
          ))
        ) : (
          <p>{errorMessage}</p>
        )}
      </section>
      <div className="flex flex-col items-center mt-2">
        <button
          onClick={() => setShowMore(showMore + 4)}
          className=" px-5 h-6 bg-subtext/50 text-circle rounded-full flex items-center"
        >
          <GoDotFill size={15} fill="#8E9775" />
          <GoDotFill size={15} fill="#8E9775" />
          <GoDotFill size={15} fill="#8E9775" />
        </button>
      </div>
      <Navbar />
    </main>
  );
};

export default YogaPage;

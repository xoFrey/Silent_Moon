import { useContext, useEffect, useState } from "react";
import CatergoryTiles from "../components/CategoryTiles";
import Categorys from "../components/Categorys";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import { backendUrl } from "../api/api";
import { TokenContext } from "../../context/Context";
import { Link, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import { GoDotFill } from "react-icons/go";

const MeditationPage = () => {
  const [category, setCategory] = useState("All");
  const [meditations, setMeditations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useContext(TokenContext);
  const [inputSearch, setInputSearch] = useState("");
  const [showMore, setShowMore] = useState(4);
  const [randomMeditation, setRandomMeditation] = useState();

  const currentDate = new Date();
  const formatDateToMMMDD = (date) => {
    const options = { month: "short", day: "2-digit" };
    const localeString = date.toLocaleString("en-US", options);
    const [month, day] = localeString.split(" ");
    return `${month.toUpperCase()}/${day.padStart(2, "0")}`;
  };
  const today = formatDateToMMMDD(currentDate);

  useEffect(() => {
    const allMeditation = async () => {
      const res = await fetch(
        `${backendUrl}/api/v1/meditation/filterCategory/?categorySelection=${category}`,
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
          setErrorMessage(
            data.message || "No Meditations in this category found"
          ),
          setMeditations([])
        );
      setMeditations(data.result);
    };

    if (inputSearch.length === 0) {
      allMeditation();
    } else {
      const filteredMeditation = meditations.filter((item) =>
        item.title.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setMeditations(filteredMeditation);
    }
  }, [category, inputSearch]);

  useEffect(() => {
    const fetchRandomMeditation = async () => {
      const res = await fetch(
        `${backendUrl}/api/v1/meditation/getRandomMeditation`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (!data.result)
        return (
          setErrorMessage(data.message || "No random meditation found"),
          setRandomMeditation([])
        );
      setRandomMeditation(data.result);
    };
    fetchRandomMeditation();
  }, []);

  return (
    <main className="mb-24 flex flex-col content-center">
      <Header />
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-black text-maintext text-4xl leading-10 text-center mt-8 tracking-wide">
          Meditate
        </h1>
        <p className="text-subtext leading-5 text-center mt-4 mb-8 font-semibold max-w-80">
          Audio-only meditation techniques to help you minimize your screen time
          and practice on the go.
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
        <Link to={`${randomMeditation?._id}`}>
          <div>
            <h1 className="text-maintext leading-5 font-semibold mb-2">
              {randomMeditation?.title}
            </h1>
            <p className="text-circle leading-5 font-semibold">
              {today} · {randomMeditation?.category}
            </p>
          </div>
        </Link>
        <NavLink to={`${randomMeditation?._id}`}>
          <button className=" bg-maintext bg-opacity-80 w-10 h-10 rounded-full justify-center items-center flex mr-4">
            <img src="/image/PlayVector.png" alt="" />
          </button>
        </NavLink>
      </div>
      <section className="columns-2 mx-2">
        {meditations.length !== 0 ? (
          meditations.slice(0, showMore).map((meditation) => (
            <div key={meditation._id}>
              <CatergoryTiles
                id={meditation._id}
                imgUrl={meditation.fileUrl}
                title={meditation.title}
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

export default MeditationPage;

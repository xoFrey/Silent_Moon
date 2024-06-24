import { useContext, useEffect, useState } from "react";
import CatergoryTiles from "../components/CategoryTiles";
import Categorys from "../components/Categorys";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import { backendUrl } from "../api/api";
import { TokenContext } from "../../context/Context";

const MeditationPage = () => {
  const [category, setCategory] = useState("All");
  const [meditations, setMeditations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useContext(TokenContext);
  const [inputSearch, setInputSearch] = useState("");
  const [showMore, setShowMore] = useState(4);


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
      const filteredMeditation = meditations.filter((item) => item.title.toLowerCase().includes(inputSearch.toLowerCase()));
      setMeditations(filteredMeditation);

    }

  }, [category, inputSearch]);


  return (
    <main className="mb-24">
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
      <section className="columns-2 ml-2">
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
      <div className="flex flex-col items-center">
        <button
          onClick={() => setShowMore(showMore + 4)}
          className="h-10 w-1/4 bg-pink text-circle rounded-full"
        >
          Show More
        </button>
      </div>
    </main>
  );
};

export default MeditationPage;

import { useContext, useEffect, useState } from "react";
import { TokenContext, UserContext } from "../../context/Context.jsx";
import Header from "../components/Header.jsx";
import ButtonStart from "../components/ButtonStart.jsx";
import Searchbar from "../components/Searchbar.jsx";
import { Link } from "react-router-dom";
import TileCards from "../components/TileCards.jsx";
import { backendUrl } from "../api/api";
import Navbar from "../components/Navbar.jsx";
import LoadingAnimation from "../components/LoadingAnimation.jsx";

const Home = () => {
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [yogaByLevel, setYogaByLevel] = useState("");
  const [meditationByLevel, setMeditationByLevel] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [dayTime, setDayTime] = useState("");
  const [randomYoga, setRandomYoga] = useState();
  const [randomMeditation, setRandomMeditation] = useState();

  useEffect(() => {
    const fetchYogaByLevel = async () => {
      {
        const res = await fetch(
          `${backendUrl}/api/v1/yoga/filterLevel/?levelSelection=${user.userLevel}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();

        if (!data.result) return "Failed to fetch all Yoga by level";
        setYogaByLevel(data.result);
      }
    };

    const fetchMeditationByLevel = async () => {
      const res = await fetch(
        `${backendUrl}/api/v1/meditation/filterLevel/?levelSelection=${user.userLevel}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();

      if (!data.result) return "Failed to fetch all Meditation by level";
      setMeditationByLevel(data.result);
    };
    if (inputSearch.length === 0) {
      fetchYogaByLevel();
      fetchMeditationByLevel();
    } else {
      const filteredYoga = yogaByLevel.filter((item) =>
        item.title.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setYogaByLevel(filteredYoga);
      const filteredMeditation = meditationByLevel.filter((item) =>
        item.title.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setMeditationByLevel(filteredMeditation);
    }
  }, [inputSearch]);

  const fetchRandomYoga = async () => {
    const res = await fetch(`${backendUrl}/api/v1/yoga/getRandomYoga`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!data.result) return "Failed to fetch a random yoga";
    setRandomYoga(data.result);
  };

  const fetchRandomMeditation = async () => {
    const res = await fetch(
      `${backendUrl}/api/v1/meditation/getRandomMeditation`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    if (!data.result) return "Failed to fetch a random meditation";
    setRandomMeditation(data.result);
  };

  const date = new Date(Date.now());
  const time = Number(
    date.toLocaleTimeString([], { hour: "2-digit" }).split(":")[0]
  );
  useEffect(() => {
    if (5 >= time <= 13) {
      setDayTime("Morning");
    } else if (time <= 17) {
      setDayTime("Afternoon");
    } else {
      setDayTime("Evening");
    }

    fetchRandomYoga();
    fetchRandomMeditation();
  }, [dayTime]);

  return (
    <main className="lg:px-60 ">
      <Header />
      <h2 className="text-2xl font-black w-4/5 mx-4 mb-2 mt-5 text-maintext  ">
        Good {dayTime} {user.username}
      </h2>
      <p className=" text-subtext leading-5 pb-10 mx-4 font-semibold ">
        We hope you have a good day.
      </p>
      <div className=" flex gap-4 justify-center mb-6 px-4">
        <Link to={`/yoga/${randomYoga?._id}`}>
          <div className=" relative z-0">
            <img src="../../image/RecoveryBigMeditate.png" alt="yoga image" />
            <p className=" absolute text-white left-3 bottom-5 font-light">
              {randomYoga?.duration}
            </p>
            <ButtonStart fill={"#FAF2DA"} typeColor={"#4A503D"} />
            <div className="flex flex-col absolute top-10 left-3">
              <p className="  text-circle  text-xl">
                {randomYoga?.title}
              </p>
              <p className=" uppercase  text-circle  text-xs">
                {randomYoga?.level}
              </p>
            </div>
          </div>
        </Link>
        <Link to={`/meditation/${randomMeditation?._id}`}>
          <div className=" relative z-0 ">
            <img src="../../image/RecoveryBigYoga.png" alt="meditation image" />
            <p className=" absolute text-white left-3 bottom-5 font-light">
              {randomMeditation?.duration}
            </p>
            <ButtonStart fill={"#4A503D"} typeColor={"#FAF2DA"} />
            <div className="flex flex-col absolute top-10 left-3">
              <p className="  text-circle text-xl">
                {randomMeditation?.title}
              </p>
              <p className=" uppercase  text-circle  text-xs">
                {randomMeditation?.level}
              </p>
            </div>
          </div>
        </Link>
      </div>
      <Searchbar inputSearch={inputSearch} setInputSearch={setInputSearch} />

      <section className="mb-10 mt-8">
        <h2 className=" text-2xl text-maintext font-bold tracking-wide pl-5 mb-6">
          Recommended Yoga for you
        </h2>
        <div className="flex items-baseline gap-5 overflow-x-scroll no-scrollbar px-4 pb-2">
          {yogaByLevel ? (
            yogaByLevel.map((item) => (
              <Link key={item._id} to={`/yoga/${item._id}`}>
                <TileCards
                  name={item.title}
                  level={item.level}
                  duration={item.duration}
                  imgURL={item.fileUrl}
                />
              </Link>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </section>

      <section className=" mb-32">
        <h2 className=" text-2xl text-maintext font-bold tracking-wide pl-5 mb-6">
          Recommended Meditation for you
        </h2>

        <div className="flex items-baseline gap-5 overflow-x-scroll no-scrollbar px-4 pb-2">
          {meditationByLevel ? (
            meditationByLevel.map((item) => (
              <Link key={item._id} to={`/meditation/${item._id}`}>
                <TileCards
                  name={item.title}
                  level={item.level}
                  duration={item.duration}
                  imgURL={item.fileUrl}
                />
              </Link>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </section>
      <Navbar />
    </main>
  );
};
export default Home;

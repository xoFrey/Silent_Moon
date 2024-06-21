import { useContext, useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import { TokenContext, UserContext } from "../../context/Context.jsx";
import Header from "../components/Header.jsx";
import ButtonStart from "../components/ButtonStart.jsx";
import Searchbar from "../components/Searchbar.jsx";
import { Link } from "react-router-dom";
import TileCards from "../components/TileCards.jsx";
import { backendUrl } from "../api/api";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const [yogaByLevel, setYogaByLevel] = useState("");
  const [meditationByLevel, setMeditationByLevel] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [dayTime, setDayTime] = useState("");
  const [randomYogaNumber, setRandomYogaNumber] = useState();
  const [randomMeditationNumber, setRandomMeditationNumber] = useState();


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
      const filteredYoga = yogaByLevel.filter((item) => item.title.toLowerCase().includes(inputSearch.toLowerCase()));
      setYogaByLevel(filteredYoga);
      const filteredMeditation = meditationByLevel.filter((item) => item.title.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setMeditationByLevel(filteredMeditation);
    }
  }, [inputSearch]);


  const date = new Date(Date.now());
  const time = Number(date.toLocaleTimeString({ hour: '2-digit' }).split(":")[0]);

  useEffect(() => {

    if (time <= 13) {
      setDayTime("Morning");
      setRandomYogaNumber(generateRandomNumber(yogaByLevel));
      setRandomMeditationNumber(generateRandomNumber(meditationByLevel));

    } else if (time <= 17) {
      setDayTime("Afternoon");
      setRandomYogaNumber(generateRandomNumber(yogaByLevel));
      setRandomMeditationNumber(generateRandomNumber(meditationByLevel));
    } else {
      setDayTime("Evening");
      setRandomYogaNumber(generateRandomNumber(yogaByLevel));
      setRandomMeditationNumber(generateRandomNumber(meditationByLevel));
    }

  }, [time, date]);


  const generateRandomNumber = (item) => {
    return Math.floor(Math.random() * item.length);
  };

  return (
    <main className="">
      <Header />
      <h2 className="text-2xl font-black w-4/5 mx-3.5 mb-3.5 mt-5 text-maintext ">
        Good {dayTime} {user.username}
      </h2>
      <p className=" text-subtext leading-5  pb-10 mx-3.5  font-semibold">
        We hope you have a good day.
      </p>
      <div className=" flex gap-3 place-content-around mb-5">
        <div className=" relative z-0">
          <img src="../../image/RecoveryBigMeditate.png" alt="yoga image" />
          <p className=" absolute text-white left-1 bottom-5 font-light">
            {yogaByLevel[randomYogaNumber]?.duration} MIN
          </p>
          <ButtonStart fill={"#FAF2DA"} typeColor={"#4A503D"} />
          <p className=" absolute text-[#FAF2DA] top-11 left-1 text-xl">
            {yogaByLevel[randomYogaNumber]?.title}
          </p>
          <p className=" uppercase absolute text-[#FAF2DA] top-16 left-1 text-xs">
            {yogaByLevel[randomYogaNumber]?.level}
          </p>
        </div>
        <div className=" relative z-0 ">
          <img src="../../image/RecoveryBigYoga.png" alt="meditation image" />
          <p className=" absolute text-white left-1 bottom-5 font-light">
            {meditationByLevel[randomMeditationNumber]?.duration} MIN
          </p>
          <ButtonStart fill={"#4A503D"} typeColor={"#FAF2DA"} />
          <p className=" absolute text-[#4A503D] top-11 left-1 text-xl">
            {meditationByLevel[randomMeditationNumber]?.title}
          </p>
          <p className=" uppercase absolute text-[#4A503D] top-16 left-1 text-xs">
            {meditationByLevel[randomMeditationNumber]?.level}
          </p>
        </div>
      </div>
      <Searchbar inputSearch={inputSearch} setInputSearch={setInputSearch} />

      <section className=" mb-10 mt-8">
        <h2 className=" text-2xl text-maintext font-bold tracking-wide pl-5 mb-6">
          Recommended Yoga for you
        </h2>
        <div className="flex items-center overflow-x-scroll ">
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
            <p>Loading...</p>
          )}
        </div>
      </section>

      <section className=" mb-16">
        <h2 className=" text-2xl text-maintext font-bold tracking-wide pl-5 mb-6">
          Recommended Meditation for you
        </h2>
        <div

          className="flex items-center overflow-x-scroll "
        >
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
            <p>Loading...</p>
          )}
        </div>
      </section>
    </main>
  );
};
export default Home;

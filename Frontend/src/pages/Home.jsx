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
useEffect(() => {
const fetchYogaByLevel = async () => {
const res = await fetch(
`${backendUrl}/api/v1/yoga/filterLevel/?levelSelection=${user.userLevel}`
);
// , {
// headers: { authorization: `Bearer ${token}` },
// }
const data = await res.json();
if (!data.result) return "Failed to fetch all Yoga by level";
setYogaByLevel(data.result);
};
fetchYogaByLevel();
}, []);
useEffect(() => {
const fetchMeditationByLevel = async () => {
const res = await fetch(
`${backendUrl}/api/v1/meditation/filterLevel/?levelSelection=${user.userLevel}`
);
// , {
// headers: { authorization: `Bearer ${token}` },
// }
const data = await res.json();
if (!data.result) return "Failed to fetch all Meditation by level";
setMeditationByLevel(data.result);
};
fetchMeditationByLevel();
}, []);
return (
<main className="">
<Header />
<h2 className="text-2xl font-black w-4/5 mx-3.5 mb-3.5 mt-5 text-maintext ">
Good Morning {user.firstname}
</h2>
<p className=" text-subtext leading-5 pb-10 mx-3.5 font-semibold">
We hope you have a good day.
</p>
<div className=" flex gap-3 place-content-around mb-5">
<div className=" relative z-0">
<img src="../../image/RecoveryBigMeditate.png" alt="yoga image" />
<p className=" absolute text-white left-1 bottom-5 font-light">
{yogaByLevel[0]?.duration} MIN
</p>
<ButtonStart fill={"#FAF2DA"} typeColor={"#4A503D"} />
<p className=" absolute text-[#FAF2DA] top-11 left-1 text-xl">
{yogaByLevel[0]?.title}
</p>
<p className=" uppercase absolute text-[#FAF2DA] top-16 left-1 text-xs">
{yogaByLevel[0]?.level}
</p>
</div>
<div className=" relative z-0 ">
<img src="../../image/RecoveryBigYoga.png" alt="meditation image" />
<p className=" absolute text-white left-1 bottom-5 font-light">
{meditationByLevel[0]?.duration} MIN
</p>
<ButtonStart fill={"#4A503D"} typeColor={"#FAF2DA"} />
<p className=" absolute text-[#4A503D] top-11 left-1 text-xl">
{meditationByLevel[0]?.title}
</p>
<p className=" uppercase absolute text-[#4A503D] top-16 left-1 text-xs">
{meditationByLevel[0]?.level}
</p>
</div>
</div>
<Searchbar />
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
<section>
<h2 className=" text-2xl text-maintext font-bold tracking-wide pl-5 mb-6">
Recommended Meditation for you
</h2>
{meditationByLevel ? (
meditationByLevel.map((item) => (
<div
key={item._id}
className="flex items-center overflow-x-scroll "
>
<Link to={`/meditation/${item._id}`}>
<TileCards
name={item.title}
level={item.level}
duration={item.duration}
imgURL={item.fileUrl}
/>
</Link>
</div>
))
) : (
<p>Loading...</p>
)}
</section>
</main>
);
};
export default Home;
import { useParams } from "react-router-dom";
import ButtonLike from "../components/ButtonLike";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import { TokenContext, UserContext } from "../../context/Context";
import ButtonDownload from "../components/ButtonDownload";
import GoBackButtonDetails from "../components/GoBackButtonDetails";
import Navbar from "../components/Navbar";

const YogaDetail = () => {
  const { yogaId } = useParams();
  const [oneYoga, setOneYoga] = useState({});
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);

  console.log(oneYoga.videoUrl);

  useEffect(() => {
    const fetchYoga = async () => {
      const res = await fetch(`${backendUrl}/api/v1/yoga/detail/${yogaId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log(data);
      if (!data.result) return "Failed to fetch one Yoga";
      setOneYoga(data?.result);
    };
    fetchYoga();
  }, []);
  return (
    <main className="h-screen">

      <video
        src={oneYoga.videoUrl}
        autoPlay
        muted
        loop
      />

      <GoBackButtonDetails />
      <ButtonLike id={yogaId} isDisabled={user.isGuest} />
      <ButtonDownload isDisabled={user.isGuest} />
      <div className=" -mt-16">
        <h4 className="font-black text-maintext text-4xl mx-3.5 leading-10  tracking-wide">
          {oneYoga.title}
        </h4>
        <p className="uppercase text-subtext leading-5 pb-10  mt-4 mx-3.5 font-semibold">
          {oneYoga.level}
        </p>
        <p className=" text-subtext leading-5    mx-3.5  font-semibold">
          {oneYoga.description}
        </p>
      </div>
      <Navbar />
    </main>
  );
};

export default YogaDetail;

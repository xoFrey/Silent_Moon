import { useParams } from "react-router-dom";
import ButtonLike from "../components/ButtonLike";
import { useEffect, useState } from "react";
import { backendUrl } from "../api/api";

const YogaDetail = () => {
  const { yogaId } = useParams();
  const [oneYoga, setOneYoga] = useState({});

  useEffect(() => {
    const fetchYoga = async () => {
      const res = await fetch(`${backendUrl}/api/v1/yoga/detail/${yogaId}`);
      const data = await res.json();
      if (!data.result) return "Failed to fetch one Yoga";
      setOneYoga(data?.result);
    };
    fetchYoga();
  }, []);
  return (
    <>
      <div className=" relative ">
        <video
          width="auto"
          className=" absolute -top-48 object-cover "
          height="600"
          autoPlay
          muted
          loop
        >
          <source src="../../public/clips/Yoga-Ex.mp4" type="video/mp4" />
        </video>
      </div>
      <h4 className="font-bold text-maintext text-3xl leading-10 text-center ">
        {oneYoga.title}
      </h4>
      <p>{oneYoga.level}</p>
      <p className=" mb-12">{oneYoga.description}</p>
    </>
  );
};

export default YogaDetail;

import { useParams } from "react-router-dom";
import ButtonLike from "../components/ButtonLike";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import { TokenContext } from "../../context/Context";
import ButtonDownload from "../components/ButtonDownload";

const YogaDetail = () => {
  const { yogaId } = useParams();
  const [oneYoga, setOneYoga] = useState({});
  const { token } = useContext(TokenContext);

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
    <>
      <div className=" relative z-0">
        <video
          width="auto"
          className=" absolute -top-64 object-cover "
          height="600"
          autoPlay
          muted
          loop
        >
          <source src="../../clips/Yoga-Ex.mp4" type="video/mp4" />
        </video>
      </div>
      <ButtonLike />
      <ButtonDownload />
      <div className="  absolute bottom-24">
        <h4 className="font-black text-maintext text-4xl mx-3.5 leading-10  tracking-wide">
          {oneYoga.title}
        </h4>
        <p className="uppercase text-subtext leading-5 pb-14  mt-4 mx-3.5 font-semibold">
          {oneYoga.level}
        </p>
        <p className=" text-subtext leading-5  pb-28  mx-3.5  font-semibold">
          {oneYoga.description}
        </p>
      </div>
    </>
  );
};

export default YogaDetail;

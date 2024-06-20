import { useParams } from "react-router-dom";
import ButtonLike from "../components/ButtonLike";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import { TokenContext } from "../../context/Context";
import ButtonDownload from "../components/ButtonDownload";

const MeditationDetail = () => {
  const { meditationId } = useParams();
  const [oneYoga, setOneYoga] = useState({});
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const fetchYoga = async () => {
      const res = await fetch(`${backendUrl}/api/v1/yoga/detail/${yogaId}`);
      // , {
      //   headers: { authorization: `Bearer ${token}` },
      // }
      const data = await res.json();
      if (!data.result) return "Failed to fetch one Yoga";
      setOneYoga(data?.result);
    };
    fetchYoga();
  }, []);
  return (
    <>
      <h1>Meditation Detail</h1>
    </>
  );
};

export default MeditationDetail;

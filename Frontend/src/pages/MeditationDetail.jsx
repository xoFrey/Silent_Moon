import { useParams } from "react-router-dom";
import ButtonLike from "../components/ButtonLike";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import { TokenContext } from "../../context/Context";
import ButtonDownload from "../components/ButtonDownload";

const MeditationDetail = () => {
  const { meditationId } = useParams();
  console.log(meditationId);
  const [oneMeditation, setOneMeditation] = useState({});
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const fetchMeditation = async () => {
      const res = await fetch(
        `${backendUrl}/api/v1/meditation/detail/${meditationId}`
        , {
          headers: { authorization: `Bearer ${token}` },
        });
      const data = await res.json();
      if (!data.result) return "Failed to fetch one Meditation";
      setOneMeditation(data.result);
    };
    fetchMeditation();
  }, []);
  return (
    <>
      <>
        <div className=" relative z-0">
          <img
            className=" absolute object-cover w-screen "
            src="../../image/medit.avif"
            alt="meditationpicture"
          />
        </div>
        <ButtonLike id={meditationId} />
        <ButtonDownload />
        <div className="  absolute top-80">
          <h4 className="font-black text-maintext text-4xl mx-3.5 leading-10  tracking-wide">
            {oneMeditation.title}
          </h4>
          <p className="uppercase text-subtext leading-5 pb-14  mt-4 mx-3.5 font-semibold">
            {oneMeditation.level}
          </p>
          <p className=" text-subtext leading-5  pb-28  mx-3.5  font-semibold">
            {oneMeditation.description}
          </p>
        </div>
      </>
    </>
  );
};

export default MeditationDetail;

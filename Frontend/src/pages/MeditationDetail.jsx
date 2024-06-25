import { useParams } from "react-router-dom";
import ButtonLike from "../components/ButtonLike";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import { TokenContext, UserContext } from "../../context/Context";
import ButtonDownload from "../components/ButtonDownload";
import GoBackButtonDetails from "../components/GoBackButtonDetails";
import { FaHeart } from "react-icons/fa";
import { IoHeadset } from "react-icons/io5";
import { convertMStoMinSek } from "../../helperfunctions/helpers";
import { Link } from "react-router-dom";

import { FaPlay } from "react-icons/fa";
import Navbar from "../components/Navbar";

const MeditationDetail = () => {
  const { meditationId } = useParams();
  const [oneMeditation, setOneMeditation] = useState({});
  const { token } = useContext(TokenContext);
  const [playlistInfo, setPlaylistInfo] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchMeditation = async () => {
      const res = await fetch(
        `${backendUrl}/api/v1/meditation/detail/${meditationId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (!data.result) return "Failed to fetch one Meditation";
      setOneMeditation(data.result);
    };
    fetchMeditation();
  }, []);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const res = await fetch(`${backendUrl}/api/v1/spotify/playlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: "37i9dQZF1DWZqd5JICZI0u" }),
      });
      const data = await res.json();
      console.log(data);
      setPlaylistInfo(data);
    };
    fetchPlaylist();
  }, []);

  return (
    <main>
      <div>
        <img
          className=" rounded-b-lg"

          src={oneMeditation.fileUrl}
          alt="meditationpicture"
        />
      </div>
      <GoBackButtonDetails />
      {user.isGuest ? null : <ButtonLike id={meditationId} />}
      {user.isGuest ? null : <ButtonDownload downloadLink={oneMeditation.fileUrl} />}
      <div className=" ">
        <h4 className="font-black text-maintext text-4xl mx-4 leading-10  tracking-wide">
          {oneMeditation.title}
        </h4>
        <p className="uppercase text-subtext leading-5 pb-6  mt-4 mx-4 font-semibold">
          {oneMeditation.level}
        </p>
        <p className=" text-subtext leading-5  mx-4  font-semibold">
          {oneMeditation.description}
        </p>
      </div>
      {/* Playlist down here */}
      <div>
        <div className="flex gap-9 ml-5 mb-6 mt-6">
          <div className="flex  gap-2">
            <FaHeart fill="#E28F83" />
            <p className="text-sm text-subtext">
              {playlistInfo?.followers.total} Favorites
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IoHeadset fill="#3F414E" />
            <p className="text-sm text-subtext">
              {playlistInfo?.followers.total + 304345} Listening
            </p>
          </div>
        </div>
        <p className="text-2xl text-maintext font-bold tracking-wide pl-5 mb-6 ">
          Playlist
        </p>
        <section className="flex flex-col gap-5 px-5 mb-24">
          {playlistInfo?.tracks.items.slice(0, 4).map((item) => (
            <Link to={`/musicdetails/${item.track.id}`} key={item.track.id}>
              <div className="flex items-center gap-2 border-b border-subtext/20 pb-4 cursor-pointer">
                <div className="w-10 h-10  border border-solid border-subtext rounded-full flex items-center justify-center">
                  <FaPlay
                    size={"15px"}
                    color="#A1A4B2"
                    stroke="#A1A4B2"
                    className=" ml-0.5"
                  />
                </div>
                <div>
                  <p className=" text-base font-semibold text-maintext ">
                    {item.track.name}
                  </p>
                  <p className=" text-xs text-subtext font-semibold">
                    {convertMStoMinSek(item.track.duration_ms)}{" "}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
      <Navbar />
    </main>
  );
};

export default MeditationDetail;

import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { backendUrl } from "../api/api";
import { FaHeart } from "react-icons/fa";
import { IoHeadset } from "react-icons/io5";
import { convertMStoMinSek } from "../../helperfunctions/helpers";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { PlaylistContext } from "../../context/Context";

const MusicPage = () => {
  const { playlist, setPlaylist } = useContext(PlaylistContext);




  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center gap-5 mt-10">
<<<<<<< HEAD
        <h1 className="text-4xl font-bold text-maintext w-3/4 text-center">{playlistInfo?.name}</h1>
=======
        <h1 className="text-4xl font-bold text-maintext w-3/4 text-center">{playlist?.name}</h1>
>>>>>>> 4affaf1ab30e7eb3174b2ff858a3a3f61c478702
        <p className="text-sm font-semibold text-subtext">PLAYLIST</p>
        <p className="text-sm font-semibold text-subtext tracking-wider mb-10 ">
          {playlist?.description}
        </p>
      </div>
      <div className="flex items-center justify-evenly mb-12">
        <div className="flex items-center gap-2">
          <FaHeart fill="#E28F83" />
          <p className="text-sm text-subtext">
            {playlist?.followers.total} Favorites
          </p>
        </div>
        <div className="flex items-center gap-2">
          <IoHeadset fill="#3F414E" />
          <p className="text-sm text-subtext">
            {playlist?.followers.total + 304345} Listening
          </p>
        </div>
      </div>
      <section className="flex flex-col gap-5 px-5">
        {playlist?.tracks.items.slice(0, 10).map((item, index) => (
          <Link to={`/musicdetails/${item.track.id}`} key={item.track.id}>
            <div className="flex items-center gap-2 border-b border-subtext/20 pb-4 cursor-pointer">
              <IoPlayCircleOutline
                size={"50px"}
                fill="#A1A4B2"
                stroke="#A1A4B2"
              />
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
    </>
  );
};

export default MusicPage;

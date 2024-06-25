import { useContext } from "react";
import Header from "../components/Header";
import { FaHeart } from "react-icons/fa";
import { IoHeadset } from "react-icons/io5";
import { convertMStoMinSek } from "../../helperfunctions/helpers";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { PlaylistContext, UserContext } from "../../context/Context";
import PinkButton from "../components/PinkButton";
import GuestMessage from "../components/GuestMessage";
import Navbar from "../components/Navbar";
import { FaPlay } from "react-icons/fa";

const MusicPage = () => {
  const { playlist, setPlaylist } = useContext(PlaylistContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  console.log(playlist);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center gap-5 mt-10">
        <h1 className="text-4xl font-bold text-maintext w-3/4 text-center">
          {playlist?.name}
        </h1>
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
      {user.isGuest ? (
        <GuestMessage />
      ) : (
        <section className="flex flex-col mb-20 gap-5 px-5 lg:mx-24 lg:border lg:border-subtext/50 lg:rounded-lg lg:border-solid lg:py-6">
          {playlist?.tracks.items.slice(0, 10).map((item) => (
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
      )}
      <Navbar />
    </>
  );
};

export default MusicPage;

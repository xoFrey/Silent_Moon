import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import {
  IoCloseOutline,
  IoPlaySkipForwardCircleOutline,
  IoPlaySkipBackCircleOutline,
  IoPause,
  IoPlay,
} from "react-icons/io5";
import { PlaylistContext } from "../../context/Context";

const MusikDetail = () => {
  const [trackInfo, setTrackInfo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const { playlist } = useContext(PlaylistContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const { trackId } = useParams();

  useEffect(() => {
    const fetchTrack = async (trackId) => {
      const res = await fetch(`${backendUrl}/api/v1/spotify/track/${trackId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setTrackInfo(data);
    };

    if (trackId) {
      fetchTrack(trackId);
    }
  }, [trackId]);

  useEffect(() => {
    if (trackInfo && audioRef.current) {
      audioRef.current.src = trackInfo.preview_url;
      audioRef.current.play();
    }
  }, [trackInfo]);

  useEffect(() => {
    setIsPrevDisabled(currentIndex === 0);
    setIsNextDisabled(currentIndex === playlist.tracks.items.length - 1);
  }, [currentIndex, playlist.tracks.items.length]);

  const fetchNextTrack = async () => {
    if (currentIndex < playlist.tracks.items.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const nextTrackId = playlist.tracks.items[nextIndex].track.id;

      const res = await fetch(
        `${backendUrl}/api/v1/spotify/track/${nextTrackId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setTrackInfo(data);
    }
  };

  const fetchPrevTrack = async () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      const prevTrackId = playlist.tracks.items[prevIndex].track.id;

      const res = await fetch(
        `${backendUrl}/api/v1/spotify/track/${prevTrackId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setTrackInfo(data);
    }
  };

  const togglePausePlay = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="bg-circle ">
      <button
        onClick={() => navigate(-1)}
        className="mt-8 mx-5 border rounded-full border-white bg-white p-2 inline-block"
      >
        <IoCloseOutline size={"30px"} />
      </button>

      <div className="h-screen flex flex-col items-center justify-center">
        <img src="" alt="" />
        <h1 className=" text-4xl text-maintext font-bold mb-2">
          {trackInfo?.name}
        </h1>
        <p className=" text-sm text-subtext uppercase tracking-wider mb-16">
          {trackInfo?.album?.artists[0].name}
        </p>
        <div className="flex items-center">
          <button
            id="prevTrack"
            onClick={() => {
              fetchPrevTrack();
              setIsPlaying(true);
            }}
            disabled={isPrevDisabled}
          >
            <IoPlaySkipBackCircleOutline
              size={"50px"}
              className={`cursor-pointer ${
                isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </button>
          {isPlaying ? (
            <div className="border-8 border-subtext rounded-full bg-green cursor-pointer p-3">
              <IoPause
                size={"60px"}
                fill="white"
                onClick={togglePausePlay}
                className="cursor-pointer"
              />
            </div>
          ) : (
            <div className="border-8 border-subtext rounded-full bg-green cursor-pointer p-3">
              <IoPlay
                size={"60px"}
                fill="white"
                onClick={togglePausePlay}
                className="pl-2"
              />
            </div>
          )}
          <button
            id="nextTrack"
            onClick={() => {
              fetchNextTrack();
              setIsPlaying(true);
            }}
            disabled={isNextDisabled}
          >
            <IoPlaySkipForwardCircleOutline
              size={"50px"}
              className={`cursor-pointer ${
                isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </button>
        </div>

        {trackInfo ? (
          <audio
            autoPlay
            ref={audioRef}
            id="player"
            volume="0.1"
            controls
            className="hidden"
          />
        ) : (
          <p>Loading</p>
        )}
      </div>
    </section>
  );
};

export default MusikDetail;

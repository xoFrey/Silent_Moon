import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import { IoCloseOutline, IoPlaySkipForwardCircleOutline, IoPlaySkipBackCircleOutline, IoPause, IoPlay } from "react-icons/io5";
import { PlaylistContext } from "../../context/Context";

const MusikDetail = () => {
    const [trackInfo, setTrackInfo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const { playlist } = useContext(PlaylistContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);
    const audioRef = useRef(null);

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

    const fetchNextTrack = async () => {
        const nextIndex = (currentIndex + 1) % playlist.tracks.items.length;
        setCurrentIndex(nextIndex);
        const nextTrackId = playlist.tracks.items[nextIndex].track.id;

        const res = await fetch(`${backendUrl}/api/v1/spotify/track/${nextTrackId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        setTrackInfo(data);
    };


    const fetchPrevTrack = async () => {
        const prevIndex = (currentIndex - 1) % playlist.tracks.items.length;
        setCurrentIndex(prevIndex);
        const prevTrackId = playlist.tracks.items[prevIndex].track.id;

        if (playlist?.tracks.items[0].track.id === prevTrackId) {
            console.log("no");
            const prevButton = document.getElementById("prevTrack");
            prevButton.disabled = true;

        }
        const res = await fetch(`${backendUrl}/api/v1/spotify/track/${prevTrackId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        setTrackInfo(data);

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
        <section className='bg-circle '>
            <Link to='/music'>
                <div className='mt-8 mx-5 border rounded-full border-white bg-white p-2 inline-block'>
                    <IoCloseOutline size={"30px"} />
                </div>
            </Link>
            <div className='h-screen flex flex-col items-center justify-center'>
                <h1 className=' text-4xl text-maintext font-bold mb-2'>
                    {trackInfo?.name}
                </h1>
                <p className=' text-sm text-subtext uppercase tracking-wider mb-16'>
                    {trackInfo?.album?.artists[0].name}
                </p>
                <div className="flex items-center">
                    <button id="prevTrack" onClick={() => { fetchPrevTrack(), setIsPlaying(true); }}>
                        <IoPlaySkipBackCircleOutline size={"50px"} className="cursor-pointer" />
                    </button>
                    {isPlaying ? (
                        <div className='border-8 border-subtext rounded-full bg-green cursor-pointer p-3'>
                            <IoPause
                                size={"60px"}
                                fill='white'
                                onClick={togglePausePlay}
                                className='cursor-pointer'
                            />
                        </div>
                    ) : (
                        <div className='border-8 border-subtext rounded-full bg-green cursor-pointer p-3'>
                            <IoPlay
                                size={"60px"}
                                fill='white'
                                onClick={togglePausePlay}
                                className="pl-2"
                            />
                        </div>
                    )}
                    <div onClick={() => { fetchNextTrack(), setIsPlaying(true); }}>
                        <IoPlaySkipForwardCircleOutline size={"50px"} className="cursor-pointer" />
                    </div>

                </div>

                {trackInfo ? (
                    <audio autoPlay ref={audioRef} id="player" volume="0.1" controls />
                ) : (
                    <p>Loading</p>
                )}
            </div>
        </section>
    );
};

export default MusikDetail;

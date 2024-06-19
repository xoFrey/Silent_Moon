import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import { IoCloseOutline } from "react-icons/io5";

import { IoPause } from "react-icons/io5";
import { IoPlay } from "react-icons/io5";

const MusikDetail = () => {
    const [trackInfo, setTrackInfo] = useState();
    const [isPlaying, setIsPlaying] = useState(true);

    const audioElement = document.getElementById("player");
    if (audioElement) {
        audioElement.volume = 0.1;
    }


    const togglePausePlay = () => {
        if (!isPlaying) {
            audioElement.play();
            setIsPlaying(true);
        } else {
            audioElement.pause();
            setIsPlaying(false);
        }

    };

    const { trackId } = useParams();

    useEffect(() => {
        const fetchTrack = async () => {
            const res = await fetch(`${backendUrl}/api/v1/spotify/track/${trackId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setTrackInfo(data);
        };
        fetchTrack();
    }, []);

    console.log(trackInfo);
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
                    {trackInfo?.album.artists[0].name}
                </p>
                {isPlaying ? (
                    <div className=' border-8 border-subtext rounded-full bg-green cursor-pointer p-3'>
                        <IoPause
                            size={"60px"}
                            fill='white'
                            onClick={togglePausePlay}
                            className='  cursor-pointer'
                        />
                    </div>
                ) : (
                    <div className=' border-8 border-subtext rounded-full bg-green cursor-pointer p-3'>
                        <IoPlay
                            size={"60px"}
                            fill='white'
                            onClick={togglePausePlay}
                            className="pl-2"

                        />
                    </div>
                )}
                {trackInfo ? (
                    <audio
                        id='player'
                        controls
                        className='hidden'
                        autoPlay='true'
                        loop={true}>
                        <source src={`${trackInfo?.preview_url}`} />
                    </audio>
                ) : (
                    <p>Loading</p>
                )}
            </div>
        </section>
    );
};

export default MusikDetail;

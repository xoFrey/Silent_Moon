import { useEffect, useState } from "react";
import Header from "../components/Header";
import { backendUrl } from "../api/api";
import { FaHeart } from "react-icons/fa";
import { IoHeadset } from "react-icons/io5";
import { convertMStoMinSek } from "../../helperfunctions/helpers";
import { IoPlayCircleOutline } from "react-icons/io5";






const MusicPage = () => {
    const [playlistInfo, setPlaylistInfo] = useState();

    useEffect(() => {
        const fetchPlaylist = async () => {

            const res = await fetch(`${backendUrl}/api/v1/spotify/playlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: "37i9dQZF1DWZqd5JICZI0u" })
            });
            const data = await res.json();
            console.log(data);
            setPlaylistInfo(data);
        };
        fetchPlaylist();
    }, []);


    return <>
        <Header />
        <div className="flex flex-col items-center justify-center gap-5 mt-20">
            <h1 className="text-4xl font-bold text-maintext">Good Vibes</h1>
            <p className="text-sm font-semibold text-subtext">PLAYLIST</p>
            <p className="text-sm font-semibold text-subtext tracking-wider ">{playlistInfo?.description}</p>
        </div>
        <div className="flex items-center justify-evenly">
            <div className="flex">
                <FaHeart fill="#E28F83" />
                <p>{playlistInfo?.followers.total} Favorites</p>
            </div>
            <div className="flex">
                <IoHeadset fill="#3F414E" />
                <p>{playlistInfo?.followers.total + 304345} Listening</p>
            </div>
        </div>
        <section className="flex flex-col gap-3">
            {playlistInfo?.tracks.items.slice(0, 10).map((item) => (
                <div key={item.track.id} className="flex items-center gap-2">
                    <IoPlayCircleOutline size={"50px"} fill="#A1A4B2" stroke="#A1A4B2" />
                    <div>
                        <p>{item.track.name}</p>
                        <p>{convertMStoMinSek(item.track.duration_ms)} </p>
                    </div>
                </div>

            ))}
        </section>

    </>;
};

export default MusicPage;;
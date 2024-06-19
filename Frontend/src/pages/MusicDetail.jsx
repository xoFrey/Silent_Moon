import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import { IoCloseOutline } from "react-icons/io5";


const MusikDetail = () => {
    const [trackInfo, setTrackInfo] = useState();


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
    return <>
        <div>
            <IoCloseOutline />
        </div>

        <h1>{trackInfo.name}</h1>
        <p>{trackInfo.album.artists[0].name}</p>
    </>;
};

export default MusikDetail;
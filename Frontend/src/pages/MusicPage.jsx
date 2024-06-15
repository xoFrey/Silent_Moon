import { useEffect, useState } from "react";

const MusicPage = () => {
    const CLIENT_ID = "5010d0060d3c4d078308a30bce08b127";
    const REDIRECT_URI = "http://localhost:5173/music";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    const [token, setToken] = useState("");
    const [playlistData, setPlaylistData] = useState([]);

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
            window.location.hash = "";
            window.localStorage.setItem("token", token);
        }

        setToken(token);

    }, []);


    useEffect(() => {
        const getPlaylist = async () => {
            const res = await fetch(`https://api.spotify.com/v1/playlists/37i9dQZF1DWZqd5JICZI0u`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const data = await res.json();
            setPlaylistData(data);
        };
        if (token) getPlaylist();

    }, []);

    console.log(playlistData);

    return <>
        <h1>Music Page</h1>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
        <section>
            <h2>Music Titles:</h2>
            { }
        </section>
    </>;
};

export default MusicPage;
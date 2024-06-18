const client_id = process.env.SPOTIFY_ID;
const client_secret = process.env.SPOTIFY_SECRET;
// const redirect_uri = "http://localhost:5173/music";
// const code = "code";

let authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(client_id + ":" + client_secret).toString("base64"),
  },
  body: new URLSearchParams({
    grant_type: "client_credentials",
  }),
};

const spotifyAuth = async (req, res) => {
  try {
    const response = await fetch(authOptions.url, {
      method: "POST",
      headers: {
        Authorization: authOptions.headers.Authorization,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: authOptions.body,
    });

    if (response.ok) {
      const token = await response.json();
      const access_token = token.access_token;

      res.send("Token generated");
    } else {
      res.status(response.status || 500).send("Error: " + response.statusText);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error: " + error.message);
  }
};

const getTrack = async (req, res) => {
  const { id } = req.body;

  try {
    const authResponse = await fetch(authOptions.url, {
      method: "POST",
      headers: {
        Authorization: authOptions.headers.Authorization,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: authOptions.body,
    });

    if (!authResponse.ok) return res.status(500).json({ error: "Auth failed" });

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${id}/tracks`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.ok) {
      const spotifyData = await response.json();

      res.json(spotifyData);
    } else {
      res.status(500).json({ error: "Cant fetch Spotify Data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPlaylist = async (req, res) => {
  const { id } = req.body;
  console.log("1");
  try {
    console.log("2");
    const authResponse = await fetch(authOptions.url, {
      method: "POST",
      headers: {
        Authorization: authOptions.headers.Authorization,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: authOptions.body,
    });

    if (!authResponse.ok) return res.status(500).json({ error: "Auth failed" });
    console.log("3");

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("4");

    // console.log(response.ok);

    if (response.ok) {
      const spotifyData = await response.json();
      res.json(spotifyData);
    } else {
      res.status(500).json({ error: "Cant fetch Spotify Data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const SpotifyController = {
  spotifyAuth,
  getTrack,
  getPlaylist,
};

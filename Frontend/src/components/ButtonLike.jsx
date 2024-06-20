import { useContext, useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { TokenContext, UserContext } from "../../context/Context";
import { backendUrl } from "../api/api";


const ButtonLike = ({ id }) => {
  const { user, setUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [isFavorite, setIsFavorite] = useState(false);
  console.log(id);
  const addFavorite = async () => {
    const res = await fetch(`${backendUrl}/api/v1/users/${id}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: user.id })

    });
    const data = await res.json();
    setUser(data.result);
    if (user.meditationFavorites.map((item) => item._id === id)) setIsFavorite(true);

  };


  const removeFavorite = async () => {
    const res = await fetch(`${backendUrl}/api/v1/users/${id}/unlike`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: user.id })

    });
    const data = await res.json();
    setUser(data.result);
    if (user.meditationFavorites.map((item) => item._id !== id)) setIsFavorite(false);

  };

  return (
    <>
      {isFavorite ?
        <button onClick={removeFavorite}>
          <IoMdHeart className=" z-10 absolute right-24 top-5 bg-pink/55 rounded-full p-3" size={"50px"} fill="#ffffff" />
        </button>
        :
        <button onClick={addFavorite}>
          <IoMdHeartEmpty className=" z-10 absolute right-24 top-5 bg-pink/55 rounded-full p-3" size={"50px"} fill="#ffffff" />
        </button>
      }

    </>


  );
};

export default ButtonLike;

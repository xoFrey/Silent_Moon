import { useContext, useEffect, useImperativeHandle, useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { TokenContext, UserContext } from "../../context/Context";
import { backendUrl } from "../api/api";

const ButtonLike = ({ id, isDisabled }) => {
  const { user, setUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [isFavorite, setIsFavorite] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {

    const isInFav = user.meditationFavorites.some((item) => item._id === id) || user.yogaFavorites.some((item) => item._id === id);

    setIsFavorite(isInFav);

  }, [refresh]);


  console.log(id);

  const addFavorite = async (id) => {
    const res = await fetch(`${backendUrl}/api/v1/users/${id}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id }),
    });
    const data = await res.json();
    setUser((user) => ({ ...user, ...data.result }));


    setIsFavorite(true);

  };

  const removeFavorite = async (id) => {
    const res = await fetch(`${backendUrl}/api/v1/users/${id}/unlike`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id }),
    });
    const data = await res.json();
    setUser((user) => ({ ...user, ...data.result }));
    console.log(data.result);
    setIsFavorite(false);
  };

  console.log(isDisabled);

  return (
    <>
      {isFavorite ? (
        <button disabled={isDisabled} onClick={() => { removeFavorite(id), setRefresh(!refresh); }}>
          <IoMdHeart
            className=' z-10 absolute right-24 top-5 bg-pink/55 rounded-full p-3'
            size={"50px"}
            fill='#ffffff'

          />
        </button>
      ) : (
        <button disabled={isDisabled} onClick={() => { addFavorite(id), setRefresh(!refresh); }}>
          <IoMdHeartEmpty
            className=' z-10 absolute right-24 top-5 bg-pink/55 rounded-full p-3'
            size={"50px"}
            fill='#ffffff'

          />
        </button>
      )}
    </>
  );
};

export default ButtonLike;

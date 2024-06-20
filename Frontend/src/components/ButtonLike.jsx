import { useContext, useEffect, useImperativeHandle, useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { TokenContext, UserContext } from "../../context/Context";
import { backendUrl } from "../api/api";

const ButtonLike = ({ id }) => {
  const { user, setUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [isFavorite, setIsFavorite] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {

    const isInFav = user.meditationFavorites.some((item) => item._id === id);
    setIsFavorite(isInFav);

  }, [refresh]);



  const addFavorite = async () => {
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

  // 66702bf22378fc8e5cefcb0d
  const removeFavorite = async () => {
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

  return (
    <>
      {isFavorite ? (
        <button onClick={() => { removeFavorite(), setRefresh(!refresh); }}>
          <IoMdHeart
            className=' z-10 absolute right-24 top-5 bg-pink/55 rounded-full p-3'
            size={"50px"}
            fill='#ffffff'
          />
        </button>
      ) : (
        <button onClick={() => { addFavorite(), setRefresh(!refresh); }}>
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

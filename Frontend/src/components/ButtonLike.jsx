import { useContext, useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { UserContext } from "../../context/Context";


const ButtonLike = ({ id, }) => {
  const { user } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <>
      {isFavorite ? <button>
        <IoMdHeart className=" z-10 absolute right-24 top-5 bg-pink/55 rounded-full p-3" size={"50px"} fill="#ffffff" />
      </button> : <button>
        <IoMdHeartEmpty className=" z-10 absolute right-24 top-5 bg-pink/55 rounded-full p-3" size={"50px"} fill="#ffffff" />
      </button>
      }


    </>


  );
};

export default ButtonLike;

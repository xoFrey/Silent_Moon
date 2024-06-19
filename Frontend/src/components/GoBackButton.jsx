import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex w-14 h-14 rounded-full border-solid border-circle justify-center items-center mt-7 ml-5"
      >
        <GoArrowLeft size={28} />
      </button>
    </>
  );
};

export default GoBackButton;

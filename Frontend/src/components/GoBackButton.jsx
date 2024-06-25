import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="fixed left-4 top-4 lg:left-44 "
      >
        <GoArrowLeft size={28} className="flex w-14 h-14 p-2 rounded-full border border-solid border-circle justify-center items-center " />
      </button>
    </>
  );
};

export default GoBackButton;

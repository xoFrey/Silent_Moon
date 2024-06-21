import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

const GoBackButtonDetails = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-1)}>
        <GoArrowLeft
          className=" z-10 absolute left-5 top-5 bg-circle/65 rounded-full p-3"
          size={"50px"}
        />
      </button>
    </>
  );
};

export default GoBackButtonDetails;

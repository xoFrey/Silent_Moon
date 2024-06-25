import { useNavigate } from "react-router-dom";

const GuestMessage = ({ text }) => {
  const navigate = useNavigate();
  return (
    <section className="ml-12 flex flex-col items-center justify-center gap-4 mt-12 mb-4 bg-subtext/25 w-3/4 rounded-2xl border border-solid border-pink py-2">
      <h2 className=" text-2xl px-8 text-center text-maintext">
        {text ? text : " Please register an account for more functions"}
      </h2>
      <button
        onClick={() => navigate("/register")}
        className="h-8  w-3/4 bg-pink text-circle rounded-full mb-2"
      >
        Go To Registration
      </button>
    </section>
  );
};

export default GuestMessage;

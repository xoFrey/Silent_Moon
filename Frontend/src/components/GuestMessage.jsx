import { useNavigate } from "react-router-dom";

const GuestMessage = () => {

    const navigate = useNavigate();
    return <>
        <section className="flex flex-col items-center justify-center gap-4 mt-12">
            <h2 className=" text-2xl px-8 text-center text-maintext">Please register an account to use this function</h2>
            <button
                onClick={() => navigate("/register")}
                className="h-8  w-3/4 bg-pink text-circle rounded-full"
            >
                Go To Registration
            </button>
        </section>
    </>;
};

export default GuestMessage;
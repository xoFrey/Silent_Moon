import { useContext } from "react";
import { UserContext } from "../../context/Context";

const VerficationPopUp = () => {
  return (
    <section className=" ">
      <div className=" h-full absolute bg-maintext/85 top-0 z-10 ">
        <div className="bg-white rounded-lg w-5/6 sticky top-20 left-8">
          <section className="flex flex-col">
            <div className=" bg-circle h-2 rounded-t-lg mb-4"></div>
            <div>
              <h1 className="font-black text-maintext text-2xl leading-10 text-center tracking-wide mb-2">
                Verifiy your email
              </h1>
              <p className="text-subtext text-lg  text-center font-semibold mx-4">
                Hi Yzel, Please type in the 6-Digit Code we've sent you to:{" "}
                <span className="font-bold text-maintext">
                  askjdfhaskdjf@gmail.com{" "}
                </span>
              </p>
            </div>
            <div className="flex flex-col items-center mt-4 mb-2">
              <input
                type="number"
                maxlength="6"
                min="6"
                max="6"
                className="h-10 w-10/12 border-solid border border-pink text-subtext rounded-lg text-center font-semibold leading-5 tracking-wider mb-2"
              />
              <button className="h-10 w-10/12 bg-pink text-circle rounded-lg">
                Verify
              </button>
            </div>
            <p className="text-subtext leading-5 text-xs text-center mb-6">
              Questions? Email us as soons as our Support goes Online 😉
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default VerficationPopUp;

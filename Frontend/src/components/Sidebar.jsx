import { useNavigate } from "react-router-dom";
import { backendUrl } from "../api/api";
import { useContext } from "react";
import { TokenContext } from "../../context/Context";

const Sidebar = ({
  setShowSidebar,
  showSidebar,
  showEditField,
  setShowEditField,
}) => {
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  const logoutUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`${backendUrl}/api/v1/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (!data.result) return alert("Could not log out");
    console.log(data.result);
    setToken("");
    navigate("/login");
  };
  return (
    <section
      className={`fixed w-52 bg-lightcreme rounded-r-lg border border-solid border-subtext transition-transform duration-1000 ease-in-out z-20 ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-2/4 flex flex-col items-start  ">
        <button
          onClick={() => {
            setShowSidebar(false), setShowEditField(true);
          }}
          className="hover:bg-pink hover:text-white uppercase w-full text-maintext leading-5 font-semibold p-5 border-b border-subtext rounded-tr-lg"
        >
          Edit Profile
        </button>
        <button
          onClick={() => {
            setShowSidebar(false), navigate("/notification");
          }}
          className="hover:bg-pink hover:text-white uppercase w-full text-maintext leading-5 font-semibold p-5 border-b border-subtext"
        >
          Change Reminder
        </button>
        <button
          onClick={() => {
            setShowSidebar(false), navigate("/information");
          }}
          className="hover:bg-pink hover:text-white uppercase w-full text-maintext leading-5 font-semibold p-5 border-b border-subtext"
        >
          Information
        </button>
        <button
          onClick={logoutUser}
          className="hover:bg-pink hover:text-white uppercase w-full text-maintext leading-5 font-semibold p-5 rounded-br-lg"
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default Sidebar;

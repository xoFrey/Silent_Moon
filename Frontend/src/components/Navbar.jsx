import { LuMoon } from "react-icons/lu";
import { CiHome } from "react-icons/ci";
import { CiMusicNote1 } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { PiMountainsLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <section>
      <nav className="text-subtext flex gap-7 fixed bottom-0 w-410 justify-center pb-4 pt-4 bg-white shadow-topshadow">
        <NavLink to="/yoga">
          <div className="flex flex-col justify-center items-center">
            <LuMoon />
            <p className="">Yoga</p>
          </div>
        </NavLink>
        <NavLink to="/meditation">
          <div className="flex flex-col justify-center items-center">
            <PiMountainsLight />
            <p>Meditate</p>
          </div>
        </NavLink>
        <NavLink to="/home">
          <div className="flex flex-col justify-center items-center">
            <CiHome />
            <p>Home</p>
          </div>
        </NavLink>
        <NavLink to="/music">
          <div className="flex flex-col justify-center items-center">
            <CiMusicNote1 />
            <p>Music</p>
          </div>
        </NavLink>
        <NavLink to="/profile">
          <div className="flex flex-col justify-center items-center">
            <IoPersonOutline />
            <p>Profile</p>
          </div>
        </NavLink>
      </nav>
    </section>
  );
};

export default Navbar;

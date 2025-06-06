import { IoMoonOutline } from "react-icons/io5";
import { CiHome } from "react-icons/ci";
import { CiMusicNote1 } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { PiMountainsLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <section>
      <nav className='text-subtext flex items-center gap-7 fixed bottom-0 w-full lg:gap-16 justify-center pb-4 pt-4 bg-white shadow-topshadow md:shadow-none'>
        <NavLink to='/yoga'>
          <div className='flex flex-col justify-center items-center'>
            <IoMoonOutline size={"30px"} />
            <p className=''>Yoga</p>
          </div>
        </NavLink>
        <NavLink to='/meditation'>
          <div className='flex flex-col justify-center items-center'>
            <PiMountainsLight size={"30px"} />
            <p>Meditate</p>
          </div>
        </NavLink>
        <NavLink to='/home'>
          <div className='flex flex-col justify-center items-center'>
            <CiHome size={"30px"} />
            <p>Home</p>
          </div>
        </NavLink>
        <NavLink to='/music'>
          <div className='flex flex-col justify-center items-center'>
            <CiMusicNote1 size={"30px"} />
            <p>Music</p>
          </div>
        </NavLink>
        <NavLink to='/profile'>
          <div className='flex flex-col justify-center items-center'>
            <IoPersonOutline size={"30px"} />
            <p>Profile</p>
          </div>
        </NavLink>
      </nav>
    </section>
  );
};

export default Navbar;

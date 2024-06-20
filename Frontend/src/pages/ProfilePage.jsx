import { useContext, useState } from "react";
import Header from "../components/Header";
import { UserContext } from "../../context/Context";
import Searchbar from "../components/Searchbar";
import TileCards from "../components/TileCards";
import { IoSettingsOutline } from "react-icons/io5";
import Sidebar from "../components/Sidebar";


const ProfilePage = () => {

    const { user } = useContext(UserContext);
    const [showSidebar, setShowSidebar] = useState(false);

    return <section className=" mb-24">
        <Header />
        {/* <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} /> */}
        <section className={`fixed bg-pink transition-transform duration-700 ease-in-out ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
            <h2>hallo</h2>
            <Sidebar />
        </section>
        <div className="flex items-center gap-8 mt-12 mb-8 px-5">
            < img className="rounded-full w-16 h-16 object-cover" src="/image/Fatburner.png" alt="Pic" />
            <div className="flex items-center justify-between w-full">
                <h1 className="text-maintext text-4xl font-bold ">{user?.username}</h1>
                <IoSettingsOutline size={"30px"} className="mr-5 cursor-pointer" onClick={() => setShowSidebar(!showSidebar)} />
            </div>
        </div >
        <Searchbar />
        <section className=" mb-10">
            <h2 className=" text-2xl text-maintext font-bold tracking-wide pl-5 mb-6">Favorite Yoga Sessions</h2>
            {user?.yogaFavorites.map((item) => (
                <div key={item._id} className="flex items-center overflow-x-scroll ">
                    <TileCards name={item.title} level={item.level} duration={item.duration} id={item._id} imgURL={item.fileUrl} />
                </div>
            ))}
        </section>

        <section>
            <h2 className=" text-2xl text-maintext font-bold tracking-wide pl-5 mb-6">Favorite Meditation Sessions</h2>
            {user?.meditationFavorites.map((item) => (
                <div key={item._id} className="flex items-center overflow-x-scroll ">
                    <TileCards name={item.title} level={item.level} duration={item.duration} id={item._id} imgURL={item.fileUrl} />
                </div>
            ))}
        </section>

    </section >;

};

export default ProfilePage;

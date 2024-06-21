import { useContext, useState } from "react";
import Header from "../components/Header";
import { UserContext } from "../../context/Context";
import Searchbar from "../components/Searchbar";
import TileCards from "../components/TileCards";
import { IoSettingsOutline } from "react-icons/io5";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import EditField from "../components/EditField";
import { backendUrl } from "../api/api";

const ProfilePage = () => {
    const { user } = useContext(UserContext);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showEditField, setShowEditField] = useState(false);
    console.log("profile", user);

    return (
        <section className=' mb-24'>
            <Header />
            <Sidebar
                setShowSidebar={setShowSidebar}
                showSidebar={showSidebar}
                showEditField={showEditField}
                setShowEditField={setShowEditField}
            />
            <EditField
                showEditField={showEditField}
                setShowEditField={setShowEditField}
            />
            <div className='flex items-center gap-8 mt-6 mb-8 px-5'>
                <img
                    className='rounded-full w-16 h-16 object-cover'
                    src={`${backendUrl}/${user?.fileUrl}`}
                    alt='Pic'
                />
                <div className='flex items-center justify-center gap-32'>
                    <h1 className='text-maintext text-4xl font-bold '>
                        {user?.username}
                    </h1>
                    <IoSettingsOutline
                        size={"30px"}
                        className='mr-5 cursor-pointer'
                        onClick={() => setShowSidebar(!showSidebar)}
                    />
                </div>
            </div>
            <Searchbar />
            <section className=' mb-10 mt-8'>
                <h2 className=' text-2xl text-maintext font-bold tracking-wide pl-5 mb-6'>
                    Favorite Yoga Sessions
                </h2>
                <div className='flex flex-row items-center overflow-x-scroll '>
                    {user?.yogaFavorites.map((item) => (
                        <div key={item._id}>
                            <Link to={`/yoga/${item._id}`}>
                                <TileCards
                                    name={item.title}
                                    level={item.level}
                                    duration={item.duration}
                                    imgURL={item.fileUrl}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className=' text-2xl text-maintext font-bold tracking-wide pl-5 mb-6'>
                    Favorite Meditation Sessions
                </h2>
                <div className='flex items-baseline overflow-x-scroll '>
                    {user?.meditationFavorites?.map((item) => (
                        <div key={item._id}  >
                            <Link
                                to={`/meditation/${item._id}`}>
                                <TileCards
                                    name={item.title}
                                    level={item.level}
                                    duration={item.duration}
                                    imgURL={item.fileUrl}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
};

export default ProfilePage;

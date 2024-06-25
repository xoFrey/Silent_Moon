import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { UserContext } from "../../context/Context";
import Searchbar from "../components/Searchbar";
import TileCards from "../components/TileCards";
import { IoSettingsOutline } from "react-icons/io5";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import EditField from "../components/EditField";
import GuestMessage from "../components/GuestMessage";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEditField, setShowEditField] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [filteredMeditation, setFilteredMeditation] = useState(
    user?.meditationFavorites
  );
  const [filteredYoga, setFilteredYoga] = useState(user?.yogaFavorites);

  useEffect(() => {
    if (inputSearch.length === 0) {
      setFilteredMeditation(user?.meditationFavorites);
      setFilteredYoga(user?.yogaFavorites);
    } else {
      const filteredMeditation = user?.meditationFavorites.filter((item) =>
        item.title.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setFilteredMeditation(filteredMeditation);
      const filteredYoga = user?.yogaFavorites.filter((item) =>
        item.title.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setFilteredYoga(filteredYoga);
    }
  }, [inputSearch]);

  return (
    <section className="mb-24">
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
      <section className="lg:w-3/4 lg:ml-56">
        <div className="flex justify-between ml-4 mt-6 mb-8">
          <div>
            <img
              className="rounded-full w-16 h-16 object-cover"
              src={`${user.fileUrl}`}
              alt="Pic"
            />
          </div>
          <div className="flex items-center justify-center">
            <h1 className="text-maintext text-4xl font-bold ">
              {user?.username}
            </h1>
          </div>
          <div className="flex items-center justify-center ">
            <IoSettingsOutline
              size={"30px"}
              className="mr-5 cursor-pointer"
              onClick={() =>
                user.isGuest ? null : setShowSidebar(!showSidebar)
              }
              disabled={user.isGuest}
            />
          </div>
        </div>

        <div className="flex items-center justify-center ">
          <IoSettingsOutline
            size={"30px"}
            className="mr-5 cursor-pointer"
            onClick={() => setShowSidebar(!showSidebar)}
         

        <div className="">
          <Searchbar
            inputSearch={inputSearch}
            setInputSearch={setInputSearch}

          />
        </div>
        {user.isGuest ? (
          <GuestMessage />
        ) : (
          <>
            <section className=" mb-10 mt-8">
              <h2 className=" text-2xl text-maintext font-bold tracking-wide pl-5 mb-6">
                Favorite Yoga Sessions
              </h2>
              <div className="flex flex-row items-center overflow-x-scroll no-scrollbar">
                {filteredYoga.map((item) => (
                  <Link key={item._id} to={`/yoga/${item._id}`}>
                    <TileCards
                      name={item.title}
                      level={item.level}
                      duration={item.duration}
                      imgURL={item.fileUrl}
                    />
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className=" text-2xl text-maintext font-bold tracking-wide pl-5 mb-6">
                Favorite Meditation Sessions
              </h2>
              <div className="flex items-baseline overflow-x-scroll no-scrollbar">
                {filteredMeditation.map((item) => (
                  <Link key={item._id} to={`/meditation/${item._id}`}>
                    <TileCards
                      name={item.title}
                      level={item.level}
                      duration={item.duration}
                      imgURL={item.fileUrl}
                    />
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </section>
      <Navbar />
    </section>
  );
};

export default ProfilePage;

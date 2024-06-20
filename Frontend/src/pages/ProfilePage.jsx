import { useContext } from "react";
import Header from "../components/Header";
import { UserContext } from "../../context/Context";
import Searchbar from "../components/Searchbar";
import TileCards from "../components/TileCards";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <>
      <Header />
      <div className="flex gap-4">
        <img src="" alt="Pic" />
        <h1>{user?.username}</h1>
      </div>
      <Searchbar />
      <section>
        <h2>Favorite Yoga Sessions</h2>
        {user?.yogaFavorites.map((item) => (
          <TileCards />
        ))}
      </section>
    </>
  );
};

export default ProfilePage;

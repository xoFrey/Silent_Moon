import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { TokenContext, UserContext } from "../../context/Context.jsx";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);

  // console.log("------user-----", user);
  // console.log("------token-----", token);
  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;

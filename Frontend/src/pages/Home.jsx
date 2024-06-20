import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { TokenContext, UserContext } from "../../context/Context.jsx";
import Header from "../components/Header.jsx";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  console.log(user);

  return (
    <>
      <Header />
      <h1>Home</h1>
    </>
  );
};

export default Home;

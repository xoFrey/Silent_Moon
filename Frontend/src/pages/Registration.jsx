import { useContext, useState } from "react";
import { TokenContext, UserContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../api/api";

const Registration = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");

  const { setUser } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/register`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        username: userName,
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        level,
      }),
    });

    const data = await res.json();

    if (!data.result)
      return setErrorMessage(
        data.message || "Failed to register, please try again"
      );

    navigate(`/get-started`);

    setToken(data.result.tokens.accessToken);
    setUser(data.result.user);
  };

  return (
    <>
      <h4 className="font-bold text-maintext text-3xl leading-10 text-center mt-36">
        Create your account
      </h4>
      <form className="flex flex-col items-center gap-7">
        <div>
          <div>
            <input
              className=" w-72 mb-5 bg-slate-600 text-slate-200 px-4 py-2 rounded-lg"
              id="username"
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <input
              className=" w-72 mb-5 bg-slate-600 text-slate-200 px-4 py-2 rounded-lg"
              id="firstname"
              type="text"
              placeholder="Fristname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              className=" w-72 mb-5 bg-slate-600 text-slate-200 px-4 py-2 rounded-lg"
              id="lastname"
              type="text"
              placeholder="Lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              className=" w-72 mb-5 bg-slate-600 text-slate-200 px-4 py-2 rounded-lg"
              id="level"
              type="text"
              placeholder="Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </div>

          <div>
            <input
              className=" w-72 mb-5 bg-slate-600 text-slate-200 px-4 py-2 rounded-lg"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className=" w-72 mb-5 bg-slate-600 text-slate-200 px-4 py-2 rounded-lg"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className=" border-slate-600 border px-4 py-2 rounded-lg duration-300 hover:scale-105 hover:bg-slate-600 hover:text-slate-200"
          onClick={registerUser}
        >
          Register
        </button>
        <p className=" text-center">{errorMessage}</p>
      </form>
    </>
  );
};

export default Registration;

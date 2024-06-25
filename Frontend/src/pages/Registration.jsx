import { useContext, useState } from "react";
import { TokenContext, UserContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../api/api";
import GoBackButton from "../components/GoBackButton";
import Header from "../components/Header";
import PinkButton from "../components/PinkButton";
import VerficationPopUp from "../components/VerificationPopUp";



const Registration = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [showVerification, setShowVerification] = useState(true);

  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);

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
        userLevel: level,
      }),
    });

    const data = await res.json();

    if (!data.result)
      return setErrorMessage(data.message || "Failed to register, please try again");

    setToken(data.result.tokens.accessToken);
    setUser(data.result.user);
    setErrorMessage("");
    setShowVerification(!showVerification);
  };

  console.log(showVerification);

  return (
    <main className=' '>
      <GoBackButton />
      <div className='flex justify-center'>
        <Header />
      </div>
      {showVerification ? <VerficationPopUp setShowVerification={setShowVerification} /> : null}

      <h4 className='font-black text-maintext text-4xl leading-10 text-center mt-12 mb-12 tracking-wide'>
        Create your account
      </h4>
      <form>
        <div>
          <div className='flex flex-col items-center'>
            <input
              className='mb-5 h-16 lg:w-1/2 w-10/12 border-solid border border-pink text-subtext rounded-full text-center text-base font-semibold leading-5 tracking-wider'
              id='username'
              type='text'
              placeholder='Username'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className='flex flex-col items-center'>
            <input
              className='mb-5 h-16 lg:w-1/2 w-10/12 border-solid border border-pink text-subtext rounded-full text-center text-base font-semibold leading-5 tracking-wider'
              id='firstname'
              type='text'
              placeholder='Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-center'>
            <input
              className='mb-5 h-16 lg:w-1/2 w-10/12 border-solid border border-pink text-subtext rounded-full text-center text-base font-semibold leading-5 tracking-wider'
              id='lastname'
              type='text'
              placeholder='Lastname'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <p className='text-center text-subtext text-base font-semibold leading-5 tracking-wider mb-2'>
            How would you rate your Meditation or Yoga Knowledge?
          </p>
          <div className='flex items-center flex-col mb-5'>
            <div className='grid lg:w-1/2 w-10/12 grid-cols-3 rounded-full border border-solid border-pink p-2'>
              <div>
                <input
                  type='radio'
                  name='level'
                  id='beginner'
                  value={level}
                  className='peer hidden'
                  onChange={() => setLevel("Beginner")}
                  defaultChecked
                />
                <label
                  htmlFor='beginner'
                  className='block select-none rounded-full p-2 text-center peer-checked:bg-pink peer-checked:font-bold peer-checked:text-circle cursor-pointer'>
                  Beginner
                </label>
              </div>

              <div>
                <input
                  type='radio'
                  name='level'
                  id='Intermediate'
                  value={level}
                  className='peer hidden'
                  onChange={() => setLevel("Intermediate")}
                />
                <label
                  htmlFor='Intermediate'
                  className='block select-none rounded-full p-2 text-center peer-checked:bg-pink peer-checked:font-bold peer-checked:text-circle cursor-pointer'>
                  Intermediate
                </label>
              </div>

              <div>
                <input
                  type='radio'
                  name='level'
                  id='Expert'
                  value={level}
                  className='peer hidden'
                  onChange={() => setLevel("Expert")}
                />
                <label
                  htmlFor='Expert'
                  className='block select-none rounded-full p-2 text-center peer-checked:bg-pink peer-checked:font-bold peer-checked:text-circle cursor-pointer'>
                  Expert
                </label>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center'>
            <input
              className='mb-5 h-16 lg:w-1/2 w-10/12 border-solid border border-pink text-subtext rounded-full text-center text-base font-semibold leading-5 tracking-wider'
              id='email'
              type='email'
              placeholder='E-Mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-center'>
            <input
              className='mb-5 h-16 lg:w-1/2 w-10/12 border-solid border border-pink text-subtext rounded-full text-center text-base font-semibold leading-5 tracking-wider'
              id='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <PinkButton
          name='REGISTER'
          funktion={registerUser}
        />
        <p className=' text-center'>{errorMessage}</p>
      </form>
      <p className='uppercase text-subtext leading-5 text-center pb-16 mt-3.5 mx-3.5 font-semibold'>
        already have an account?
        <a
          href='/login'
          className='pl-1 text-pink'>
          log in
        </a>
      </p>



    </main>
  );
};

export default Registration;

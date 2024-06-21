import { useContext, useState } from "react";
import ButtonPink from "./ButtonPink";
import { TokenContext, UserContext } from "../../context/Context";
import { backendUrl } from "../api/api";

const EditField = ({ setShowEditField, showEditField }) => {
  const { user, setUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [usernameInput, setUsernameInput] = useState(user?.username);
  const [upload, setUpload] = useState();
  const [level, setLevel] = useState(user?.userLevel);

  const editUser = async (e) => {
    e.preventDefault();
    let fileUrl;
    if (upload) {
      const formData = new FormData();
      formData.append("files", upload, upload.name);
      const result = await fetch(`${backendUrl}/api/v1/files/upload`, {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: formData,
      });

      const fileData = await result.json();
      console.log(fileData);
      fileUrl = fileData.fileUrl;
      setUser({ ...user, fileUrl: fileUrl });
    } else {
      fileUrl = user.fileUrl;
    }
    console.log(user);
    const updateInfo = {
      userId: user.id,
      username: usernameInput,
      fileUrl: fileUrl,
      userLevel: level,
    };
    const res = await fetch(`${backendUrl}/api/v1/users`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateInfo),
    });

    const data = await res.json();
    console.log(data);
    setUser(data.result);

    setShowEditField(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowEditField(false);
  };

  return (
    <section
      className={` h-3/5 w-11/12 bg-lightcreme border border-solid border-subtext rounded-lg fixed transition-transform duration-1000  ease-in-out top-30 z-10 ${
        showEditField ? " translate-x-0 ml-4" : " -translate-x-full "
      }`}
    >
      <form className="flex flex-col items-center gap-5">
        <h2 className="mt-2 text-maintext leading-5 font-semibold">
          Edit your Information:
        </h2>
        <input
          className="mb-5 h-12 w-11/12 border-solid border border-pink text-subtext rounded-full text-center text-base font-semibold leading-5 tracking-wider"
          id="username"
          type="text"
          placeholder="Username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />

        <input
          type="file"
          className="mb-6 text-subtext"
          onChange={(e) => setUpload(e.target.files[0])}
        />

        <div className="flex items-center flex-col mb-5">
          <div className="grid grid-cols-3 rounded-full border border-solid border-pink p-2">
            <div>
              <input
                type="radio"
                name="level"
                id="beginner"
                value={level}
                className="peer hidden"
                onChange={() => setLevel("Beginner")}
                defaultChecked={user.userLevel}
              />
              <label
                htmlFor="beginner"
                className="block select-none rounded-full p-2 text-center peer-checked:bg-pink peer-checked:text-circle"
              >
                Beginner
              </label>
            </div>

            <div>
              <input
                type="radio"
                name="level"
                id="Intermediate"
                value={level}
                className="peer hidden"
                onChange={() => setLevel("Intermediate")}
                defaultChecked={user.userLevel}
              />
              <label
                htmlFor="Intermediate"
                className="block select-none rounded-full p-2 text-center peer-checked:bg-pink  peer-checked:text-circle"
              >
                Intermediate
              </label>
            </div>

            <div>
              <input
                type="radio"
                name="level"
                id="Expert"
                value={level}
                className="peer hidden"
                onChange={() => setLevel("Expert")}
                defaultChecked={user.userLevel}
              />
              <label
                htmlFor="Expert"
                className="block select-none rounded-full p-2 text-center peer-checked:bg-pink peer-checked:text-circle"
              >
                Expert
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={editUser}
          className="h-10 w-3/4 bg-pink text-circle rounded-full "
        >
          Submit
        </button>
        <button
          onClick={(e) => handleSubmit(e)}
          className="h-10 w-3/4 bg-pink text-circle rounded-full "
        >
          Exit
        </button>
      </form>
    </section>
  );
};

export default EditField;

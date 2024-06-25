import { useContext, useState } from "react";
import Header from "../components/Header";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { convertDateAndTime } from "../../helperfunctions/helpers";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../api/api";
import { TokenContext, UserContext } from "../../context/Context";
import PinkButton from "../components/PinkButton";

const Notification = () => {
  const [timeValue, setTimeValue] = useState(dayjs(Date.now()));
  const [selectedDays, setSelectedDays] = useState([]);
  const { token } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const selectWeekdays = (day) => {
    setSelectedDays((selected) => {
      if (selected.includes(day)) {
        return selected.filter((item) => item !== day);
      } else {
        return [...selected, day];
      }
    });
  };

  const updateUserInfo = async () => {
    const newTime = convertDateAndTime(timeValue.$d);
    const updateInfo = {
      userId: user.id,
      alertTime: newTime,
      alertWeekdays: selectedDays,
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
    setUser(data.result);

    token ? navigate("/profile") : navigate("/login");
  };

  const weekdays = ["SU", "M", "T", "W", "TH", "F", "S"];
  return (
    <>
      <section className="px-5">
        <Header />
        <div className=" mb-8">
          <h2 className="text-2xl font-black w-4/5 mb-3.5 text-maintext ">
            What time would you like to meditate?
          </h2>
          <p className="text-base font-semibold text-subtext">
            Any time you can choose but We recommend first thing in the morning.
          </p>
        </div>
        <div className=" mb-10">
          <MultiSectionDigitalClock
            className="justify-center bg-lightcreme text-maintext "
            value={timeValue}
            onChange={(timeValue) => setTimeValue(timeValue)}
          />
        </div>
        <h2 className="text-2xl font-black w-4/5 mb-3.5 text-maintext">
          Which day would you like to meditate?
        </h2>
        <p className="text-base font-semibold text-subtext mb-8">
          Everyday is best, but we recommend picking at least five.
        </p>
        <div className="flex gap-2 justify-evenly items-center mb-6">
          {weekdays.map((day) => (
            <button
              onClick={() => selectWeekdays(day)}
              className={`${selectedDays.includes(day)
                  ? `bg-green border-green text-white`
                  : `bg-white border-circle`
                } border-2 border-solid rounded-full w-10 h-10`}
            >
              {day}
            </button>
          ))}
        </div>
      </section>
      <div className="mb-24">
        <PinkButton name={"SAVE"} funktion={updateUserInfo} />
        <Link to="/profile" className="text-center">
          <p className="mt-5 text-pink font-semibold">NO THANKS</p>
        </Link>
      </div>
    </>
  );
};

export default Notification;

import { useState } from "react";
import { TimePicker } from "react-ios-time-picker";
import Header from "../components/Header";

const Notification = () => {
    const [timeValue, setTimeValue] = useState("10:00");

    return <>
        <section className="px-4">
            <Header />
            <div >
                <h2 className="text-2xl font-black w-4/5 mb-3.5 text-maintext">What time would you like to meditate?</h2>
                <p className="text-base font-semibold text-subtext">Any time you can choose but We recommend first thing in the morning.</p>
            </div>
            <div className="flex justify-center align-center mt-32 ">
                <TimePicker onChange={(timeValue) => setTimeValue(timeValue)} value={timeValue} />
            </div>
        </section>

    </>;
};

export default Notification;
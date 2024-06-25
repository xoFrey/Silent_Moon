import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TileCards = ({ name, imgURL, level, duration, id }) => {
  const [categoryData, setCategoryData] = useState();
  return (
    <section>
      <div className="w-40 flex flex-col gap-1">
        <img
          src={imgURL || "/image/Fatburner.png"}
          id="imageCategory"
          className="h-28 w-40 rounded-xl overflow-hidden object-cover"
        />
        <label htmlFor="imageCategory" className="">
          <h3 className="leading-5 font-black text-lg text-maintext  cursor-pointer">
            {name}
          </h3>
        </label>
        <div className="flex justify-between text-subtext font-semibold text-xs leading-3">
          <p>{level}</p>
          <p>{duration}</p>
        </div>
      </div>
    </section>
  );
};

export default TileCards;

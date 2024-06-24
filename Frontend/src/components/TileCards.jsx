import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TileCards = ({ name, imgURL, level, duration, id }) => {
  const [categoryData, setCategoryData] = useState();
  return (
    <section className="flex flex-row gap-5 pl-5 mb-1 ">
      <div className="w-40">
        <img
          src={imgURL || "/image/Fatburner.png"}
          id="imageCategory"
          className="h-28 w-40"
        />
        <label htmlFor="imageCategory">
          <h3 className="leading-5 font-black text-lg text-maintext mt-2 mb-1">
            {name}
          </h3>
        </label>
        <div className="flex place-content-between text-subtext font-semibold text-xs leading-3">
          <p>{level}</p>
          <p>{duration}</p>
        </div>
      </div>
    </section>
  );
};

export default TileCards;

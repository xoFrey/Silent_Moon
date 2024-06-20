import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TileCards = ({ name, imgURL, level, duration, id }) => {
  const [categoryData, setCategoryData] = useState();
  return (
    <section className="flex flex-row gap-5 pl-5 mb-1 ">

      <div>
        <img src={imgURL || "/image/Fatburner.png"} id="imageCategory" />
        <label htmlFor="imageCategory">
          <h3 className="leading-5 font-black text-lg text-maintext mt-2 mb-1">
            {name}
          </h3>
        </label>
        <div className="flex gap-16 text-subtext font-semibold text-xs leading-3">
          <p>{level}</p>
          <p>{duration}</p>
        </div>
      </div>

    </section>
  );
};

export default TileCards;

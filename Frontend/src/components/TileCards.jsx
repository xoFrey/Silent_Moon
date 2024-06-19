import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TileCards = () => {
  const [categoryData, setCategoryData] = useState();

  //   useEffect(() => {
  //     fetch(`${fetchurl}`)
  //       .then((res) => res.json())
  //       .then((data) => setCategoryData(data))
  //       .catch((err) => console.log("Fetch von Kategorie Daten ", err));
  //   }, []);

  return (
    <section className="flex flex-row gap-5 ml-5">
      <Link to={"/"}>
        <div>
          <img src="/image/Fatburner.png" id="imageCategory" />
          <label for="imageCategory">
            <h3 className="leading-5 font-black text-lg text-maintext mt-2 mb-1">
              Fatburner
            </h3>
          </label>
          <div className="flex gap-16 text-subtext font-semibold text-xs leading-3">
            <p>Beginner</p>
            <p>3-10 Min</p>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default TileCards;

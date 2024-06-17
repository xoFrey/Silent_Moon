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
    <section>
      <Link to={``}>
        <div>
          <img src={categoryData?.image} id="imageCategory" />
          <label for="imageCategory">{categoryData?.name}</label>
        </div>
      </Link>
    </section>
  );
};

export default TileCards;

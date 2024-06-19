import { Link } from "react-router-dom";

const CatergoryTiles = () => {
  return (
    <section className="columns-2 ml-2">
      <Link to={"/"}>
        <div className="relative break-inside-avoid mb-5">
          <img src="../../public/image/7DaysOfCalmYoga.png" />
          <p className="leading-5 font-bold text-base text-lightcreme absolute bottom-3 left-2">
            7 Days Of Calm
          </p>
        </div>
      </Link>

      <Link to={"/"}>
        <div className="relative break-inside-avoid mb-5">
          <img src="../../public/image/AnxietyReleaseYoga.png" />
          <p className="leading-5 font-bold text-base text-lightcreme absolute bottom-3 left-2">
            Anxiety Release
          </p>
        </div>
      </Link>

      <Link to={"/"}>
        <div className="relative break-inside-avoid mb-5">
          <img src="../../public/image/StressReleaseYoga.png" />
          <p className="leading-5 font-bold text-base text-lightcreme absolute bottom-3 left-2">
            Stress Release
          </p>
        </div>
      </Link>

      <Link to={"/"}>
        <div className="relative break-inside-avoid mb-5">
          <img src="../../public/image/RecoveryBigYoga.png" />
          <p className="leading-5 font-bold text-base text-lightcreme absolute bottom-3 left-2">
            Recovery
          </p>
        </div>
      </Link>
    </section>
  );
};

export default CatergoryTiles;

import { Link } from "react-router-dom";

const CatergoryTiles = ({ id, title, imgUrl }) => {
  return (
    <section className="columns-2 ml-2">
      <Link to={`${id}`}>
        <div className="relative break-inside-avoid mb-5">
          <img src={"../../public/image/7DaysOfCalmYoga.png" || imgUrl} />
          <p className="leading-5 font-bold text-base text-lightcreme absolute bottom-3 left-2">
            {title}
          </p>
        </div>
      </Link>




      {/* <Link to={`${id}`}>
        <div className="relative break-inside-avoid mb-5">
          <img src={"../../public/image/7DaysOfCalmYoga.png" || imgUrl} />
          <p className="leading-5 font-bold text-base text-lightcreme absolute bottom-3 left-2">
            {title}
          </p>
        </div>
      </Link>


      <Link to={`${id}`}>
        <div className="relative break-inside-avoid mb-5">
          <img src={"../../public/image/7DaysOfCalmYoga.png" || imgUrl} />
          <p className="leading-5 font-bold text-base text-lightcreme absolute bottom-3 left-2">
            {title}
          </p>
        </div>
      </Link>


      <Link to={`${id}`}>
        <div className="relative break-inside-avoid mb-5">
          <img src={"../../public/image/7DaysOfCalmYoga.png" || imgUrl} />
          <p className="leading-5 font-bold text-base text-lightcreme absolute bottom-3 left-2">
            {title}
          </p>
        </div>
      </Link> */}

    </section>
  );
};

export default CatergoryTiles;

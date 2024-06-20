import { useState } from "react";

const Categorys = () => {
  const [category, setCategory] = useState("all");

  return (
    <section className="flex justify-center mb-80">
      <div className="flex place-content-between w-11/12">
        <div>
          <input
            type="radio"
            name="option"
            id="all"
            value={category}
            className="peer hidden"
            onChange={() => setCategory("all")}
            defaultChecked
          />
          <label
            htmlFor="all"
            className="block select-none rounded-2xl bg-subtext w-16 h-16 peer-checked:bg-green peer-checked:text-circle content-center p-5"
          >
            <img src="/image/AllIcon.png" />
          </label>
          <label htmlFor="all" className="text-subtext peer-checked:text-green">
            All
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="option"
            id="favorites"
            value={category}
            className="peer hidden"
            onChange={() => setCategory("fevorites")}
          />
          <label
            htmlFor="favorites"
            className="block select-none rounded-2xl bg-subtext w-16 h-16 peer-checked:bg-green peer-checked:text-circle content-center p-5"
          >
            <img src="/image/FavoriteIcon.png" />
          </label>
          <label
            htmlFor="favorites"
            className="text-subtext peer-checked:text-green"
          >
            Favorites
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="option"
            id="anxious"
            value={category}
            className="peer hidden"
            onChange={() => setCategory("anxious")}
          />
          <label
            htmlFor="anxious"
            className="block select-none rounded-2xl bg-subtext w-16 h-16 peer-checked:bg-green peer-checked:text-circle content-center p-5"
          >
            <img src="/image/AnxiousIcon.png" />
          </label>
          <label
            htmlFor="anxious"
            className="text-subtext peer-checked:text-green"
          >
            Anxious
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="option"
            id="sleep"
            value={category}
            className="peer hidden"
            onChange={() => setCategory("sleep")}
          />
          <label
            htmlFor="sleep"
            className="block select-none rounded-2xl bg-subtext w-16 h-16 peer-checked:bg-green peer-checked:text-circle content-center p-5"
          >
            <img src="/image/SleepIcon.png" />
          </label>
          <label
            htmlFor="sleep"
            className="text-subtext peer-checked:text-green"
          >
            Sleep
          </label>
        </div>

        <div className="">
          <input
            type="radio"
            name="option"
            id="kids"
            value={category}
            className="peer hidden"
            onChange={() => setCategory("kids")}
          />
          <label
            htmlFor="kids"
            className="block select-none rounded-2xl bg-subtext peer-checked:bg-green peer-checked:text-circle w-16 h-16 content-center p-5"
          >
            <img src="/image/EkligIcon.png" />
          </label>
          <label
            htmlFor="kids"
            className="text-subtext peer-checked:text-green"
          >
            Kids
          </label>
        </div>
      </div>
    </section>
  );
};

export default Categorys;

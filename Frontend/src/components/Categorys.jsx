import { useState } from "react";

const Categorys = () => {
  const [category, setCategory] = useState("all");

  return (
    <section className="flex justify-center">
      <div className="flex gap-4 w-11/12 overflow-auto">
        <div className="flex flex-col items-center">
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
            className="block select-none rounded-3xl bg-subtext w-16 h-16 peer-checked:bg-green peer-checked:text-circle content-center p-5"
          >
            <img src="/image/AllIcon.png" />
          </label>
          <label
            htmlFor="all"
            className="text-subtext peer-checked:text-green font-semibold leading-5 text-base tracking-wider mt-1"
          >
            All
          </label>
        </div>

        <div className="flex flex-col items-center">
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
            className="block select-none rounded-3xl bg-subtext w-16 h-16 peer-checked:bg-green peer-checked:text-circle content-center p-5"
          >
            <img src="/image/FavoriteIcon.png" />
          </label>
          <label
            htmlFor="favorites"
            className="text-subtext peer-checked:text-green font-semibold leading-5 text-base tracking-wider mt-1"
          >
            Favorites
          </label>
        </div>

        <div className="flex flex-col items-center">
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
            className="block select-none rounded-3xl bg-subtext w-16 h-16 peer-checked:bg-green peer-checked:text-circle content-center p-5"
          >
            <img src="/image/AnxiousIcon.png" />
          </label>
          <label
            htmlFor="anxious"
            className="text-subtext peer-checked:text-green font-semibold leading-5 text-base tracking-wider mt-1"
          >
            Anxious
          </label>
        </div>

        <div className="flex flex-col items-center">
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
            className="block select-none rounded-3xl bg-subtext w-16 h-16 peer-checked:bg-green peer-checked:text-circle content-center p-5"
          >
            <img src="/image/SleepIcon.png" />
          </label>
          <label
            htmlFor="sleep"
            className="text-subtext peer-checked:text-green font-semibold leading-5 text-base tracking-wider mt-1"
          >
            Sleep
          </label>
        </div>

        <div className="flex flex-col items-center">
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
            className="block select-none rounded-3xl bg-subtext peer-checked:bg-green peer-checked:text-circle w-16 h-16 content-center p-5"
          >
            <img src="/image/EkligIcon.png" />
          </label>
          <label
            htmlFor="kids"
            className="text-subtext peer-checked:text-green font-semibold leading-5 text-base tracking-wider mt-1"
          >
            Kids
          </label>
        </div>
      </div>
    </section>
  );
};

export default Categorys;

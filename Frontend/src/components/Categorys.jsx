import { useState } from "react";

const Categorys = ({ category, setCategory }) => {
  console.log(category);
  return (
    <section className="flex justify-center">
      <div className="flex gap-4 w-11/12 overflow-auto pb-1">
        <div className="flex flex-col items-center">
          <input
            type="radio"
            name="option"
            id="all"
            value={category}
            className="peer hidden"
            onChange={() => setCategory("All")}
            defaultChecked
          />
          <label
            htmlFor="all"
            className="block select-none rounded-3xl bg-subtext w-16 h-16 peer-checked:bg-green peer-checked:text-circle content-center p-5 cursor-pointer"
          >
            <img src="/image/AllIcon.png" />
          </label>
          <label
            htmlFor="all"
            className="text-subtext peer-checked:text-green font-semibold leading-5 text-base tracking-wider mt-1 cursor-pointer"
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
            onChange={() => setCategory("Favorites")}
          />
          <label
            htmlFor="favorites"
            className="block select-none rounded-3xl bg-subtext w-16 h-16 peer-checked:bg-green peer-checked:text-circle content-center p-5 cursor-pointer"
          >
            <img src="/image/FavoriteIcon.png" />
          </label>
          <label
            htmlFor="favorites"
            className="text-subtext peer-checked:text-green font-semibold leading-5 text-base tracking-wider mt-1 cursor-pointer"
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
            onChange={() => setCategory("Anxious")}
          />
          <label
            htmlFor="anxious"
            className="block select-none rounded-3xl bg-subtext w-16 h-16 peer-checked:bg-green peer-checked:text-circle content-center p-5 cursor-pointer"
          >
            <img src="/image/AnxiousIcon.png" />
          </label>
          <label
            htmlFor="anxious"
            className="text-subtext peer-checked:text-green font-semibold leading-5 text-base tracking-wider mt-1 cursor-pointer"
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
            onChange={() => setCategory("Sleep")}
          />
          <label
            htmlFor="sleep"
            className="block select-none rounded-3xl bg-subtext w-16 h-16 peer-checked:bg-green peer-checked:text-circle content-center p-5 cursor-pointer"
          >
            <img src="/image/SleepIcon.png" />
          </label>
          <label
            htmlFor="sleep"
            className="text-subtext peer-checked:text-green font-semibold leading-5 text-base tracking-wider mt-1 cursor-pointer"
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
            onChange={() => setCategory("Kids")}
          />
          <label
            htmlFor="kids"
            className="block select-none rounded-3xl bg-subtext peer-checked:bg-green peer-checked:text-circle w-16 h-16 content-center p-5 cursor-pointer"
          >
            <img src="/image/EkligIcon.png" />
          </label>
          <label
            htmlFor="kids"
            className="text-subtext peer-checked:text-green font-semibold leading-5 text-base tracking-wider mt-1 cursor-pointer"
          >
            Kids
          </label>
        </div>
      </div>
    </section>
  );
};

export default Categorys;

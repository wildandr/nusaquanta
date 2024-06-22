import React from "react";

const FilterComponent = ({ title, options }) => {
  return (
    <div className="filter flex my-5">
      <div className="w-[12%]">
        <p className="text-white text-[16px] mt-2">{title}</p>
      </div>
      <div className="flex gap-5  flex-wrap max-w-[60rem]">
        {options.map((option, index) => (
          <button
            key={index}
            className="text-white text-[16px] border border-white focus:bg-secondary focus:border-secondary duration-200  rounded-[12px] px-4 py-2 mt-2"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;

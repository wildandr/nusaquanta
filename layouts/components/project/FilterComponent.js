import React from "react";

const FilterComponent = ({
  title,
  options,
  selectedOptions,
  onOptionToggle,
}) => {
  return (

     
      <div className="flex gap-5  lg:w-3/4 w-[260%] md:w-auto lg:overflow-auto flex-wrap lg:max-w-[60rem]">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onOptionToggle(option)}
            className={`text-white text-[16px]  border duration-200 transition-all rounded-[12px] px-4 py-2 mt-2 ${
              selectedOptions.includes(option)
                ? "bg-secondary border-secondary"
                : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>

  );
};

export default FilterComponent;

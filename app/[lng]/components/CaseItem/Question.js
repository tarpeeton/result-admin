"use client";
import { useState } from "react";

const Question = ({ queryData, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle function for expanding or collapsing the description
  const toggleShowMore = () => {
    setIsExpanded((prev) => !prev);
  };

  // Check if the description should be truncated
  const shouldTruncate = description && description.length > 150;

  return (
    <div className="rounded-[30px] bg-white100 mt-[20px] flex flex-col py-[30px] px-[24px] mdl:rounded-[40px] 3xl:rounded-[50px] mdl:py-[50px] mdl:px-[40px] 3xl:py-[80px] 3xl:px-[70px] 3xl:flex 3xl:flex-row">
      <div className="3xl:w-[40%]">
        <p className="text-titleDark text-[28px] mdl:text-[40px] 3xl:text-[50px] font-bold">
          Запросы
        </p>
      </div>

      <div className="3xl:w-[60%]">
        {/* List of titles */}
        <ul className="flex flex-col mt-[20px] ml-[24px] 3xl:w-[60%]">
          {queryData.map((item, index) => (
            <li
              key={index}
              className="text-[15px] list-disc font-medium text-titleDark mdl:text-[20px] 3xl:text-[25px] font-robotoFlex"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Description handling */}
        <div className="mt-4 ml-[24px]">
          {shouldTruncate ? (
            <>
              <p className="text-[#454545] text-[15px] mdl:text-[18px] 3xl:text-[20px]">
                {isExpanded ? description : description.substring(0, 150) + "..."}
                <button
                  className="ml-2 text-blue-500 underline cursor-pointer"
                  onClick={toggleShowMore}
                >
                  {isExpanded ? "Свернуть" : "Показать больше"}
                </button>
              </p>
            </>
          ) : (
            <p className="text-[#454545] text-[15px] mdl:text-[18px] 3xl:text-[20px]">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;

'use client';
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const FAQ_DATA = [
  {
    question: 'Для чего нужен сайт?',
    answer: 'Сайт помогает вашему бизнесу быть доступным онлайн, привлекать клиентов и предоставлять информацию о ваших услугах и продуктах.',
  },
  {
    question: 'Что даст SMM?',
    answer: 'Ответ на вопрос о SMM...',
  },
  {
    question: 'Как вы работаете?',
    answer: 'Ответ о процессе работы...',
  },
  // Add more items as needed
];

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef([]); // Store refs to the content divs

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    contentRefs.current.forEach((content, index) => {
      if (content) {
        if (activeIndex === index) {
          gsap.fromTo(
            content,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
          );
        } else {
          gsap.to(content, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
        }
      }
    });
  }, [activeIndex]);

  return (
    <div className="w-full max-w-full mx-auto  p-4 mdl:p-[20px] 3xl:p-[30px] ">
      <h2 className="text-[28px] font-bold mb-[30px] mdl:text-[50px]">Часто задаваемые вопросы</h2>
      {FAQ_DATA.map((item, index) => (
        <div
          key={index}
          className={`mb-2 2xl:mb-[20px] border-[2px] rounded-[20px] 2xl:rounded-[30px] overflow-hidden transition-all duration-300 ${
            activeIndex === index ? 'border-[#7B72EB]' : 'border-gray-300'
          }`}
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="flex justify-between items-center w-full p-[20px] bg-white text-left focus:outline-none 2xl:p-[40px]"
          >
            <span className="text-[15px] font-semibold mdl:text-[25px] ">{item.question}</span>
            <svg
              className={`w-6 h-6 mdl:w-[30px] mdl:h-[30px] 3xl:w-[] 3xl:h-[] transition-transform transform text-[#7B72EB] ${
                activeIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          {/* Content Section */}
          <div
            ref={(el) => (contentRefs.current[index] = el)}
            className="p-0 overflow-hidden"
            style={{ height: activeIndex === index ? 'auto' : 0, opacity: activeIndex === index ? 1 : 0 }}
          >
            <div className="p-[20px] mt-[-20px] bg-white mdl:p-[20px] mdl:mt-[-20px] 2xl:p-[40px] 2xl:mt-[-50px] 3xl:p-[40px] 3xl:mt-[-40px]">
              <p className="text-[15px] text-[#454545] font-medium mdl:text-[20px] font-robotoFlex ">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;

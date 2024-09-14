"use client";
import  React , { useState, useEffect, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from 'next/image';
import { gsap } from "gsap";
import Link from 'next/link';

import interlab from '@/public/images/cases/interlab.jpg';
import mrj from '@/public/images/cases/mrj.jpg';
import inst from '@/public/images/cases/inst.jpg';
import dr from '@/public/images/cases/dr.jpg';
import inter from '@/public/images/cases/inter.png';

import caseDesckription from '@/public/images/Vector.png';
 

// Items for filtering
const items = [
  { id: 1, name: "Все", type: "all" },
  { id: 2, name: "Сайты", type: "Web Development" },
  { id: 3, name: "Telegram-боты", type: "Telegram Bots" },
  { id: 4, name: "SMM", type: "SMM" },
  { id: 5, name: "Реклама", type: "Advertising" },
  { id: 6, name: "SEO", type: "SEO" },
  { id: 7, name: "Брендинг", type: "Branding" },
];

// Example data with different service types and statistics
const data = [
  {
    id: 1,
    banner: {
      title: "Intermed Innovation",
      shortDescription: "Сайт SEO",
      photo: inter,
    },
    statistics: [
      { value: "+30%", label: "конверсия" },
      { value: "+75%", label: "посещаемость" },
      { value: "+50%", label: "приток клиентов" },
    ],
    serviceType: { name: "Web Development" },
  },
  {
    id: 2,
    banner: {
      title: "Interlab",
      shortDescription: "Сайт SEO",
      photo: interlab,
    },
    statistics: [
      { value: "+45%", label: "узнаваемость бренда" },
      { value: "+70%", label: "лояльность клиентов" },
    ],
    serviceType: { name: "Web Development" , name: 'SEO' },
  },
  {
    id: 3,
    banner: {
      title: "MRJ Trade",
      shortDescription: "Сайт SEO",
      photo: mrj,
    },
    statistics: [
      { value: "+80%", label: "органический трафик" },
      { value: "+50%", label: "позиции в поисковиках" },
    ],
    serviceType: { name: "Web Development" },
  },
  {
    id: 4,
    banner: {
      title: "Prime medical center",
      shortDescription: "SMM Реклама",
      photo: inst,
    },
    statistics: [
      { value: "+40%", label: "автоматизация" },
      { value: "+70%", label: "удержание клиентов" },
    ],
    serviceType: { name: "SMM" },
  },
  {
    id: 5,
    banner: {
      title: "Dr Odil Alisherovich",
      shortDescription: "SMM Маркетинг",
      photo: dr,
    },
    statistics: [
      { value: "+90%", label: "вовлеченность" },
      { value: "+60%", label: "прирост подписчиков" },
    ],
    serviceType: { name: "SMM" },
  },
];

const Content = () => {
  const [selected, setSelected] = useState(1);
  const [filteredData, setFilteredData] = useState(data); // State for filtered data
  const mobileSpansRef = useRef([]);
  const desktopSpansRef = useRef([]);

  const handleSelect = (id, type) => {
    setSelected(id);

    // Filter data based on the selected type
    if (type === "all") {
      setFilteredData(data); // Show all if "Все" is selected
    } else {
      setFilteredData(data.filter(item => item.serviceType.name === type));
    }
  };

  // GSAP animation effect for menu
  useEffect(() => {
    if (mobileSpansRef.current[selected]) {
      gsap.fromTo(
        mobileSpansRef.current[selected],
        { width: 0 },
        { width: "100%", duration: 0.5, ease: "power2.out" }
      );
    }
    if (desktopSpansRef.current[selected]) {
      gsap.fromTo(
        desktopSpansRef.current[selected],
        { width: 0 },
        { width: "100%", duration: 0.5, ease: "power2.out" }
      );
    }
  }, [selected]);

  const responsive = {
    tablet: {
      breakpoint: { max: 1280, min: 768 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 3,
    },
  };

  return (
    <div className="w-full">
      {/* Mobile Carousel for Filter Options */}
      <div className="lg:hidden w-full px-[16px] py-[20px]">
        <Carousel
          responsive={responsive}
          arrows={false}
          showDots={false}
          infinite={false}
        >
          {items.map((item) => (
            <div key={item.id} className="text-center">
              <button
                className={`text-[15px] pb-[10px] font-semibold ${
                  selected === item.id ? "text-violet100" : "text-titleDark"
                }`}
                onClick={() => handleSelect(item.id, item.type)}
              >
                {item.name}
              </button>
              {selected === item.id && (
                <span
                  ref={(el) => (mobileSpansRef.current[item.id] = el)}
                  className="block w-full h-[5px] mt-2 bg-violet100 mx-auto rounded-t-[5px]"
                />
              )}
            </div>
          ))}
        </Carousel>
      </div>

      {/* Desktop Filter Options */}
      <div className="hidden lg:flex lg:gap-[50px] py-[30px] px-[20px]">
        {items.map((item) => (
          <div key={item.id} className="text-center">
            <button
              className={`text-[20px] font-semibold ${
                selected === item.id ? "text-violet100" : "text-titleDark"
              }`}
              onClick={() => handleSelect(item.id, item.type)}
            >
              {item.name}
            </button>
            {selected === item.id && (
              <span
                ref={(el) => (desktopSpansRef.current[item.id] = el)}
                className="block w-full h-[5px] mt-2 bg-violet100 mx-auto rounded-t-[5px]"
              />
            )}
          </div>
        ))}
      </div>

      {/* Cards Section (Filtered Data) */}
      <div className="mx-[16px] 3xl:flex 3xl:flex-row 3xl:flex-wrap 3xl:gap-[100px] 3xl:mx-[30px]">
        {filteredData.map((item, idx) => (
          <Link
            href={`/cases/${item.id}`}
            key={idx}
            className="w-full mt-[20px] 3xl:w-[45%] 6xl:max-w-[99%] relative group cursor-pointer"
          >
            <div className="relative">
              <Image
                src={item.banner.photo}
                width={1500}
                height={900}
                quality={100}
                alt="banner image"
                className="object-cover w-full h-full"
              />
              {/* Hidden content that appears on hover */}
              <div className="hidden 3xl:absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 3xl:flex justify-center items-center">
                <div className="h-[100px]">
                  <div className="flex flex-row gap-[80px] items-center justify-center">
                    {item.statistics.map((stat, statIdx) => (
                      <div key={statIdx} className="flex flex-col gap-[5px]">
                        <p className="text-white100 text-[18px] 3xl:text-[50px] font-bold">
                          {stat.value}
                        </p>
                        <p className="text-white100 text-[18px] 3xl:text-[20px] font-medium font-robotoFlex">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[20px] 3xl:mt-[25px] flex flex-col gap-[4px]">
              <p className="text-[20px] font-semibold mdx:text-[28px] 4xl:text-[35px]">
                {item.banner.title}
              </p>
              <p className="text-[14px] text-violet100 mdx:text-[18px] font-semibold w-full flex flex-row ">
              {item.banner.shortDescription.split(' ').map((word, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && (
                            <Image
                              src={caseDesckription}
                              width={40}
							  quality={100}
                              height={40}
                              alt="separator"
                              className="mx-[6px] w-[14px] h-[14px] mdl:w-[20px] mdl:h-[20px] "
                            />
                          )}
                          <span>{word}</span>
                        </React.Fragment>
                      ))}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Content;

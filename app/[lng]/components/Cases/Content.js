"use client";
import React, { useState, useEffect, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { gsap } from "gsap";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import caseDescription from "@/public/images/Vector.png";
import { CaseCreateModal } from "../Create/case.create";
import { getAllCases } from "../../lib/api/get.api";
import { useParams } from 'next/navigation';
import { deleteCase } from '../../lib/api/delete.api';
import toastr from 'toastr';
import { useRouter } from 'next/navigation';

// Filtrlash uchun elementlar
const items = [
  { id: 1, name: "Все", typeID: null },
  { id: 2, name: "Сайты", typeID: 1 },
  { id: 3, name: "Telegram-боты", typeID: 2 },
  { id: 4, name: "SMM", typeID: 3 },
  { id: 5, name: "Реклама", typeID: 4 },
  { id: 6, name: "SEO", typeID: 5 },
  { id: 7, name: "Брендинг", typeID: 6 },
];

const Content = () => {
  const [selected, setSelected] = useState(1); // Default tanlov "Все"
  const [filteredData, setFilteredData] = useState([]); // Filtrlash uchun ma'lumotlar
  const [modal, setModal] = useState(false);
  const mobileSpansRef = useRef([]);
  const desktopSpansRef = useRef([]);
  const router = useRouter();
  const { lng } = useParams();

  // Ma'lumotlarni olish funksiyasi
  const fetchData = async (typeID = null) => {
    try {
      const responseData = await getAllCases(typeID, lng);
      setFilteredData(responseData || []);
    } catch (error) {
      console.error("CASE'larni olishda xatolik yuz berdi:", error.message);
    }
  };

  // Dastlabki ma'lumotlarni olish
  useEffect(() => {
    fetchData();
  }, [lng]);

  const handleSelect = async (id, typeID) => {
    setSelected(id);
    await fetchData(typeID);
  };

  // GSAP animatsiyasi
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

  const openCreateModal = () => setModal(true);
  const closeCreateModal = () => setModal(false);

  const DeleteCase = async (id) => {
    try {
      await deleteCase(id);
      await fetchData(); // O'chirishdan so'ng ma'lumotlarni yangilash
      toastr.success("CASE muvaffaqiyatli o'chirildi!");
    } catch (error) {
      toastr.error(error.message);
    }
  };

  return (
    <div className="w-full">
      {/* Mobil filtr variantlari */}
      <div className="lg:hidden w-full px-[16px] py-[20px]">
        <Carousel responsive={responsive} arrows={false} showDots={false} infinite={false}>
          {items?.map((item) => (
            <div key={item.id} className="text-center">
              <button
                className={`text-[15px] pb-[10px] font-semibold ${
                  selected === item.id ? "text-violet100" : "text-titleDark"
                }`}
                onClick={() => handleSelect(item.id, item.typeID)}
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

      {/* Desktop filtr variantlari */}
      <div className="hidden lg:flex lg:gap-[50px] py-[30px] px-[20px]">
        {items.map((item) => (
          <div key={item.id} className="text-center">
            <button
              className={`text-[20px] font-semibold ${
                selected === item.id ? "text-violet100" : "text-titleDark"
              }`}
              onClick={() => handleSelect(item.id, item.typeID)}
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

      {/* CREATE MODAL */}
      <CaseCreateModal
        isCloseCreateModal={closeCreateModal}
        visible={modal}
        onCreateSuccess={fetchData} // Ma'lumotlarni yangilash funksiyasini uzatish
      />

      {/* Karta bo'limi (Filtrlangan ma'lumotlar) */}
      <div className="mx-[16px] 3xl:flex 3xl:flex-row 3xl:flex-wrap 3xl:gap-[100px] 3xl:mx-[30px]">
        {filteredData.map((item, idx) => (
          <div
            key={idx}
            className="w-full mt-[20px] 3xl:w-[45%] 6xl:max-w-[99%] relative group cursor-pointer group"
          >
            <div className="relative">
              {item.slider.length > 0 && item.slider[0]?.url && (
                <Link href={`/cases/${item.id}`}>
                  <Image
                    src={item.slider[0].url}
                    width={1500}
                    height={900}
                    quality={100}
                    alt="banner image"
                    className="object-cover w-full h-full"
                  />
                </Link>
              )}
              {/* Hover qilinganda ko'rinadigan kontent */}
              <div className="hidden 3xl:absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 3xl:flex justify-center items-center">
                <div className="h-[100px]">
                  <div className="flex flex-row gap-[80px] items-center justify-center">
                    {item.obtainedResult.map((stat, statIdx) => (
                      <div key={statIdx} className="flex flex-col gap-[5px]">
                        <p className="text-white100 text-[18px] 3xl:text-[50px] font-bold">
                          {stat.name}
                        </p>
                        <p className="text-white100 text-[18px] 3xl:text-[20px] font-medium font-robotoFlex">
                          {stat.result}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[20px] 3xl:mt-[25px] flex flex-col gap-[4px]">
              <p className="text-[20px] font-semibold mdx:text-[28px] 4xl:text-[35px]">
                {item.title}
              </p>
              <p className="text-[14px] text-violet100 mdx:text-[18px] font-semibold w-full flex flex-row ">
                {item.type.map((typeItem, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <Image
                        src={caseDescription}
                        width={40}
                        quality={100}
                        height={40}
                        alt="separator"
                        className="mx-[6px] w-[14px] h-[14px] mdl:w-[20px] mdl:h-[20px] "
                      />
                    )}
                    <span>{typeItem.name}</span>
                  </React.Fragment>
                ))}
              </p>

              <button
                onClick={() => DeleteCase(item.id)}
                className="rounded-[10px] bg-red-500 text-[18px] font-montserrat text-white font-bold text-center w-[30%] py-[15px] px-[20px] mt-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={openCreateModal}
          className="w-full mt-[20px] 3xl:w-[45%] 6xl:max-w-[99%] relative group cursor-pointer flex items-center justify-center rounded-[6px] border border-violet100 border-dashed"
        >
          <FaPlus className="text-[20px] mdl:text-[40px] 3xl:text-[50px] text-violet100" />
        </button>
      </div>
    </div>
  );
};

export default Content;

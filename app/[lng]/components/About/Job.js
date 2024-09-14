
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import revTop from '@/public/images/reviews/revTop.png';
import revBottom from '@/public/images/reviews/revBottom.png';
import revBG from '@/public/images/reviews/revBG.png';

const Job = () => {
  // Define state for each input field
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    specialization: '',
    experience: '',
    salary: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform necessary actions like API calls here
    console.log('Form Data Submitted:', formData);

    // Reset form after submission
    setFormData({
      fullName: '',
      age: '',
      specialization: '',
      experience: '',
      salary: '',
    });
  };

  return (
    <div
      className="relative mx-[16px] mt-[20px] mdl:mt-[30px] rounded-[30px] bg-cover bg-no-repeat px-5 py-8 bg-[#161616] bg-opacity-[90%] 3xl:px-[70px] 3xl:flex 3xl:flex-row 3xl:py-[80px] 3xl:justify-between"
      style={{ backgroundImage: `url(${revBG.src})` }}
    >
      {/* Top Decorative Image - Background */}
      <div className="absolute top-0 right-0 rounded-[30px] z-0">
        <Image width={400} height={400} src={revTop} alt="revTop" className='rounded-[30px] opacity-[40%]' />
      </div>

      {/* Title */}
      <p className="text-[28px] text-white font-bold relative z-[99999] mb-6 mdl:text-[50px] mdl:mb-[40px] 3xl:w-[40%]">
        Присоединяйтесь к нашей команде!
      </p>

      {/* Form */}
      <form className="z-[99999] relative 3xl:w-[50%] 3xl:justify-center 3xl:flex 3xl:flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="ФИО"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-4 rounded-[15px] bg-[#16161680] border border-[#5A5A5A] text-[#fff] placeholder-[#7B7B7B] text-[12px] mdl:text-[20px] mb-[12px] mdl:mb-[19px]"
        />
        <input
          type="text"
          name="age"
          placeholder="Возраст"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-4 rounded-[15px] bg-[#16161680] border border-[#5A5A5A] text-[#fff] placeholder-[#7B7B7B] text-[12px] mdl:text-[20px] mb-[12px] mdl:mb-[19px]"
        />
        <input
          type="text"
          name="specialization"
          placeholder="Специализация"
          value={formData.specialization}
          onChange={handleChange}
          className="w-full p-4 rounded-[15px] bg-[#16161680] border border-[#5A5A5A] text-[#fff] placeholder-[#7B7B7B] text-[12px] mdl:text-[20px] mb-[12px] mdl:mb-[19px]"
        />
        <input
          type="text"
          name="experience"
          placeholder="Опыт работы"
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-4 rounded-[15px] bg-[#16161680] border border-[#5A5A5A] text-[#fff] placeholder-[#7B7B7B] text-[12px] mdl:text-[20px] mb-[12px] mdl:mb-[19px]"
        />
        <input
          type="text"
          name="salary"
          placeholder="Желаемая ЗП"
          value={formData.salary}
          onChange={handleChange}
          className="w-full p-4 rounded-[15px] bg-[#16161680] border border-[#5A5A5A] text-[#fff] placeholder-[#7B7B7B] text-[12px] mdl:text-[20px]"
        />
        <button
          type="submit"
          className="w-full p-4 rounded-[100px] bg-[#7B72EB] text-white font-bold text-[14px] hover:bg-opacity-90 transition duration-300 mdl:py-[20px] mdl:px-[30px] mdl:w-[40%] mdl:mt-[40px] mdl:text-[18px] 3xl:w-[60%] mt-[20px]"
        >
          Отправить
        </button>
      </form>

      {/* Bottom Decorative Image - Background */}
      <div className="absolute bottom-0 left-0 z-0">
        <Image width={400} height={400} src={revBottom} alt="revBottom" className='rounded-[30px] opacity-[40%]' />
      </div>
    </div>
  );
};

export default Job;

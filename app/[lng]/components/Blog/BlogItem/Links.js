"use client"
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { BsTelegram, BsLink } from 'react-icons/bs';
import Link from 'next/link';
import { useState } from 'react';

const Links = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleCopyLink = () => {
    // Copy the current page URL
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setTooltipVisible(true);
        setTimeout(() => setTooltipVisible(false), 5000); // Hide the tooltip after 2 seconds
      })
      .catch((err) => console.error('Failed to copy URL:', err));
  };

  return (
    <div className='relative flex flex-row gap-[8px] justify-end items-center mb-[60px] mt-[20px] pr-[16px]'>
      <Link target="_blank" href='https://www.facebook.com/people/Result-%D0%BC%D0%B5%D0%B4%D0%B8%D1%86%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9-%D0%BC%D0%B0%D1%80%D0%BA%D0%B5%D1%82%D0%B8%D0%BD%D0%B3/61551538436032/' className='cursor-pointer w-[50px] h-[50px] 3xl:w-[70px] 3xl:h-[70px] flex items-center justify-center bg-[#DFDDF5] rounded-[100px]'>
        <FaFacebookF className='text-violet100 3xl:text-[35px]'/>
      </Link>
      <Link target="_blank" href='https://www.instagram.com/result_med?igsh=MXQ3NnVncW4xbjBwMg==' className='cursor-pointer w-[50px] h-[50px] 3xl:w-[70px] 3xl:h-[70px] flex items-center justify-center bg-[#DFDDF5] rounded-[100px]'>
        <FaInstagram className='text-violet100 3xl:text-[35px]'/>
      </Link>
      <Link target="_blank" href='https://t.me/result_med' className='cursor-pointer w-[50px] h-[50px] 3xl:w-[70px] 3xl:h-[70px] flex items-center justify-center bg-[#DFDDF5] rounded-[100px]'>
        <BsTelegram className='text-violet100 3xl:text-[35px]'/>
      </Link>

      {/* Copy Link Button */}
      <div className="relative">
        <button onClick={handleCopyLink} className='cursor-pointer w-[70px] h-[70px] 3xl:w-[90px] 3xl:h-[90px] flex items-center justify-center bg-violet100 rounded-[100px]'>
          <BsLink className='text-white100 text-[32px] 3xl:text-[45px]'/>
        </button>

        {/* Tooltip */}
        {tooltipVisible && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs px-2 py-1 rounded-md">
            Ссылка скопирована!
          </div>
        )}
      </div>
    </div>
  );
};

export default Links;

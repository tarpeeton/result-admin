"use client"
import Link from 'next/link'
import { FaTelegram } from "react-icons/fa";
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const Contact = () => {
  return (
    <div className='rounded-[30px] bg-white100 mx-[16px] py-[30px] px-[20px] mt-[20px] mdl:mt-[25px] 3xl:mt-[30px] mdl:rounded-[40px] 3xl:rounded-[100px] mdl:my-[50px] mdl:px-[40px] 3xl:py-[80px] 3xl:px-[70px] mb-[60px] mdl:mb-[80px] 3xl:mb-[140px]'>

      <div className='3xl:flex 3xl:flex-row mb-[26px] mdl:mb-[40px] 3xl:mb-[60px]'>
        <div className='3xl:w-[50%]'>
          <h5 className='text-[28px] font-bold text-titleDark mdl:text-[50px]'>Контакты</h5>
          <div className='mt-[20px] mdl:mt-[40px] '>
            <Link
              href='tel:+998917888041'
              className="w-[50%] p-4 rounded-[100px] bg-[#7B72EB] text-white font-bold text-[14px] hover:bg-opacity-90 transition duration-300 mdl:py-[20px] mdl:px-[30px] mdl:w-[40%]  mdl:text-[18px] 3xl:w-[40%]"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
        <div className='flex flex-col mdl:flex-row 3xl:mdl:flex-col mt-[20px] 3xl:w-[50%]'>
          <div className='flex flex-col'>
            <p className='text-[#A6A6A6] text-[14px] font-medium mdl:text-[18px] 3xl:text-[19px]'>Номера телефонов</p>
            <Link href='tel:+998905092562' className='text-titleDark text-[20px] mdl:text-[28px] 3xl:text-[30px] font-semibold '>+998 90 509 25 62</Link>
            <Link href='tel:+998900228073' className='text-titleDark text-[20px] mdl:text-[28px] 3xl:text-[30px] font-semibold '>+998 90 022 80 73</Link>
          </div>
          <div className='mt-[20px] 3xl:mt-[40px]'>
            <p className='text-[#A6A6A6] text-[14px] font-medium mdl:text-[18px] 3xl:text-[19px]'>Менеджер</p>

            <Link href='https://t.me/user_n88' className='flex flex-row gap-[8px] mt-[12px]'>
              <FaTelegram className='w-[30px] h-[30px] text-[#2AABEE] 3xl:w-[40px] 3xl:h-[40px]' />
              <p className='text-[20px] font-semibold  3xl:text-[30px]'>Telegram</p>
            </Link>
          </div>
        </div>
      </div>


      {/* Yandex Map */}
      <div className='rounded-[30px] mt-[20px] overflow-hidden w-full h-[400px]'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1018.9107190174738!2d69.29095451249238!3d41.35112539305633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef35418406693%3A0xf91e0631f842852c!2sINTERMED%20Innovation!5e0!3m2!1sru!2s!4v1726206787068!5m2!1sru!2s" width="800" height="600"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='w-full h-full'></iframe>
      </div>
    </div>
  );
};

export default Contact;

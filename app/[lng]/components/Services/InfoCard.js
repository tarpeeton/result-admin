"use client"
import Link from 'next/link';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const InfoCard = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    responsive: [
      {
			  breakpoint: 1300,
			  settings: {
				slidesToShow: 1,
					slidesToScroll: 1,
				rows:1,
				infinite: true,
			  }
			
      },
      {
			  breakpoint: 800,
			  settings: {
				slidesToShow: 1,
					slidesToScroll: 1,
				infinite: true,
			  }
			
      },
      {
        breakpoint: 750, // Disable slider for screens smaller than 750px
        settings: 'unslick',
      },
    ],
  };
  

  return (
    <div className='flex flex-col mt-[80px] gap-[10px] 3xl:mx-[30px]'>
      {/* Slider for screens larger than 750px */}
      <div className='hidden slg:block w-full cursor-pointer'>
        <Slider {...settings} className='w-full'>
          {/* CARD 1 */}
		  <div className='w-full mdl:min-w-full  4xl:max-w-[50%] rounded-[30px] bg-violet100 p-[30px] pb-[26px] flex flex-col justify-between  xl:min-w-[90%]  2xl:max-w-[98%] 3xl:min-w-[98%] 2xl:min-h-[450px] 4xl:min-h-[600px]'>
            <div className='w-[60%]'>
              <p className='text-[23px] mdl:text-[40px] text-white100 font-bold 4xl:text-[50px]'>Подход под каждого</p>
            </div>
            <div className='mt-[15px] mdl:text-[18px] w-[85%]  mdl:mt-[40px]'>
              <p className='text-[14px] mdl:text-[18px] text-white100 4xl:text-[20px] font-robotoFlex'>
			  Разработка уникальных решений, учитывающих специфику вашего бизнеса
              </p>
            </div>
          </div>
          {/* CARD 2 */}
          <div className='w-full mdl:min-w-full  4xl:max-w-[50%] rounded-[30px] bg-[#F4F3FF] p-[30px] pb-[26px] flex flex-col justify-between  xl:min-w-[90%]  2xl:max-w-[98%] 3xl:min-w-[98%] 2xl:min-h-[450px] 4xl:min-h-[600px]'>
            <div className='w-[60%]'>
              <p className='text-[23px] mdl:text-[40px] text-titleDark font-bold 4xl:text-[50px]'>Современный дизайн</p>
            </div>
            <div className='mt-[15px] mdl:text-[18px] w-[85%]  mdl:mt-[40px]'>
              <p className='text-[14px] mdl:text-[18px] text-[#454545] 4xl:text-[20px] font-robotoFlex'>
			  Создание визуально привлекательных и функциональных сайтов, которые запоминаются
              </p>
            </div>
          </div>
          {/* CARD 3 */}
          <div className='w-full 2xl:max-w-[98%]  mdl:min-w-full 2xl:min-h-[450px]  rounded-[30px] bg-[#F4F3FF] p-[30px] pb-[26px] flex flex-col justify-between xl:min-w-[90%]  2xl:min-w-[98%] 4xl:min-h-[600px]'>
            <div className='w-[60%]'>
              <p className='text-[23px] mdl:text-[40px] text-titleDark font-bold 4xl:text-[50px]'>SEO-оптимизация</p>
            </div>
            <div className='mt-[15px] w-[85%] mdl:mt-[40px]'>
              <p className='text-[14px] mdl:text-[18px] 4xl:text-[20px] text-[#454545] font-robotoFlex'>
			  Повышение видимости вашего сайта в поисковых системах для привлечения целевых клиентов
              </p>
            </div>
          </div>
        </Slider>
      </div>


{/* ============================================================================= */}
      {/* Column layout for screens smaller than 750px */}
      <div className="sm:flex sm:flex-col sm:gap-[20px] slg:hidden mx-[16px] mdl:mx-[20px] ">
	  <div className='w-full rounded-[30px] bg-violet100 p-[30px] pb-[26px] flex flex-col  min-h-[240px]'>
          <div className='w-[60%]'>
            <p className='text-[23px] text-white font-bold'>Подход под каждого</p>
          </div>
          <div className='mt-[15px] w-[85%]'>
            <p className='text-[14px] text-white font-robotoFlex'>
             Разработка уникальных решений, учитывающих специфику вашего бизнеса
            </p>
          </div>
        </div>
        <div className='w-full rounded-[30px] bg-[#F4F3FF] p-[30px] pb-[26px] flex flex-col  mdl:mt-[20px] min-h-[240px]'>
          <div className='w-[60%]'>
            <p className='text-[23px] text-titleDark font-bold'>Современный дизайн</p>
          </div>
          <div className='mt-[15px] w-[85%]'>
            <p className='text-[14px] text-[#454545] font-robotoFlex'>
             Создание визуально привлекательных и функциональных сайтов, которые запоминаются
            </p>
          </div>
        </div>
        <div className='w-full rounded-[30px] bg-[#F4F3FF] p-[30px] pb-[26px] flex flex-col  min-h-[240px]'>
          <div className='w-[60%]'>
            <p className='text-[23px] text-titleDark font-bold'>SEO-оптимизация</p>
          </div>
          <div className='mt-[15px] w-[85%]'>
            <p className='text-[14px] text-[#454545] font-robotoFlex'>
              Повышение видимости вашего сайта в поисковых системах для привлечения целевых клиентов
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;

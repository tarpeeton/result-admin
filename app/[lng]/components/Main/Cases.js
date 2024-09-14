"use client";
import React from "react";
import { useParams } from 'next/navigation';
import { useCustomTranslation } from '../../../i18n/client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick/lib/slider';

import Image from 'next/image';
import caseimg from '@/public/images/caseimg.jpg';
import caseDesckription from '@/public/images/Vector.png';
import Link from 'next/link';

const caseData = [
  {
    image: caseimg,
    title: 'Intermed Innovation',
    description: 'Сайт SEO',
    slug: 'case1',
    id: 1,
  },
  {
    image: caseimg,
    title: 'Another Case',
    description: 'Development Marketing',
    slug: 'case2',
    id: 2,
  },
];

const Cases = () => {
  const { lng } = useParams();
  const { t } = useCustomTranslation(lng, 'result');

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Adjust the autoplay speed
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          rows: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className='mt-[80px] mdl:mt-[100px] 2xl:mt-[200px]'>
      {/* Case Title */}
      <div className='flex flex-col p-[24px] w-full h-full'>
        <p className='text-[28px] mdl:text-[50px] 3xl:text-[60px] font-bold'>
          {t('case_title')}
        </p>
        <p className='bg-violet100 text-white100 text-[23px] mdl:text-[40px] 3xl:text-[50px] font-bold p-[10px] w-[243px] mdl:w-[426px] 3xl:w-[535px] rounded-[170px] text-center rotate-[-5deg]'>
          {t('case_subtitle')}
        </p>
      </div>
      {/* Slider Section */}
      <div className='2xl:mt-[60px] mdl:max-h-[500px] 4xl:max-h-[900px] '>
        <Slider {...settings} className='w-full cursor-pointer'>
          {/* Slides */}
          {caseData.map((item) => (
            <div key={item.id} className="w-full mt-[20px] slg:max-w-[99%] 6xl:max-w-[99%]">
              <Link href={`/cases/${item.slug}`} passHref>
                <div>
                  <Image
                    src={item.image}
                    width={500}
                    height={500}
                    quality={100}
                    alt="banner image"
                    className="object-cover w-full h-full"
                  />
                  <div className="mt-[20px] 3xl:mt-[25px] flex flex-col gap-[4px]">
                    <p className="text-[20px] font-semibold  mdx:text-[28px] 4xl:text-[35px]">
                      {item.title}
                    </p>
                    <p className="text-[14px] text-violet100 mdx:text-[18px] font-semibold flex items-center flex-wrap">
                      {/* Replace spaces in description with an image */}
                      {item.description.split(' ').map((word, index) => (
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
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      <Link
        href='/cases'
        className='mt-[40px] mdx:mt-[60px] w-[175px] h-[50px] px-[30px] py-[20px] mx-auto rounded-[100px] bg-violet100 flex items-center justify-center xl:mt-[60px] 3xl:mt-[100px] 4xl:w-[300px] 4xl:h-[62px] 4xl:mt-[60px]'
      >
        <p className='text-white100 font-bold text-[14px] 4xl:text-[18px]'>
          Все кейсы
        </p>
      </Link>
    </div>
  );
};

export default Cases;

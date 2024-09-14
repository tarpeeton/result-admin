'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Navigation = () => {
  const [activeNav, setActiveNav] = useState('Сайты');
  const navRefs = useRef([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 4, // Show 4 items at a time in mobile slider
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false, // Optional: Hide arrows if not needed
    responsive: [
      {
        breakpoint: 1024, // For tablets and smaller devices
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // For smaller devices
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For very small devices
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const navItems = [
    { name: 'Сайты', href: '#'  , slug: 'web-development' },
    { name: 'Telegram-боты', href: '#' , slug: 'telegram-bot-development' },
    { name: 'SMM', href: '#' , slug: 'smm' },
    { name: 'Реклама', href: '#' , slug: 'ads-launch' },
    { name: 'SEO', href: '#'  , slug: 'seo'},
    { name: 'Брендинг', href: '#' , slug: 'branding' },
  ];

  useEffect(() => {
    navRefs.current.forEach((ref) => {
      if (ref) {
        gsap.fromTo(ref, 
          { width: '0%', opacity: 0 }, 
          { width: '100%', opacity: 1, duration: 0.4, ease: "power2.out", paused: true }
        );
      }
    });
  }, []);

  useEffect(() => {
    navRefs.current.forEach((ref, index) => {
      if (ref) {
        if (navItems[index].name === activeNav) {
          gsap.to(ref, { width: '100%', opacity: 1, marginTop: '5px', duration: 0.3, ease: "power2.out" });
        } else {
          gsap.to(ref, { width: '0%', opacity: 0, duration: 0.1 });
        }
      }
    });
  }, [activeNav]);

  return (
    <>
      {/* FOR DESKTOP VIEW */}
      <nav className="hidden 2xl:flex px-[20px] gap-[50px] "> {/* 10px gap between items */}
        {navItems.map((item, index) => (
          <div key={item.name} className="flex flex-col items-center relative  justify-center  text-center">
            <a
              href={`/ru/services/${item.slug}`}
              className={`text-[20px] font-semibold ${
                activeNav === item.name ? 'text-[#7B72EB]' : 'text-black'
              } hover:text-[#7B72EB] pb-1`}
              onClick={() => setActiveNav(item.name)}
              style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
            >
              {item.name}
            </a>
            <span
              ref={el => (navRefs.current[index] = el)}
              className="absolute bottom-[-15px] left-0 right-0 w-0 h-[5px] bg-[#7B72EB] rounded-tl-[5px] rounded-tr-[5px]"
            ></span>
          </div>
        ))}
      </nav>

      {/* FOR MOBILE AND TABLET VIEW */}
      <nav className="2xl:hidden p-[20px]">
        <Slider {...settings}>
          {navItems.map((item, index) => (
            <div key={item.name} className="flex flex-col items-center relative px-[10px]"> {/* Slider items */}
              <a
                href={item.href}
                className={`text-[15px] mdl:text-[20px] font-semibold ${
                  activeNav === item.name ? 'text-[#7B72EB]' : 'text-black'
                } hover:text-[#7B72EB] pb-1`}
                onClick={() => setActiveNav(item.name)}
                style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
              >
                {item.name}
              </a>
              <span
                ref={el => (navRefs.current[index] = el)}
                className="absolute bottom-[-15px] left-0 right-0 w-0 h-[5px] bg-[#7B72EB] rounded-tl-[5px] rounded-tr-[5px]"
              ></span>
            </div>
          ))}
        </Slider>
      </nav>
    </>
  );
};

export default Navigation;

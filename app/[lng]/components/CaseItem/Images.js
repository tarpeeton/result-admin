'use client'; // Указываем, что этот компонент должен рендериться на стороне клиента

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image'

// Данные с изображениями
const slider = [
	{
	  id: 1,
	  url: 'https://ucarecdn.com/47eb0d5d-33fa-4f77-ac71-715685d172d6/-/preview/1000x611/',
	},
	{
	  id: 2,
	  url: 'https://ucarecdn.com/47eb0d5d-33fa-4f77-ac71-715685d172d6/-/preview/1000x611/',
	},
	{
	  id: 3,
	  url: 'https://ucarecdn.com/47eb0d5d-33fa-4f77-ac71-715685d172d6/-/preview/1000x611/',
	},
	{
	  id: 4,
	  url: 'https://ucarecdn.com/47eb0d5d-33fa-4f77-ac71-715685d172d6/-/preview/1000x611/',
	},
  ];
  
// Параметры адаптивности
const responsive = {
	mobile: {
		breakpoint: { max: 768, min: 0 },
		items: 1, // Показывать 1 изображение на мобильных устройствах
	},
	tablet: {
		breakpoint: { max: 1024, min: 769 },
		items: 2, // Показывать 2 изображения на планшетах
	},
	desktop: {
		breakpoint: { max: 3000, min: 1025 },
		items: 2, // Показывать 2 изображения на десктопах
	},
};

const Images = () => {
	return (
		<div className="mt-[80px] mb-[80px] 3xl:mb-[200px]">
			<h2 className="text-[28px] mdl:text-[50px]  font-bold mb-[20px] mdl:mb-[40px]">Итоги наглядно</h2>

			{/* Слайдер */}
			<Carousel
			responsive={responsive}
			infinite={true}
			autoPlay={true}
			autoPlaySpeed={3000} // Скорость переключения
			arrows={false} // Отключить стрелки
			containerClass="carousel-container"
			itemClass="carousel-item-padding-40-px"
			>
				{slider.map((item) => (
					<div key={item.id} className="px-2 cursor-pointer">
						<Image
						width={1600}
						height={670}
						quality={100}
							src={item.url}
							alt={`Slide ${item.id}`}
							className="object-cover w-full"
						/>
					</div>
				))}
			</Carousel>
		</div>
	);
};

export default Images;

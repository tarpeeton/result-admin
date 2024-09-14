'use client'
import { FaCheck } from 'react-icons/fa'

import { useState } from 'react'
const CostCardData = [
	{
		title: 'Одностраничный сайт',
		description: `Статичный сайт для специалиста или небольшой клиники. Срок – 1 месяц (при быстром получении запрашиваемой информации от клиента) 1 страница`,
		services: [
			'Разработка сайта',
			'Заполнение контентом на 2 языках',
			'Интеграция с CMS панелью',
			'Хостинг на 3 месяца',
		],
		price: '300$',
		link: 'slug/sdf',
	},
	{
		title: 'Многостраничный сайт',
		description: `Гибкий многостраничный сайт для специалиста или клиники\nСрок – 1 месяц (при быстром получении запрашиваемой информации от клиента)\n5 страниц`,
		services: [
			'Разработка сайта',
			'Заполнение контентом на 2 языках',
			'Интеграция с CMS панелью',
			'Хостинг на 3 месяца',
			'Индексация в Google',
			'SEO оптимизация под ключевые слова',
			'Доменное имя на 1 год',
			'Экспорт кода',
		],
		price: '600$',
		link: 'slug/sdf',
	},
	{
		title: 'Многостраничный сайт',
		description: `Гибкий многостраничный сайт для специалиста или клиники\nСрок – 1 месяц (при быстром получении запрашиваемой информации от клиента)\n5 страниц`,
		services: [
			'Разработка сайта',
			'Заполнение контентом на 2 языках',
			'Интеграция с CMS панелью',
			'Хостинг на 3 месяца',
			'Индексация в Google',
			'SEO оптимизация под ключевые слова',
			'Доменное имя на 1 год',
			'Экспорт кода',
		],
		price: '600$',
		link: 'slug/sdf',
	},
	{
		title: 'Многостраничный сайт',
		description: `Гибкий многостраничный сайт для специалиста или клиники\nСрок – 1 месяц (при быстром получении запрашиваемой информации от клиента)\n5 страниц`,
		services: [
			'Разработка сайта',
			'Заполнение контентом на 2 языках',
			'Интеграция с CMS панелью',
			'Хостинг на 3 месяца',
			'Индексация в Google',
			'SEO оптимизация под ключевые слова',
			'Доменное имя на 1 год',
			'Экспорт кода',
		],
		price: '600$',
		link: 'slug/sdf',
	},
]

const CostCard = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => {
		setIsModalOpen(true)
	}

	// Close modal function
	const closeModal = () => {
		setIsModalOpen(false)
	}
	return (
		<div className='bg-white100 px-[24px] pt-[30px] rounded-[30px] flex flex-col 3xl:flex-col  3xl:p-[40px] mx-[16px] mt-[20px] 3xl:mx-[30px]'>
			<div>
				<h3 className='text-[28px] mdl:text-[50px] font-bold text-titleDark'>
					Стоимость услуг
				</h3>
			</div>
			<div className='rounded-[30px] mt-[20px] relative flex flex-col 2xl:flex-wrap 2xl:flex-row 2xl:gap-[25px] '>
				{/* Mapping through CostCardData array */}
				{CostCardData.map((card, index) => (
					<div
						key={index}
						className='relative w-full border px-[24px] py-[30px] border-[#F0F0F0] rounded-[30px] mt-[20px]  2xl:w-[calc(32.333%-16px)] pb-[150px]'
					>
						<div>
							<p className='text-[20px] font-semibold 2xl:font-bold mdl:text-[30px] text-titleDark'>
								{card.title}
							</p>
						</div>
						<div className='mt-[20px]'>
							{/* Split the description by '\n' and map over each part */}
							{card.description.split('\n').map((line, lineIndex) => (
								<p
									key={lineIndex}
									className='text-[15px] mdl:text-[18px] text-[#454545] font-normal font-robotoFlex'
								>
									{line}
								</p>
							))}
						</div>
						<div className='h-[1px] w-full bg-[#F0F0F0] mt-[25px]' />
						<div className='flex flex-col mt-[25px] relative gap-[12px]'>
							{card.services.map((service, serviceIndex) => (
								<div key={serviceIndex} className='flex flex-row gap-[12px]'>
									<div className='rounded-[6px] flex items-center justify-center bg-violet100 bg-opacity-20 w-[30px] h-[30px]'>
										<FaCheck className='text-violet100' />
									</div>
									<div className='flex items-center'>
										<p className='text-[#010101] text-[15px] font-medium font-robotoFlex'>
											{service}
										</p>
									</div>
								</div>
							))}
						</div>
						<div className='h-[1px] w-full bg-[#F0F0F0] mt-[25px]' />
						<div className='mt-[25px]'>
							<p className='text-violet100 font-bold text-[28px]'>
								{card.price}
							</p>
						</div>
						{/* Update the button section with bottom 20px */}
						<button
							onClick={openModal}
							className='text-white text-center text-[18px] font-bold w-[90%] mx-auto py-[30px] 3xl:py-[24px] px-[20px] bg-violet100 rounded-[100px]  mt-[7px] absolute left-0 right-0 bottom-[20px]'
						>
							Оставить заявку
						</button>
					</div>
				))}
			</div>
			
		</div>
	)
}

export default CostCard

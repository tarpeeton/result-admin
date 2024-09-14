"use client"
import slug from '@/public/images/slug/slug.png'
import Image from 'next/image'
import { useState } from 'react'
import { ServiceEditTitleModal } from '../Modal/serviceEditTitle'

const ServiceItem = () => {
	const [open , setIsOPen] = useState(false)

	const isOpenModal  = () => setIsOPen(true)
	const isCloseModal = () => setIsOPen(false)

	return (
		<div className='mx-[16px] 3xl:mx-[30px] mt-[20px] mdl:mt-[30px] relative '>
			<div className='bg-white100  px-[16px] pt-[16px] rounded-[30px] flex flex-col 3xl:flex-row 3xl:justify-center 3xl:items-center 3xl:p-[40px]'>
				{/* IMAGE */}
				<div className='rounded-[30px] w-full mx-[12px] 3xl:w-[50%] 3xl:order-2'>
					<Image
						className='rounded-[30px] object-cover'
						src={slug}
						width={1000}
						height={900}
						quality={100}
					/>
				</div>
				{/* TEXT INFo */}
				<div className='flex flex-col mt-[30px] px-[20px] mdl:mt-[40px] 3xl:w-[50%]'>
					<div className='w-[80%] 4xl:w-[70%]'>
						<h1 className='text-[28px] font-bold text-titleDark mdl:text-[40px] 3xl:text-[50px]'>
							Разработка и продвижение сайтов
						</h1>
					</div>
					<div className='mt-[15px] 3xl:mt-[40px] 3xl:w-[80%]'>
						<p className='text-[14px] mdl:text-[18px] leading-[23px] font-medium text-[#454545] 3xl:text-[20px]'>
							В Result Agency мы предлагаем комплексные решения, которые
							приводят к измеримым результатам. Мы создаем эффективные кампании,
							которые работают на вашу цель
						</p>
					</div>
					<button
					onClick={isOpenModal}
						className='w-[80%] 4xl:w-[50%] mt-[30px] mdl:mt-[40px] mdl:w-[50%] mdl:mx-0 mx-auto bg-[#7B72EB] rounded-[100px] py-[20px] px-[30px] text-center text-[14px] font-bold text-white100 3xl:text-[18px] 3xl:mt-[80px]'
					>
						Редактировать
					</button>
				</div>
				{open && <ServiceEditTitleModal isCloseModal={isCloseModal}/>}
			</div>
		</div>
	)
}

export default ServiceItem
      
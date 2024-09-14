'use client'

import { useState } from 'react'

const CaseTitle = () => {


	return (
		<div className='bg-[#F8F8F8] py-[30px] px-[16px] 3xl:px-[30px] 3xl:py-[80px]'>
			<div className='flex flex-col 3xl:w-[75%]'>
				<div>
					<h1 className='text-[28px] text-titleDark font-bold mdl:text-[40px] 3xl:text-[50px]'>
						Примеры наших успешных проектов
					</h1>
				</div>
				<div className='mt-[15px]'>
					<p className='text-[#454545] text-[14px] mdl:text-[18px] 3xl:text-[20px]'>
						Узнайте, как мы помогаем нашим клиентам достигать целей с помощью
						качественных решений. Эти кейсы демонстрируют наши возможности и
						опыт в различных областях
					</p>
				</div>
				<button
					onClick={openModal}
					className='w-full py-[20px] px-[30px] bg-violet100  text-center  rounded-[100px] font-bold text-[14px] 3xl:w-[30%] text-white100 mt-[25px] mdl:mt-[40px]'
				>
					Хочу крутой проект!
				</button>
			</div>
		</div>
	)
}

export default CaseTitle

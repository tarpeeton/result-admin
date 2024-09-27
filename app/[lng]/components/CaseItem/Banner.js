'use client'
import { useState } from 'react'
import  EditCase  from '../Edit/caseBanner.edit'

const Banner = ({ data  , ID}) => {
	const [open, openModal] = useState(false)
	const editModalOpen = () => openModal(true)
	const closeModal = () => openModal(false)
	return (
		<div
			className='w-full rounded-[30px] py-[30px] px-[20px] 3xl:flex 3xl:flex-row 3xl:justify-center 3xl:items-center mt-[20px] mdl:mt-[30px]  mdl:rounded-[40px] 3xl:rounded-[50px]'
			style={{
				backgroundImage: `url(${data.background.url})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className='3xl:w-[60%] 3xl:flex 3xl:items-center 3xl:justify-center mb-[50px]'>
				<div className='3xl:w-[80%]'>
					<h1 className='text-white text-[35px] mdl:text-[50px] font-bold mb-[15px]'>
						{data.title}
					</h1>

					{/* Краткое описание */}
					<p className='text-white text-[14px] mdl:text-[20px] 3xl:text-[21px] mb-[15px]'>
						{data.shortDescription}
					</p>

					<button
						onClick={editModalOpen}
						className='mt-[20px] w-[50%] bg-white100 rounded-full py-[25px] px-[15px] text-violet100 text-center text-[18px] font-bold'
					>
						Редактировать
					</button>
				</div>
				{/* Заголовок */}
			</div>
			<EditCase
				isCloseCreateModal={closeModal}
				visible={open}
				bannerID={data.id}
				bgPhotoId={data.background?.id}
				photoID={data.photo.id}
				title={data.title}
				description={data.shortDescription}
				bgPhotoSrc={data.background.url}
				PhotoSrc={data.photo.url}
				Data_ID={ID}
			/>
			<div className='relative w-full 3xl:w-[40%]'>
				{/* Логотип */}
				{data.logo?.url && (
					<div className=' absolute right-0 3xl:right-[25px]'>
						<img src={data.logo.url} alt='Logo' className='w-[100px] h-auto' />
					</div>
				)}

				{/* Фото */}
				{data.photo?.url && (
					<div className=''>
						<img
							src={data.photo.url}
							alt='Banner Photo'
							className='w-full h-auto'
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default Banner

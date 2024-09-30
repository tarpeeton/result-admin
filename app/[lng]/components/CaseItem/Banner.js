'use client'
import { useState } from 'react'
import  EditCase  from '../Edit/caseBanner.edit'
import { useParams } from 'next/navigation'
import Image from 'next/image'
	


const data = ({ data  , ID}) => {
  // Extract data data
  const [open, openModal] = useState(false)
  const editModalOpen = () => openModal(true)
  const closeModal = () => openModal(false)
  const {lng} = useParams()
  return (
    <div
      className='w-full rounded-[30px]  3xl:flex 3xl:flex-row 3xl:justify-center 3xl:items-center mt-[20px] mdl:mt-[30px] mdl:rounded-[40px] 3xl:rounded-[50px] mdl:p-[0] '
      style={{
        backgroundImage: `url(${data.background.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
		
      <div className='3xl:w-[60%] 3xl:flex 3xl:items-center 3xl:justify-center mb-[50px] py-[30px] px-[20px]'>
	  <div className='3xl:w-[80%]'>
					<h1 className='text-white text-[35px] mdl:text-[50px] font-bold mb-[15px]'>
						{data.title[lng]}
					</h1>

					{/* Краткое описание */}
					<p className='text-white text-[14px] mdl:text-[20px] 3xl:text-[21px] mb-[15px]'>
						{data.shortDescription[lng]}
					</p>

					<button
						onClick={editModalOpen}
						className='mt-[20px] w-[50%] bg-white100 rounded-full py-[25px] px-[15px] text-violet100 text-center text-[18px] font-bold'
					>
						Редактировать
					</button>
				</div>
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
        {/* Logo */}
        {data.logo?.url && (
          <div className='absolute right-0 3xl:right-[25px]'>
            <Image
              src={data.logo.url}
              alt='Logo'
              width={100}
              height={100}
              quality={100}
              className='w-[100px] h-auto'
            />
          </div>
        )}

        {/* Photo */}
        {data.photo?.url && (
          <div className='2xl:rounded-[50px]'>
            <Image
              src={data.photo.url}
              alt='data Photo'
              width={500} // Adjust according to your design
              height={500} // Adjust according to your design
              quality={100}
              className='w-full h-auto 2xl:rounded-[50px]'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default data;
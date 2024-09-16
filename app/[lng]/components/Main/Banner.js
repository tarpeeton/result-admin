"use client"
import blur from '@/public/images/Blur.png'
import my from '@/public/images/Object.png'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState , useEffect } from 'react'
import { useCustomTranslation } from '../../../i18n/client'
import axios from 'axios'
import { getMainBanner } from '../../lib/api/get.api'
const Banner = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { lng } = useParams()
	const { t } = useCustomTranslation(lng, 'banner')
	const [banner, setMainBanner] = useState({});

		useEffect(() => {
		const getBanner = async () => {
			try {
			const bannerData = await getMainBanner(lng);
			setMainBanner(bannerData.data);
			} catch (error) {
			console.error('Error fetching banner data:', error);
			}
		};

		getBanner();
		}, [lng]);





	// Open modal function
	const openModal = () => {
		setIsModalOpen(true)
	}

	// Close modal function
	const closeModal = () => {
		setIsModalOpen(false)
	}

	return (
		<div className='w-full rounded-b-[30px] 2xl:rounded-b-[100px] bg-violet100  relative  mdl:h-[90vh] 4xl:h-[100vh]'>
			<div className='w-full pt-[50px]  2xl:w-[80%] 2xl:mx-auto flex flex-col justify-center items-center '>
				<div className='w-[80%] px-[16px] flex flex-col justify-center items-center text-center mb-[200px] mdl:mb-[250px] 4xl:mb-[500px]'>
					<h1 className='text-[35px] font-bold text-white100 mdl:text-[60px] 4xl:text-[90px] font-montserrat'>
					{banner.title}
					</h1>
					<p className='w-[90%] text-[15px] font-semibold text-white100 mt-[10px] mdl:text-[16px] font-montserrat '>
						{banner.subtitle}
					</p>
					<button
						onClick={openModal}
						className='bg-white100 rounded-[60px] px-[30px] py-[20px] w-[230px] mt-[30px] mdl:w-[300px] z-[99]'
					>
						<p className='text-violet100 text-[14px] font-bold mdl:text-[18px] font-montserrat'>
						Редактировать
						</p>
					</button>
				</div>
				{/* Pass the modal open/close state to the modal component */}
				<div className='w-full mt-[30px] absolute bottom-0'>
					<Image
						src={banner.background?.url}
						width={1400}
						height={600}
						quality={100}
						alt='Main banner image'
						className='w-[70%] mdl:w-[100%] xl:w-[60%] 4xl:w-[100%] mx-auto'
					/>
					<Image
						src={banner.photo?.url}
						width={1200}
						height={400}
						quality={100}
						alt='blurred background image'
						className='object-cover absolute bottom-0 w-full   h-[40px] 3xl:h-[100px] rounded-b-[30px] 2xl:rounded-b-[100px] opacity-[70%] '
					/>
				</div>
			</div>
		</div>
	)
}

export default Banner

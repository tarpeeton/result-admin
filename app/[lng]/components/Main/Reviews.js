'use client'
import Image from 'next/image'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import revBG from '@/public/images/reviews/revBG.png'
import revBottom from '@/public/images/reviews/revBottom.png'
import revTop from '@/public/images/reviews/revTop.png'
import { useRef, useState, useEffect } from 'react'
import { CreateReviews } from '../Create/review.create'
import { getReviewsAll } from '../../lib/api/get.api'
import { lang } from '../constants/langugaes'

const SampleNextArrow = ({ onClick }) => (
	<div
		className='cursor-pointer text-[20px] w-[60px] h-[60px] rounded-[100px] border border-white100 flex items-center justify-center'
		onClick={onClick}
	>
		<GrLinkNext className='text-white100' />
	</div>
)

const SamplePrevArrow = ({ onClick }) => (
	<div
		className='cursor-pointer text-[20px] w-[60px] h-[60px] rounded-[100px] border border-white100 flex items-center justify-center'
		onClick={onClick}
	>
		<GrLinkPrevious className='text-white100' />
	</div>
)

const Reviews = () => {
	const [createModal, setCreateModal] = useState(false)

	const [languages, setLangugages] = useState('ru')
	const [reviews, setReviews] = useState([]) // State for reviews
	const [error, setError] = useState(null) // Handle errors
	const sliderRef = useRef(null)
	// Fetch reviews when the component mounts
	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const data = await getReviewsAll()
				setReviews(data)
			} catch (error) {
				console.error('Error fetching reviews:', error)
				setError('Failed to fetch reviews')
			}
		}
		fetchReviews() // Call the fetch function
	}, [])

	// Slider settings
	var settings = {
		dots: false,
		infinite: true,
		speed: 600,
		slidesToShow: 2,
		slidesToScroll: 1,
		initialSlide: 0,
		arrows: false,
		responsive: [
			{
				breakpoint: 1240,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}

	const handlePrev = () => {
		if (sliderRef.current) {
			sliderRef.current.slickPrev() // Trigger prev slide
		}
	}

	const handleNext = () => {
		if (sliderRef.current) {
			sliderRef.current.slickNext() // Trigger next slide
		}
	}

	return (
		<div
			className='relative w-full mt-[20px] mdl:mt-[30px] rounded-[30px] bg-cover bg-no-repeat px-5 py-8 bg-[#161616] bg-opacity-[90%] mdl:px-[40px] mdl:py-[50px]'
			style={{ backgroundImage: `url(${revBG.src})` }}
		>
			{/* Top Decorative Image */}
			<div className=' absolute top-0 right-0 rounded-[30px]'>
				<Image
					width={400}
					height={400}
					src={revTop}
					alt='revTop'
					className='rounded-[30px]  opacity-40 '
				/>
			</div>

			{/* Reviews Title */}
			<p className='text-[28px] text-white font-bold relative z-50 mdl:text-[50px] '>
				Отзывы клиентов
			</p>
			<div className='flex flex-row gap-[8px]  mdl:mb-[40px]'>
      {lang.map((language, index) => (
          <button
            key={index}
            onClick={() => setLangugages(language)}
            className={`py-[15px] px-[20px] text-center text-[18px] font-bold ${
              languages === language ? 'text-violet100' : 'text-white'
            }`}
          >
            {language.toUpperCase()}
          </button>
        ))}
			</div>

			{/* Reviews Carousel */}

			<Slider {...settings} ref={sliderRef} className='z-[999] overflow-hidden'>
				{reviews.data?.map(rev => (
					<div
						key={rev.id}
						className='rounded-[30px] px-[20px] py-[25px] bg-[#161616] bg-opacity-[50%] text-white z-[99999] min-h-[400px] border border-[#5A5A5A] 2xl:max-w-[90%]'
					>
						<h3 className='text-[18px] font-semibold mb-[4px] mdl:text-[28px] 3xl:text-[30px]'>
							{`${rev.name[languages]}`}
						</h3>
						<p className='text-[14px] opacity-75 mb-[20px] text-[#7B7B7B] font-robotoFlex'>
							{`${rev.occupation[languages]}`}
						</p>
						<p className='text-[15px] leading-[18px] mdl:text-[20px] mdl:leading-[28px] font-robotoFlex'>
							{`${rev.text[languages]}`}
						</p>
					</div>
				))}
			</Slider>

			{/* CREATE MODAL */}
			{createModal && (
				<CreateReviews
					visible={createModal}
					isCloseCreateModal={() => setCreateModal(false)}
				/>
			)}

			{/* Call to Action Button */}
			<div className='text-center mt-6 flex items-center justify-between'>
				<button
					onClick={() => setCreateModal(true)}
					className='w-[80%] 2xl:w-[20%] 2xl:mx-0 mx-auto py-[20px] px-[30px] bg-white text-violet100 font-bold text-[14px] rounded-full hover:bg-gray-200 transition z-[999]'
				>
					Добавить
				</button>
				<div className='sm:hidden flex flex-row gap-[8px] 2xl:flex z-[9999]'>
					<SamplePrevArrow onClick={handlePrev} />
					<SampleNextArrow onClick={handleNext} />
				</div>
			</div>

			{/* Bottom Decorative Image */}
			<div className='absolute bottom-0 left-0'>
				<Image
					width={400}
					height={400}
					src={revBottom}
					alt='revBottom'
					className='rounded-[30px] opacity-40 '
				/>
			</div>
		</div>
	)
}

export default Reviews

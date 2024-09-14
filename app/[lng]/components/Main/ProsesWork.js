import { useState } from 'react'
import Slider from 'react-slick/lib/slider'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const ProsesWork = () => {

	// SLIDER
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: false,
		autoplay: false,
		responsive: [
			{
				breakpoint: 1300,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					rows: 1,
					infinite: true,
				},
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
				},
			},
			{
				breakpoint: 750, // Disable slider for screens smaller than 750px
				settings: 'unslick',
			},
		],
	}

	const openModal = () => {
		setIsModalOpen(true)
	}

	// Close modal function
	const closeModal = () => {
		setIsModalOpen(false)
	}

	return (
		<div className='flex flex-col mt-[80px] gap-[10px]'>
			{/* Slider for screens larger than 750px */}
			<div className='hidden slg:block w-full cursor-pointer'>
				<Slider {...settings} className='w-full'>
					{/* CARD 1 */}
					<div className='w-full mdl:max-w-full  4xl:max-w-[50%] rounded-[30px] bg-violet100 p-[30px] pb-[26px] relative flex flex-col justify-between mdl:pl-[40px] mdl:rounded-[60px] mdl:pt-[50px]  2xl:max-w-[98%] 3xl:min-w-[98%] 2xl:min-h-[450px]  4xl:min-h-[600px]'>
						<div className='mdl:w-[80%]'>
							<p className='text-[28px] mdl:text-[40px] text-white100 font-bold 4xl:text-[50px]'>
								Процесс работы максимально чистый и прозрачный
							</p>
						</div>
						<div className='relative w-full  mt-[200px] 3xl:absolute 3xl:bottom-[25px] 3xl:right-[25px]'>
							<div className='py-[20px] absolute  bottom-[20px] right-[20px] px-[30px] rounded-[100px] bg-white text-center  mdl:w-[300px] 4xl:w-[370px]'>
								<button
									onClick={openModal}
									className='text-[14px] font-bold text-violet100 mdl:text-[18px] 4xl:text-[20px]'
								>
									Бесплатная консультация
								</button>
							</div>
						</div>
					</div>
					{/* CARD 2 */}
					<div className='w-full mdl:min-w-full  4xl:max-w-[50%] rounded-[30px] bg-[#F4F3FF] p-[30px] pb-[26px] flex flex-col justify-between  xl:min-w-[90%]  2xl:max-w-[98%] 3xl:min-w-[98%] 2xl:min-h-[450px] 4xl:min-h-[600px]'>
						<div className='w-[60%]'>
							<p className='text-[23px] mdl:text-[40px] text-titleDark font-bold 4xl:text-[50px]'>
								РАБОТАЕМ ПО ДОГОВОРУ
							</p>
						</div>
						<div className='mt-[15px] mdl:text-[18px] w-[85%]  mdl:mt-[40px]'>
							<p className='text-[14px] mdl:text-[18px] text-[#454545] 4xl:text-[20px]'>
								Мы тщательно прорабатываем все детали и фиксируем наши
								обязательства в договоре. Это гарантирует прозрачность, защищает
								ваши интересы и обеспечивает надежность наших услуг.
							</p>
						</div>
					</div>
					{/* CARD 3 */}
					<div className='w-full 2xl:max-w-[98%]  mdl:min-w-full 2xl:min-h-[450px]  rounded-[30px] bg-[#F4F3FF] p-[30px] pb-[26px] flex flex-col justify-between xl:min-w-[90%]  2xl:min-w-[98%] 4xl:min-h-[600px]'>
						<div className='w-[60%]'>
							<p className='text-[23px] mdl:text-[40px] text-titleDark font-bold 4xl:text-[50px]'>
								УТВЕРЖДАЕМ ПЛАНЫ
							</p>
						</div>
						<div className='mt-[15px] w-[85%] mdl:mt-[40px]'>
							<p className='text-[14px] mdl:text-[18px] 4xl:text-[20px] text-[#454545]'>
								На этом этапе мы окончательно согласовываем все детали проекта,
								включая сроки, ресурсы и этапы выполнения. Важно, чтобы все
								участники имели четкое представление о ходе работы.
							</p>
						</div>
					</div>
				</Slider>
			</div>
			{/* ============================================================================= */}
			{/* Column layout for screens smaller than 750px */}
			<div className='sm:flex sm:flex-col sm:gap-[20px] slg:hidden '>
				<div className='w-full rounded-[30px] bg-violet100 p-[30px] pb-[26px] flex flex-col justify-between '>
					<div>
						<p className='text-[28px] text-white100 font-bold'>
							Процесс работы максимально чистый и прозрачный
						</p>
					</div>
					<div className='py-[20px] px-[30px] rounded-[100px] bg-white text-center mt-[51px]'>
						<button
							className='text-[14px] font-bold text-violet100'
						>
							Бесплатная консультация
						</button>
					</div>
				</div>
				<div className='w-full rounded-[30px] bg-[#F4F3FF] p-[30px] pb-[26px] flex flex-col justify-between mdl:mt-[20px]'>
					<div className='w-[60%]'>
						<p className='text-[23px] text-titleDark font-bold'>
							РАБОТАЕМ ПО ДОГОВОРУ
						</p>
					</div>
					<div className='mt-[15px] w-[85%]'>
						<p className='text-[14px] text-[#454545] font-robotoFlex'>
							Мы тщательно прорабатываем все детали и фиксируем наши
							обязательства в договоре.
						</p>
					</div>
				</div>
				<div className='w-full rounded-[30px] bg-[#F4F3FF] p-[30px] pb-[26px] flex flex-col justify-between'>
					<div className='w-[60%]'>
						<p className='text-[23px] text-titleDark font-bold'>
							УТВЕРЖДАЕМ ПЛАНЫ
						</p>
					</div>
					<div className='mt-[15px] w-[85%]'>
						<p className='text-[14px] text-[#454545] font-robotoFlex'>
							На этом этапе мы окончательно согласовываем все детали проекта.
						</p>
					</div>
				</div>
			</div>
			{/* MODAL */}
		</div>
	)
}

export default ProsesWork

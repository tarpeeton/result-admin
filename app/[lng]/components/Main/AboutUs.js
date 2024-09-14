import Image from 'next/image';


import aboutUS from '@/public/images/aboutUS/aboutUS.png'
import Link from 'next/link'

const AboutUs = () => {
	return (
		<Link href='/about' className='rounded-[30px] bg-violet100 mdl:rounded-[60px] 2xl:rounded-[100px] px-[20px] py-[30px] w-full mt-[20px] mdl:mt-[25px] 2xl:mt-[30px] mdl:px-[40px] 2xl:px-[70px] mdl:py-[50px] 2xl:py-[80px]  relative mdl:overflow-hidden'>

			<div className='mdl:w-[70%]'>
				<p className='text-[28px] text-white100 font-bold mdl:text-[50px]'>Result Agency — ваш путь к успеху</p>
			</div>
			<div className='mt-[24px] mdl:mt-[20px] 2xl:mt-[40px] mdl:w-[80%]'>
				<span className='text-[14px] mdl:text-[18px] text-white100 font-medium font-robotoFlex'>
				Result Agency — это команда профессионалов, которые превращают идеи в результат. Мы специализируемся на комплексных маркетинговых решениях, направленных на рост вашего бизнеса. С Result Agency вы получаете не просто услуги, а партнера, который работает на ваш успех
				</span>
			</div>
			<div className=' rotate-[15%] overflow-hidden relative h-[160px] mt-[-70px]  mdl:absolute mdl:bottom-[-50px] mdl:right-0 mdl:w-[350px] mdl:h-[300px] 2xl:h-[500px] 2xl:w-[500px] '>
				<Image className='absolute h-[150px] w-[150px] mdl:h-[260px] mdl:w-[300px] right-[-40px] mdl:object-contain 2xl:w-[500px] 2xl:h-[500px]' width={511} height={511} src={aboutUS} quality={100}/>
			</div>
			<div className='w-[80%] mx-auto bg-white rounded-[100px]  py-[20px] px-[30px] text-center  mdl:w-[50%] mdl:mx-0 mdl:mt-[80px] 2xl:w-[20%]'>
			<p  className='  text-violet100 font-bold text-[14px] mdl:text-[18px] text-center bg-white100'>
				 Подробнее
			</p>
			</div>
			
		</Link>
	)
}


export default AboutUs;
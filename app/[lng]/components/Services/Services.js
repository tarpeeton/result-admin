
"use client"
import { useCustomTranslation } from '../../../i18n/client'
import { useParams } from 'next/navigation'
import { GrLinkNext } from "react-icons/gr";

// IMAGE 
import Image from 'next/image'
import web from '@/public/images/services/web.svg'
import bot from '@/public/images/services/bot.svg'
import smm from '@/public/images/services/smm.svg'
import Group from '@/public/images/services/Group.svg'
import seo from '@/public/images/services/seo.svg'
import branding from '@/public/images/services/branding.svg'
import Link from 'next/link'


const data = [
	{
	  id: 0,
	  slug: 'web-development',
	  name: 'Разработка сайтов',
	  shortDescription: 'Разработка сайтов, которые просты в использовании и выглядят профессионально...',
	  icon: web,
	  active: true,
	  main: true,
	},
	{
	  id: 1,
	  slug: 'telegram-bot-development',
	  name: 'Разработка Telegram-ботов',
	  shortDescription: 'Создание Telegram-ботов для улучшения общения с клиентами...',
	  icon: bot,
	  active: true,
	  main: true,
	},
	{
	  id: 2,
	  slug: 'smm',
	  name: 'SMM',
	  shortDescription: 'Помощь в создании и управлении социальными сетями...',
	  icon: smm,
	  active: true,
	  main: true,
	},
	{
	  id: 3,
	  slug: 'ads-launch',
	  name: 'Запуск рекламы',
	  shortDescription: 'Настройка рекламы для привлечения клиентов и повышения прибыли...',
	  icon: Group,
	  active: true,
	  main: true,
	},
	{
	  id: 4,
	  slug: 'seo',
	  name: 'SEO',
	  shortDescription: 'Оптимизация сайта для повышения поискового рейтинга...',
	  icon: seo,
	  active: true,
	  main: true,
	},
	{
	  id: 5,
	  slug: 'branding',
	  name: 'Брендинг',
	  shortDescription: 'Создание уникального стиля и образа для бизнеса...',
	  icon: branding,
	  active: true,
	  main: true,
	},
  ];



const Services = () => {
	const {lng} = useParams()
	const {t} = useCustomTranslation(lng , 'services')
	return (
	  <div className="w-full flex flex-col flex-wrap justify-between gap-6 mt-[20px] bg-[#F8F8F8] py-[24px] px-[16px] rounded-[30px] mdl:pl-[24px] mdl:pr-[14px]">
		{/* Card 1 */}
	

		<div>
			<p className='text-[28px] mdl:text-[50px] font-semibold text-titleDark'>{t('service_title')}</p>
		</div>

{/* =========================== START ===================================== */}
<div className='flex  flex-col gap-[16px] mdl:gap-[24px] 2xl:flex 2xl:flex-row 2xl:flex-wrap 2xl:gap-[30px]'>
	{/* 1 */}
		<Link href={`/services/${data[0].slug}`} className="bg-white w-full rounded-[20px] border border-gray-200 shadow-md p-6 flex flex-col  relative mdl:min-h-[302px] 2xl:w-[60%] cursor-pointer hover:bg-violet100 duration-[600ms] ease-in-out group">
		<div className='w-[50px] h-[50px] mb-[20px] mdx:w-[60px] mdx:h-[50px] mdx:mb-[50px] 3xl:w-[67px] 3xl:h-[67px] 3xl:mb-[55px]'>
			<Image width={90} height={90} src={data[0].icon} alt='service Image' className="object-cover group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:sepia-[100%]"/>
		</div>
		  <div>
			<h2 className="text-xl mdl:text-[28px] font-semibold text-[#010101] group-hover:text-white">{data[0].name}</h2>
			<p className="text-[#A6A6A6] mdl:text-[18px] leading-[20.4px] mt-[12px] group-hover:text-white 3xl:w-[60%] font-robotoFlex 3xl:leading-[23.5px]">
			 {data[0].shortDescription}
			</p>
		  </div>
		  <div className="w-[71px] h-[71px] mdl:w-[91px] mdl:h-[91px] mb-[-20px] mr-[-20px] flex justify-end absolute right-0 bottom-0 border-[10px] border-[#F8F8F8] rounded-[100%]">
			<div className="w-full h-full bg-bgDark shadow-md rounded-full flex items-center justify-center">
			 <GrLinkNext className='text-violet100 mdl:w-[25px] mdl:h-[25px]'/>
			</div>
		  </div>
		</Link>
		{/* 2 */}
		<Link href={`/services/${data[1].slug}`} className="bg-white w-full rounded-[20px] border border-gray-200 shadow-md p-6 flex flex-col  relative mdl:min-h-[302px] 2xl:w-[36%] cursor-pointer hover:bg-violet100 duration-[600ms] ease-in-out group">
		<div className='w-[50px] h-[50px] mb-[20px] mdx:w-[60px] mdx:h-[50px] mdx:mb-[50px] 3xl:w-[67px] 3xl:h-[67px] 3xl:mb-[55px]'>
			<Image width={90} height={90} src={data[1].icon} alt='service Image' className="object-cover group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:sepia-[100%]"/>
		</div>
		  <div>
			<h2 className="text-xl mdl:text-[28px] font-semibold text-[#010101] group-hover:text-white">{data[1].name}</h2>
			<p className="text-[#A6A6A6] mdl:text-[18px] leading-[20.4px] mt-[12px] group-hover:text-white 3xl:w-[80%]">
			  {data[1].shortDescription}
			</p>
		  </div>
		  <div className="w-[71px] h-[71px] mdl:w-[91px] mdl:h-[91px] mb-[-20px] mr-[-20px] flex justify-end absolute right-0 bottom-0 border-[10px] border-[#F8F8F8] rounded-[100%]">
			<div className="w-full h-full bg-bgDark shadow-md rounded-full flex items-center justify-center">
			 <GrLinkNext className='text-violet100 mdl:w-[25px] mdl:h-[25px]'/>
			</div>
		  </div>
		</Link>
		{/* 3 */}
		<Link href={`/services/${data[2].slug}`} className="bg-white w-full rounded-[20px] border border-gray-200 shadow-md p-6 flex flex-col  relative mdl:min-h-[302px] 2xl:w-[36%] cursor-pointer hover:bg-violet100 duration-[600ms] ease-in-out group">
		<div className='w-[50px] h-[50px] mb-[20px] mdx:w-[60px] mdx:h-[50px] mdx:mb-[50px] 3xl:w-[67px] 3xl:h-[67px] 3xl:mb-[55px]'>
			<Image width={90} height={90} src={data[2].icon} alt='service Image' className="object-cover group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:sepia-[100%]"/>
		</div>
		  <div>
			<h2 className="text-xl mdl:text-[28px] font-semibold text-[#010101] group-hover:text-white">{data[2].name}</h2>
			<p className="text-[#A6A6A6] mdl:text-[18px] leading-[20.4px] mt-[12px] group-hover:text-white 3xl:w-[80%]">
			{data[2].shortDescription}
			</p>
		  </div>
		  <div className="w-[71px] h-[71px] mdl:w-[91px] mdl:h-[91px] mb-[-20px] mr-[-20px] flex justify-end absolute right-0 bottom-0 border-[10px] border-[#F8F8F8] rounded-[100%]">
			<div className="w-full h-full bg-bgDark shadow-md rounded-full flex items-center justify-center">
			 <GrLinkNext className='text-violet100 mdl:w-[25px] mdl:h-[25px]'/>
			</div>
		  </div>
		</Link>
		{/* 4 */}
		<Link href={`/services/${data[3].slug}`} className="bg-white w-full rounded-[20px] border border-gray-200 shadow-md p-6 flex flex-col  relative mdl:min-h-[302px] 2xl:w-[60%] cursor-pointer hover:bg-violet100 duration-[600ms] ease-in-out group">
		<div className='w-[50px] h-[50px] mb-[20px] mdx:w-[60px] mdx:h-[50px] mdx:mb-[50px] 3xl:w-[67px] 3xl:h-[67px] 3xl:mb-[55px]'>
			<Image width={90} height={90} src={data[3].icon} alt='service Image' className="object-cover group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:sepia-[100%]"/>
		</div>
		  <div>
			<h2 className="text-xl mdl:text-[28px] font-semibold text-[#010101] group-hover:text-white">{data[3].name}</h2>
			<p className="text-[#A6A6A6] mdl:text-[18px] leading-[20.4px] mt-[12px] group-hover:text-white 3xl:w-[60%]">
			  {data[3].shortDescription}
			</p>
		  </div>
		  <div className="w-[71px] h-[71px] mdl:w-[91px] mdl:h-[91px] mb-[-20px] mr-[-20px] flex justify-end absolute right-0 bottom-0 border-[10px] border-[#F8F8F8] rounded-[100%]">
			<div className="w-full h-full bg-bgDark shadow-md rounded-full flex items-center justify-center">
			 <GrLinkNext className='text-violet100 mdl:w-[25px] mdl:h-[25px]'/>
			</div>
		  </div>
		</Link>
		<Link href={`/services/${data[4].slug}`} className="bg-white w-full rounded-[20px] border border-gray-200 shadow-md p-6 flex flex-col  relative mdl:min-h-[302px] 2xl:w-[48%] cursor-pointer hover:bg-violet100 duration-[600ms] ease-in-out group">
		<div className='w-[50px] h-[50px] mb-[20px] mdx:w-[60px] mdx:h-[50px] mdx:mb-[50px] 3xl:w-[67px] 3xl:h-[67px] 3xl:mb-[55px]'>
			<Image width={90} height={90} src={seo} alt='service Image' className="object-cover group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:sepia-[100%]"/>
		</div>
		  <div>
			<h2 className="text-xl mdl:text-[28px] font-semibold text-[#010101] group-hover:text-white">{data[4].name}</h2>
			<p className="text-[#A6A6A6] mdl:text-[18px] leading-[20.4px] mt-[12px] group-hover:text-white 3xl:w-[60%]">
			 {data[4].shortDescription}
			</p>
		  </div>
		  <div className="w-[71px] h-[71px] mdl:w-[91px] mdl:h-[91px] mb-[-20px] mr-[-20px] flex justify-end absolute right-0 bottom-0 border-[10px] border-[#F8F8F8] rounded-[100%]">
			<div className="w-full h-full bg-bgDark shadow-md rounded-full flex items-center justify-center">
			 <GrLinkNext className='text-violet100 mdl:w-[25px] mdl:h-[25px]'/>
			</div>
		  </div>
		</Link>
		{/* 5 */}
		<Link href={`/services/${data[5].slug}`} className="bg-white w-full rounded-[20px] border border-gray-200 shadow-md p-6 flex flex-col  relative mdl:min-h-[302px] 2xl:w-[48%] cursor-pointer hover:bg-violet100 duration-[600ms] ease-in-out group" >
			<div className='w-[50px] h-[50px] mb-[20px] mdx:w-[60px] mdx:h-[50px] mdx:mb-[50px] 3xl:w-[67px] 3xl:h-[67px] 3xl:mb-[55px]'>
			<Image width={90} height={90} src={data[5].icon} alt='service Image' className="object-cover group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:sepia-[100%]"/>
		</div>
		  <div>
			<h2 className="text-xl mdl:text-[28px] font-semibold text-[#010101]  group-hover:text-white">{data[5].name}</h2>
			<p className="text-[#A6A6A6] mdl:text-[18px] leading-[20.4px] mt-[12px] group-hover:text-white 3xl:w-[80%]">
			  {data[5].shortDescription}
			</p>
		  </div>
		  <div className="w-[71px] h-[71px] mdl:w-[91px] mdl:h-[91px] mb-[-20px] mr-[-20px] flex justify-end absolute right-0 bottom-0 border-[10px] border-[#F8F8F8] rounded-[100%]">
			<div className="w-full h-full bg-bgDark shadow-md rounded-full flex items-center justify-center">
			 <GrLinkNext className='text-violet100 mdl:w-[25px] mdl:h-[25px]'/>
			</div>
		  </div>
		</Link>
		</div>

{/* ===================================END================================= */}


























		
	
	
  
	
  
	
  
	
	  </div>
	);
  };
  
  export default Services;
  
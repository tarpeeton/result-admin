'use client'

import footerLogo from '@/public/svg/footerLogo.svg'
import logo from '@/public/svg/logoSVG.svg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { AiOutlineClose } from 'react-icons/ai' // Иконка для закрытия
import { BsFillTelephoneFill } from 'react-icons/bs'
import { GrLinkNext } from 'react-icons/gr' // Иконка для стрелки
import { RxHamburgerMenu } from 'react-icons/rx'
import { useCustomTranslation } from '../../../i18n/client'
import { cookieName, languages } from '../../../i18n/settings'
import CustomSelect from './CustomSelect' // Импортируем кастомный селект

const Header = ({ lng }) => {
	const { t } = useCustomTranslation(lng, 'header')
	const [cookies, setCookie] = useCookies([cookieName])
	const [isMenuOpen, setIsMenuOpen] = useState(false) // Состояние для управления открытием/закрытием меню
	const pathname = usePathname()

	
	const isMainPage = pathname === `/${lng}`

	const handleLanguageChange = newLng => {
		setCookie(cookieName, newLng, { path: '/' })

		const pathArray = window.location.pathname.split('/')

		if (languages.includes(pathArray[1])) {
			pathArray[1] = newLng
		} else {
			pathArray.unshift(newLng)
		}

		const newPath = pathArray.join('/')
		window.location.href = newPath
	}

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen) // Открыть или закрыть меню
	}

	return (
		<div
			className={`w-full flex justify-between px-[20px] z-[999] py-[16px] 
            ${isMainPage ? 'bg-violet100' : 'bg-white'}`} // Зависимость от флага isMainPage
		>
			<div className='hidden 2xl:flex items-center gap-[25px] 4xl:gap-[40px] xl:w-[25%] 4xl:w-[25%]'>
				<Link
					href='/services'
					className={`font-montserrat font-semibold text-[16px] leading-[23px] 4xl:text-[18px]  ${
						isMainPage ? 'text-white hover:text-titleDark' : 'text-titleDark'
					}`}
				>
					{t('uslugi')}
				</Link>
				<Link
					href='/cases'
					className={`font-montserrat font-semibold text-[16px] leading-[23px] 4xl:text-[18px]  ${
						isMainPage ? 'text-white hover:text-titleDark' : 'text-titleDark'
					}`}
				>
					{t('keysi')}
				</Link>
				<Link
					href='/blog'
					className={`font-montserrat font-semibold text-[16px] leading-[23px] 4xl:text-[18px]  ${
						isMainPage ? 'text-white hover:text-titleDark' : 'text-titleDark'
					}`}
				>
					{t('blog')}
				</Link>
				<Link
					href='/about'
					className={`font-montserrat font-semibold text-[16px] leading-[23px] 4xl:text-[18px]  ${
						isMainPage ? 'text-white hover:text-titleDark' : 'text-titleDark'
					}`}
				>
					{t('about')}
				</Link>
			</div>
			{/* MOBILE NAVIGATION */}
			{isMenuOpen && (
				<div className='absolute top-[70px] left-0 w-full h-[100%] bg-white z-[99999999] flex flex-col text-2xl'>
					<a
						href='/services'
						className='flex w-full justify-between items-center flex-row px-[20px] py-[28px] border-b-[1px] border-[#F0F0F0]'
					>
						<p className='font-semibold text-[20px] leading-[23px] mdl:text-[25px] text-titleDark hover:text-titleDark'>
							{t('uslugi')}
						</p>
						<GrLinkNext className='text-titleDark' />
					</a>
					<a
						href='/cases'
						className='font-montserrat flex w-full justify-between items-center flex-row px-[20px] py-[28px] border-b-[1px] border-[#F0F0F0]'
					>
						<p className='font-semibold text-[20px] leading-[23px] mdl:text-[25px] text-titleDark hover:text-titleDark'>
							{t('keysi')}
						</p>
						<GrLinkNext className='text-titleDark' />
					</a>

					<a
						href='/blog'
						className='font-montserrat flex w-full justify-between items-center flex-row px-[20px] py-[28px] border-b-[1px] border-[#F0F0F0]'
					>
						<p className='font-semibold text-[20px] leading-[23px] mdl:text-[25px] text-titleDark hover:text-titleDark'>
							{t('blog')}
						</p>
						<GrLinkNext className='text-titleDark' />
					</a>

					<a
						href='/about'
						className='font-montserrat flex w-full justify-between items-center flex-row px-[20px] py-[28px] border-b-[1px] border-[#F0F0F0]'
					>
						<p className='font-semibold text-[20px] leading-[23px] mdl:text-[25px] text-titleDark hover:text-titleDark'>
							{t('about')}
						</p>
						<GrLinkNext className='text-titleDark' />
					</a>

					<Link
						href='tel:/+998905092562'
						className='font-montserrat flex w-full justify-between items-center flex-row px-[20px] py-[28px] border-b-[1px] border-[#F0F0F0] z-[99999999999999]'
					>
						<p className='font-semibold text-[20px] leading-[23px] mdl:text-[25px] text-violet100'>
							+998 (90) 509-25-62
						</p>
					</Link>
				</div>
			)}
			<Link href='/'>
				<Image
					src={isMainPage ? footerLogo : logo}
					width={130}
					quality={100}
					height={40}
					alt='Logo'
				/>
			</Link>
			<div className='flex items-center gap-3 xl:w-[25%] xl:justify-end'>
				<div className='hidden 2xl:flex'>
					<Link
						href='tel:+998900228073'
						className={`font-montserrat w-[50px] h-[50px] border-[1px] border-[white] rounded-[100%] flex items-center justify-center ${
							isMainPage ? 'bg-inherit' : 'bg-selectBg'
						}`}
					>
						<BsFillTelephoneFill
							className={`${isMainPage ? 'text-white' : 'text-violet100'}`}
						/>
					</Link>
				</div>

				<button
					className='bg-violet100 hidden mdx:block w-[230px] h-[50px] border rounded-[30px]'
				>
					<p className='font-robotoFlex font-bold text-white100 text-[16px]'>
						{t('getInfo')}
					</p>
				</button>
				
				<div className='flex 2xl:hidden items-center'>
					<button onClick={toggleMenu} className='text-3xl'>
						{isMenuOpen ? (
							<AiOutlineClose
								className={`font-montserrat ${
									isMainPage ? 'text-white' : 'text-black'
								}`}
							/>
						) : (
							<RxHamburgerMenu
								className={`${isMainPage ? 'text-white' : 'text-black'}`}
							/>
						)}
						{/* Меняем иконку в зависимости от состояния */}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Header

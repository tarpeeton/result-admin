const Banner = ({ data }) => {
	// Получаем данные баннера из API
	const { banner } = data

	return (
		<div
			className='w-full rounded-[30px] py-[30px] px-[20px] 3xl:flex 3xl:flex-row 3xl:justify-center 3xl:items-center mt-[20px] mdl:mt-[30px]  mdl:rounded-[40px] 3xl:rounded-[50px]'
			style={{
				backgroundImage: `url(${banner.background.url})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className='3xl:w-[60%] 3xl:flex 3xl:items-center 3xl:justify-center mb-[50px]'>
				<div className='3xl:w-[80%]'>
					<h1 className='text-white text-[35px] mdl:text-[50px] font-bold mb-[15px]'>
						{banner.title.ru}
					</h1>

					{/* Краткое описание */}
					<p className='text-white text-[14px] mdl:text-[20px] 3xl:text-[21px] mb-[15px]'>
						{banner.shortDescription.ru}
					</p>
					{/* Ссылка */}
					{banner.link && (
						<a
							href={banner.link}
							className='text-white text-[14px] font-bold mdl:text-[20px]   rounded-lg  cursor-pointer mb-[50px]'
							target='_blank'
							rel='noopener noreferrer'
						>
							{banner.link}
						</a>
					)}
				</div>
				{/* Заголовок */}
			</div>

			<div className='relative w-full 3xl:w-[40%]'>
				{/* Логотип */}
				{banner.logo?.url && (
					<div className=' absolute right-0 3xl:right-[25px]'>
						<img
							src={banner.logo.url}
							alt='Logo'
							className='w-[100px] h-auto'
						/>
					</div>
				)}

				{/* Фото */}
				{banner.photo?.url && (
					<div className=''>
						<img
							src={banner.photo.url}
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

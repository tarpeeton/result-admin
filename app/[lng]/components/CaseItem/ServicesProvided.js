const providedService = [
	{
	  id: 0,
	  name: {
		uz: "Обновление веб-сайта",
		ru: "Обновление веб-сайта",
		en: "Website Update",
	  },
	  description: {
		uz: [
		  "Создание многостраничного веб-сайта",
		  "Включение удобного и интуитивно понятного интерфейса на всех устройствах",
		  "Использование систем взаимодействия с пациентами и сбора информации о них",
		],
		ru: [
		  "Создание многостраничного веб-сайта",
		  "Включение удобного и интуитивно понятного интерфейса на всех устройствах",
		  "Использование систем взаимодействия с пациентами и сбора информации о них",
		],
		en: [
		  "Creating a multi-page website",
		  "Including a user-friendly and intuitive interface on all devices",
		  "Using patient interaction systems and collecting information about them",
		],
	  },
	  orderNum: 0,
	  active: true,
	},
	{
	  id: 1,
	  name: {
		uz: "Разработка и запуск рекламной кампании",
		ru: "Разработка и запуск рекламной кампании",
		en: "Campaign Development and Launch",
	  },
	  description: {
		uz: [
		  "Запуск всесторонней рекламной кампании в интернете",
		  "Настройка рекламы для привлечения аудитории",
		  "Создание полезных рекламных объявлений, мотивирующих к действию",
		],
		ru: [
		  "Запуск всесторонней рекламной кампании в интернете",
		  "Настройка рекламы для привлечения аудитории",
		  "Создание полезных рекламных объявлений, мотивирующих к действию",
		],
		en: [
		  "Launching a comprehensive advertising campaign online",
		  "Setting up ads to attract an audience",
		  "Creating useful advertisements that motivate action",
		],
	  },
	  orderNum: 1,
	  active: true,
	},
	{
	  id: 2,
	  name: {
		uz: "Создание и продвижение контента в Instagram",
		ru: "Создание и продвижение контента в Instagram",
		en: "Creating and Promoting Content on Instagram",
	  },
	  description: {
		uz: [
		  "Регулярное создание и публикация качественного контента",
		  "Использование специализированной рекламы для расширения охвата в Instagram",
		],
		ru: [
		  "Регулярное создание и публикация качественного контента",
		  "Использование специализированной рекламы для расширения охвата в Instagram",
		],
		en: [
		  "Regular creation and publication of quality content",
		  "Using specialized advertising to expand reach on Instagram",
		],
	  },
	  orderNum: 2,
	  active: true,
	},
  ];
  
  const ServicesProvided = () => {
	return (
	  <div className="mt-[20px] py-[30px] px-[24px]  rounded-[30px] bg-white  mdl:py-[50px] mdl:px-[40px] 3xl:flex 3xl:flex-row mdl:rounded-[40px] 3xl:rounded-[50px]">
		{/* Заголовок */}
		<div className="w-[50%] mb-6 mdl:mb-[50px] 3xl:w-[40%]">
		  <p className="text-titleDark font-bold text-[28px] mdl:text-[40px] 3xl:text-[50px] 3xl:w-[10%]">Оказанные услуги</p>
		</div>
  

  <div className='3xl:w-[60%]'>
{/* Перебираем список предоставленных услуг */}
{providedService.map((item, index) => (
		  <div key={index} className="mb-6 mdl:mb-[70px] 3xl:mb-[40px]">
			{/* Название услуги */}
			<p className="text-[18px] font-semibold text-black mb-2 mdl:text-[23px]  ">{item.name.ru}</p>
  
			{/* Описание услуги */}
			<ul className="list-disc list-inside text-[#454545]">
			{item.description.ru.map((desc, i) => (
							<li
								key={i}
								className="text-[15px] mdl:text-[20px] mb-1 relative before:content-['-'] before:absolute before:left-[-15px] before:text-[#000] list-none font-robotoFlex"
							>
								{desc}
							</li>
						))}
			</ul>
		  </div>
		))}
  </div>
		
	  </div>
	);
  };
  
  export default ServicesProvided;
  
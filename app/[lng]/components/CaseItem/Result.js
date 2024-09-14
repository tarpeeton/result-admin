const obtainedResult = [
	{
		id: 0,
		name: {
			uz: "конверсия",
			ru: "конверсия",
			en: "conversion",
		},
		result: {
			uz: "+30%",
			ru: "+30%",
			en: "+30%",
		},
		orderNum: 0,
	},
	{
		id: 1,
		name: {
			uz: "посещаемость",
			ru: "посещаемость",
			en: "traffic",
		},
		result: {
			uz: "+75%",
			ru: "+75%",
			en: "+75%",
		},
		orderNum: 1,
	},
	{
		id: 2,
		name: {
			uz: "приток клиентов",
			ru: "приток клиентов",
			en: "client influx",
		},
		result: {
			uz: "+50%",
			ru: "+50%",
			en: "+50%",
		},
		orderNum: 2,
	},
];

const Result = () => {
	return (
		<div className="mt-[20px] py-[30px] px-[24px] rounded-[30px] bg-white  3xl:flex 3xl:items-center relative mdl:py-[50px] mdl:px-[40px] 3xl:py-[80px] 3xl:px-[70px]">
			{/* Левая часть: Заголовок и кнопка */}
			<div className="3xl:w-[50%] mb-[30px] 3xl:mb-0 3xl:flex 3xl:flex-col">
				{/* Заголовок */}
				<p className="text-[#7B72EB] font-bold text-[28px] mb-4 3xl:text-[50px] w-[50%] 3xl:mb-[30px]">Полученный результат</p>
				
				{/* Кнопка */}
				<a
					href="#"
					className="block text-center text-white bg-[#7B72EB] py-[20px] px-[30px] w-[90%] rounded-[30px] font-bold mt-4  absolute bottom-[20px] mdl:w-[50%] 3xl:w-[50%] 3xl:relative 3xl:mt-[30px]"
				>
					Просмотреть результат
				</a>
			</div>

			{/* Правая часть: результаты */}
			<div className=" flex flex-col 3xl:flex 3xl:w-[40%] 3xl:justify-between mb-[80px] mdl:flex-row mdl:justify-between">
				{obtainedResult.map((item, index) => (
					<div key={index} className="mb-6 3xl:mb-0">
						<p className="text-[35px] mdl:text-[40px] font-medium text-[#010101]  3xl:text-[50px]">{item.result.ru}</p>
						<p className="text-[14px] mdl:text-[20px] text-[#A6A6A6] 3xl:text-[18px] font-robotoFlex">{item.name.ru}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Result;

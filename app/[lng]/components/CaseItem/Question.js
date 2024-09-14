const query = [
	{ name: "Обновление веб-сайта" },
	{ name: "Запуск рекламной кампании" },
	{ name: "Продвижение в Instagram" }
  ];
  
  const Question = () => {
	return (
	  <div className="rounded-[30px] bg-white100 mt-[20px] flex flex-col py-[30px] px-[24px] mdl:rounded-[40px] 3xl:rounded-[50px] mdl:py-[50px] mdl:px-[40px] 3xl:py-[80px] 3xl:px-[70px] 3xl:flex 3xl:flex-row">
		<div className='3xl:w-[40%]'>
		  <p className="text-titleDark text-[28px] mdl:text-[40px] 3xl:text-[50px] font-bold">Запросы</p>
		</div>
		<ul className="flex flex-col mt-[20px] ml-[24px] 3xl:w-[60%]">
		  {query.map((item, index) => (
			<li key={index} className="text-[15px] list-disc font-medium text-titleDark mdl:text-[20px] 3xl:text-[25px] font-robotoFlex">
			  {item.name}
			</li>
		  ))}
		</ul>
	  </div>
	);
  };
  
  export default Question;
  
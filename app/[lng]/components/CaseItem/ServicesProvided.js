
  
  const ServicesProvided = ({result}) => {
	return (
	  <div className="mt-[20px] py-[30px] px-[24px]  rounded-[30px] bg-white  mdl:py-[50px] mdl:px-[40px] 3xl:flex 3xl:flex-row mdl:rounded-[40px] 3xl:rounded-[50px]">
		{/* Заголовок */}
		<div className="w-[50%] mb-6 mdl:mb-[50px] 3xl:w-[40%]">
		  <p className="text-titleDark font-bold text-[28px] mdl:text-[40px] 3xl:text-[50px] 3xl:w-[10%]">Оказанные услуги</p>
		</div>
  

  <div className='3xl:w-[60%]'>
{/* Перебираем список предоставленных услуг */}
{result.map((item, index) => (
		  <div key={index} className="mb-6 mdl:mb-[70px] 3xl:mb-[40px]">
			{/* Название услуги */}
			<p className="text-[18px] font-semibold text-black mb-2 mdl:text-[23px]  ">{item.name}</p>
  
			{/* Описание услуги */}
			<ul className="list-disc list-inside text-[#454545]">
							<li
								className="text-[15px] mdl:text-[20px] mb-1 relative before:content-['-'] before:absolute before:left-[-15px] before:text-[#000] list-none font-robotoFlex"
							>
								{item.description}
							</li>
			</ul>
		  </div>
		))}
  </div>
		
	  </div>
	);
  };
  
  export default ServicesProvided;
  
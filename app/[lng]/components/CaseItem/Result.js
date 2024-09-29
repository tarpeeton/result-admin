'use client'
import { useState } from 'react'
import { EditResult } from '../Edit/caseResults.edit'
import { useParams } from 'next/navigation'
const Result = ({
	resultDescription,
	obtainedResult,
	resultSiteLink,
	resultInstagramLink,
	resultTelegramLink,
	ID,
}) => {
	const [expandedItems, setExpandedItems] = useState([])
	const [open, setOpen] = useState(false)
	const toggleModalOpen = () => setOpen(!open)
	const {lng} = useParams()
	// Toggle the expanded state for "show more" functionality
	const toggleShowMore = () => {
		setExpandedItems(prevState =>
			prevState.includes(0)
				? prevState.filter(item => item !== 0)
				: [...prevState, 0]
		)
	}

	return (
		<div className='mt-[20px] py-[30px] px-[24px] rounded-[30px] bg-white 3xl:flex 3xl:items-center relative mdl:py-[50px] mdl:px-[40px] 3xl:py-[80px] 3xl:px-[70px]'>
			{/* Левая часть: Заголовок и кнопка */}
			<div className='3xl:w-[40%] mb-[30px] 3xl:mb-0 3xl:flex 3xl:flex-col'>
				{/* Заголовок */}
				<p className='text-[#7B72EB] font-bold text-[28px] mb-4 3xl:text-[50px] w-[50%] 3xl:mb-[30px]'>
					Полученный результат
				</p>

				{/* Кнопка */}

				<button
					onClick={toggleModalOpen}
					className='mt-[20px] w-[50%] bg-violet100 rounded-full py-[25px] px-[15px] text-white100 text-center text-[18px] font-bold'
				>
					Редактировать
				</button>
			</div>

			<EditResult
				resultDescription={resultDescription}
				obtainedResult={obtainedResult}
				resultSiteLink={resultSiteLink}
				resultInstagramLink={resultInstagramLink}
				resultTelegramLink={resultTelegramLink}
				visible={open}
				close={toggleModalOpen}
				ID={ID}
			/>

			{/* Правая часть: результаты */}
			<div className='flex flex-col 3xl:flex 3xl:w-[60%] 3xl:justify-between mb-[80px] mdl:flex-row mdl:justify-between mdl:flex-wrap mdl:gap-[20px]'>
				{obtainedResult.map((item, index) => (
					<div className='flex flex-col' key={index}>
						<div key={index} className='mb-6 3xl:mb-0'>
							<p className='text-[35px] mdl:text-[40px] font-medium text-[#010101] 3xl:text-[50px]'>
								{item?.name[lng]}
							</p>
							<p className='text-[14px] mdl:text-[20px] text-[#A6A6A6] 3xl:text-[18px] font-robotoFlex'>
								{item?.result[lng]}
							</p>
						</div>
					</div>
				))}
				{resultDescription ? (
					<div className='mdl:mt-[15px] 2xl:mt-[20px]'>
						<p className='text-[#454545]'>
							{expandedItems.includes(0) || resultDescription?.length <= 50
								? resultDescription
								: `${resultDescription[lng]?.slice(0, 50)}...`}
						</p>
						{resultDescription?.length > 50 && (
							<button
								className='text-[#7B72EB] font-bold mt-2'
								onClick={toggleShowMore}
							>
								{expandedItems.includes(0) ? 'Скрыть' : 'Показать больше'}
							</button>
						)}
					</div>
				) : null}
			</div>
		</div>
	)
}

export default Result

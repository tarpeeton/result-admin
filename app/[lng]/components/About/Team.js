"use client"
import Image from 'next/image'
import { FaPlus } from "react-icons/fa6";
import { useState } from 'react'
import { CreateMember } from '../Create/member.create';

const Team = ({members}) => {
	const [create , setCreateModal] = useState(false)
	const handeCreateModal = () => setCreateModal(!create)


	return (
		<div className=' rounded-[30px] bg-white mdl:rounded-[40px] 3xl:rounded-[100px] mdl:mx-[20px] 3xl:mx-[30px] flex flex-col py-[30px] px-[16px] mdl:py-[50px] mdl:px-[40px] 3xl:p-[70px] mt-[20px] mdl:mt-[25px] 3xl:mt-[30px]'>
			<div className='w-[90%]'>
				<h3 className='text-[28px] text-titleDark font-bold mdl:text-[50px] 3xl:text-[50px]'>
					Наша команда
				</h3>
				<p className='text-[15px] text-[#7B7B7B] font-bold mdl:text-[20px] mt-[8px] w-[80%] mdl:w-[90%] 3xl:w-[45%] font-robotoFlex'>
					Наша команда состоит из опытных специалистов, знающих свое дело
				</p>
			</div>

			<div className='flex flex-row flex-wrap justify-between mt-[30px] mdl:mt-[50px]'>
				{members.map(member => (
					<div
						key={member.id}
						className='flex flex-col min-h-[239px] w-[45%] mb-[20px] mdl:mb-[40px] 3xl:w-[24%] '
					>
						<div className='rounded-[10px] bg-[#FAFAFA] flex items-center justify-center'>
							<Image
								src={member.photo.url}
								width={340}
								quality={100}
								height={340}
								alt={`${member.fullName} Photo`}
								className='object-cover'
							/>
						</div>
						<div className='mt-[12px] mdl:mt-[25px] flex flex-col'>
							<h4 className='text-[15px] text-titleDark mdl:text-[25px] font-semibold'>
								{member.fullName}
							</h4>
							<p className='text-[14px] text-[#A6A6A6] mdl:text-[18px] font-robotoFlex'>
								{member.position}
							</p>
						</div>
					</div>
				))}
				<CreateMember visible={create} isCloseCreateModal={handeCreateModal}/>

				<button onClick={handeCreateModal} className='w-[300px] h-[300px] border border-dashed border-violet100 flex items-center justify-center'>
					 <FaPlus className='text-[20px] mdl:text-[30px] 3xl:text-[50px] text-violet100'/> 
				</button>
			</div>
		</div>
	)
}

export default Team

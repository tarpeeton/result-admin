import Image from 'next/image'

import img1 from '@/public/images/members/1.png';
import img2 from '@/public/images/members/2.png';
import img3 from '@/public/images/members/3.png';
import img4 from '@/public/images/members/4.png';
import img5 from '@/public/images/members/5.png';
import img6 from '@/public/images/members/6.png';
import img7 from '@/public/images/members/7.png';
import img8 from '@/public/images/members/8.png';
import img9 from '@/public/images/members/9.png';
import img10 from '@/public/images/members/10.png';
import img11 from '@/public/images/members/11.png';
import img12 from '@/public/images/members/12.png';
import img13 from '@/public/images/members/13.png';
import img14 from '@/public/images/members/14.png';
import img15 from '@/public/images/members/15.png';
import img16 from '@/public/images/members/16.png';


const teamData = [
	{
		id: 1,
		fullName: 'Абдулбосит',
		position: 'Project Manager',
		photo: img1,
		active: true,
		orderNum: 1,
	},
	{
		id: 2,
		fullName: 'Рустам',
		position: 'Frontend-developer',
		photo: img11,
		active: true,
		orderNum: 2,
	},
	{
		id: 3,
		fullName: 'Вероника ',
		position: 'Designer',
		photo: img3,
		active: true,
		orderNum: 3,
	},
	{
		id: 4,
		fullName: 'Фарангиз ',
		position: 'Переводчик',
		photo: img4,
		active: true,
		orderNum: 4,
	},
	{
		id: 5,
		fullName: 'Далер',
		position: 'Дизайнер',
		photo: img5,
		active: true,
		orderNum: 4,
	},
	{
		id: 6,
		fullName: 'Хуснора',
		position: 'Мобилограф',
		photo: img6,
		active: true,
		orderNum: 4,
	},
	{
		id: 7,
		fullName: 'Хожиакбар',
		position: 'Администратор',
		photo: img7,
		active: true,
		orderNum: 4,
	},
	{
		id: 8,
		fullName: 'Абдухаким ',
		position: 'Fullstack Developer',
		photo: img8,
		active: true,
		orderNum: 4,
	},
	{
		id: 9,
		fullName: 'Давлатбек',
		position: 'Backend Developer',
		photo: img9,
		active: true,
		orderNum: 4,
	},
	{
		id: 10,
		fullName: 'Андрей',
		position: 'Frontend Developer',
		photo: img16,
		active: true,
		orderNum: 4,
	},
	{
		id: 11,
		fullName: 'Нодир',
		position: 'Backend Developer',
		photo: img10,
		active: true,
		orderNum: 4,
	},
	{
		id: 12,
		fullName: 'Сабина',
		position: 'Backend Developer',
		photo: img12,
		active: true,
		orderNum: 4,
	},
	{
		id: 13,
		fullName: 'Баходыр',
		position: 'UX / UI дизайнер',
		photo: img13,
		active: true,
		orderNum: 4,
	},
	
	
	
]

const Team = () => {
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
				{teamData.map(member => (
					<div
						key={member.id}
						className='flex flex-col min-h-[239px] w-[45%] mb-[20px] mdl:mb-[40px] 3xl:w-[24%] '
					>
						<div className='rounded-[10px] bg-[#FAFAFA] flex items-center justify-center'>
							<Image
								src={member.photo}
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
			</div>
		</div>
	)
}

export default Team

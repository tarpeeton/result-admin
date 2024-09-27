"use client"
import { useEffect , useState } from 'react';
import Link from 'next/link';
import { GrLinkNext } from 'react-icons/gr';
import Links from './Links';
import Image from 'next/image';
import { BlogCreateModal } from '../../Create/blog/blog.create';
const similarNewsData = [
	{
		id: 0,
		slug: 'blog1',
		title: {
			uz: 'Как социальные сети могут улучшить репутацию вашей компании',
			ru: 'Эффективный маркетинг для частных медицинских клиник: ключевые особенности',
			en: 'How social media can improve your company’s reputation',
		},
		description: {
			uz: 'Lorem ipsum dolor sit amet consectetur. Vel a sit id venenatis vitae...',
			ru: 'Узнайте, как продвигать частную медицинскую клинику, привлекать больше пациентов и усиливать доверие с помощью проверенных маркетинговых стратегий.',
			en: 'Learn how to promote a private medical clinic, attract more patients, and build trust using proven marketing strategies.',
		},
		photo: {
			id: 0,
			url: '',
		},
		orderNum: 0,
		text: '...',
	},
	// Other news objects...
];

const truncateTitle = (title, maxLength) => {

	
 


	if (title.length > maxLength) {
		return title.slice(0, maxLength) + '...'; // Truncate and add ellipsis
	}
	return title;
};

const SimilarNews = () => {
	const createAllTogetherBlog = () => console.log("hammasin")


	const [open , setOpenModal] = useState(false)

	const showModalState = () => setOpenModal(!open)

	return (
		<div className='bg-white py-[30px] px-[20px] rounded-[30px] mx-[16px] mdl:py-[50px] flex flex-col justify-between relative min-h-[100vh]'>
			<div className='flex flex-col gap-6'>
				{similarNewsData.map(news => (
					<div
						key={news.id}
						passHref
						className='border-b-[1px] border-[#F0F0F0] pb-[25px] flex flex-row'
					>
						<div className='rounded-md flex flex-col items-center'>
							<div className='flex flex-row items-center justify-between'>
								<div className='w-[100px] h-[100px] rounded-[25px] flex items-center justify-center'>
									<Image
										src='https://ucarecdn.com/9539080c-9d64-4b83-9f61-30c3d77ab1f7/-/preview/100x100/'
										width={100}
										height={100}
										quality={100}
										alt='blog image'
										className='object-contain'
									/>
								</div>

								<div className='flex flex-col w-[70%]'>
									<h3 className='text-[#010101] text-[18px] font-bold mb-[12px]'>
										{truncateTitle(news.title.ru, 40)}{' '}
										{/* Truncate title here */}
									</h3>
									<div className='flex flex-row gap-[12px] w-full items-center'>
										<button className='text-[#7B72EB] text-[14px] font-bold flex items-center mdl:text-[16px]'>
											Редактировать
										</button>
										<div className='h-[19px] w-[1px] bg-violet100' />
										<button className='text-[#7B72EB] text-[14px] font-medium flex items-center mdl:text-[16px]'>
											Удалить
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			
			<BlogCreateModal  open={open} close={showModalState}/>

			{/* Centered Buttons */}
			<div className='absolute left-1/2 transform -translate-x-1/2 bottom-[20px] flex flex-col items-center w-[100%] pt-[20px] border-t border-[#F0F0F0]'>
				<button onClick={createAllTogetherBlog} className='rounded-full py-[20px] px-[30px] text-white bg-violet100 w-[80%] mx-auto mb-2 font-bold text-[18px]'>
					Выгрузить новости
				</button>
				<button onClick={showModalState} className='rounded-full py-[20px] px-[30px]  text-violet100 border border-violet100 bg-white100 w-[80%]  mx-auto font-bold text-[18px]'> 
					Добавить новость
				</button>
			</div>
		</div>
	);
};

export default SimilarNews;

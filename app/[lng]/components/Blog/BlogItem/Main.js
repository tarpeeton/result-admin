'use client'
import { getBlogWithSlug } from '@/app/[lng]/lib/api/get.api'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import SimilarNews from './SimilarNews'
import { updateBlog } from '@/app/[lng]/lib/api/edit.api'
import { EditBlog } from '../../Edit/blog/blog.edit.modal'
import { IoAdd } from 'react-icons/io5'
import { BlogOptionCreate } from '../../Create/blog/blog.option.create'

const MainBlogItem = () => {
	const { slug, lng } = useParams()
	const [blog, setBlogData] = useState(null)
	const [editingOptionId, setEditingOptionId] = useState(null)
	const [modal, setModal] = useState(false)
	const openModal = () => setModal(!modal)
	const [editedData, setEditedData] = useState({})
	const [isModalVisible, setIsModalVisible] = useState(false) // Modal
	useEffect(() => {
		const dataBlog = async () => {
			const res = await getBlogWithSlug(slug)
			setBlogData(res.data)
		}
		dataBlog()
	}, [slug])

	if (!blog) {
		return <p>Blog post not found</p>
	}

	// Handle opening the edit modal
	const handleEditClick = optionId => {
		setEditingOptionId(optionId)
		// Initialize editedData with the current data of the option
		const optionToEdit = blog.option.find(optio => optio.id === optionId)
		setEditedData(optionToEdit)
		setIsModalVisible(true) // Open the modal
	}

	const handleDeleteClick = async id => {
		try {
			const deleteData = {
				id: blog.id, // Blog ID
				option: [
					{
						id: id, // Option ID to delete
					},
				],
			}

			const res = await updateBlog(deleteData) // Call the updateBlog function with the constructed deleteData
			console.log('Option deleted:', res)
			// Optionally, you could refresh the blog data here after successful deletion
			const updatedBlog = await getBlogWithSlug(slug)
			setBlogData(updatedBlog.data)
		} catch (error) {
			console.error('Error deleting option:', error)
		}
	}

	// Handle canceling the edit
	const handleCancel = () => {
		setIsModalVisible(false) // Close modal without saving
		setEditedData({})
	}

	return (
		<div className='bg-[#F8F8F8] 3xl:flex 3xl:flex-row 3xl:px-[30px]'>
			<div className='bg-white rounded-[30px] py-[24px] px-[16px] mdl:py-[40px] mdl:px-[20px] 3xl:mt-[70px] 3xl:flex 3xl:flex-col 3xl:w-[80%] 3xl:px-[138px] 3xl:py-[70px] mb-[60px] 3xl:mb-[120px]'>
				{blog.option && blog.option.length > 0 ? (
					blog.option.map(optio => (
						<div key={optio.id} className='mb-8'>
							<div>
								{/* Render the title */}
								<p className='text-[23px] font-bold mdl:text-[40px] 3xl:text-[45px] text-titleDark'>
									{optio.title && optio.title[lng]}
								</p>

								{/* Render the image only if it exists */}
								{optio.photo && optio.photo.url && (
									<div className='mt-[15px] mdl:mt-[40px]'>
										<Image
											width={1117}
											height={635}
											quality={100}
											src={optio.photo.url}
											alt='Blog Image'
											className='object-contain rounded-[20px] 2xl:rounded-[40px]'
										/>
									</div>
								)}

								{/* Render the description, handling '\n' */}
								{optio.description && optio.description[lng] ? (
									optio.description[lng]
										.split('\n')
										.map((descParagraph, idx) => (
											<p
												key={idx}
												className='text-[15px] mdl:text-[20px] 3xl:text-[22px] text-[#454545] font-medium mt-4 font-robotoFlex'
											>
												{descParagraph}
											</p>
										))
								) : (
									<p>Описание отсутствует</p>
								)}

								{/* Render the blog text, handling bold markers '**' */}
								<div className='text-[15px] mdl:text-[20px] 3xl:text-[22px] text-[#454545] font-medium mt-4 font-robotoFlex'>
									{optio.text &&
										optio.text.split('\n').map((paragraph, idx) => {
											if (paragraph.includes('**')) {
												const parts = paragraph.split('**')
												return (
													<p key={idx} className='mt-4'>
														{parts.map((part, index) =>
															index % 2 === 1 ? (
																<strong
																	key={index}
																	className='font-semibold text-titleDark 3xl:text-[25px]'
																>
																	{part.trim()}
																</strong>
															) : (
																<span key={index}>{part}</span>
															)
														)}
													</p>
												)
											}
											return (
												<p key={idx} className='mt-4'>
													{paragraph}
												</p>
											)
										})}
								</div>

								{/* Edit button */}
								<div className='flex flex-row gap-[20px]'>
									<button
										onClick={() => handleEditClick(optio.id)}
										className='mt-4 bg-violet100 text-white rounded-full py-[15px] px-[20px] font-bold'
									>
										Редактировать
									</button>
									<button
										onClick={() => handleDeleteClick(optio.id)}
										className='mt-4 bg-white100 border border-violet100 text-violet100 rounded-full py-[15px] px-[20px] font-bold'
									>
										Удалить блок
									</button>
								</div>
							</div>
						</div>
					))
				) : (
					<p>Blog post not found</p>
				)}

				<button
					onClick={openModal}
					className='border border-dashed border-violet100 w-full h-[150px] flex items-center justify-center rounded-[20px] gap-[8px]'
				>
					<div className='flex items-center justify-center text-violet100'>
						<p className='text-[25px] font-semibold'>Добавить блок</p>
						<IoAdd size={40} />
					</div>
				</button>
			</div>

			<div className='3xl:w-[40%] 3xl:mt-[70px] mb-[60px] 3xl:mb-[120px] order-[-1]'>
				<SimilarNews />
			</div>

			{/* EditBlog Modal for editing the selected blog option */}
			<EditBlog
				visible={isModalVisible}
				isCloseCreateModal={handleCancel}
				blogID={blog.id}
				optionID={editingOptionId}
				titleData={editedData.title}
				descriptionData={editedData.description}
				orderNumData={editedData.orderNum}
				imageURL={editedData.photo?.url}
				imageID={editedData.photo?.id} // Pass the image ID if needed
			/>
			<BlogOptionCreate blogID={blog.id} open={modal} close={openModal} />
		</div>
	)
}

export default MainBlogItem

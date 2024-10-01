'use client'
import { useState } from 'react'
import Image from 'next/image'
import { BlogCreateModal } from '../../Create/blog/blog.create'
import { createBlog } from '@/app/[lng]/lib/api/create.api'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { SimilarEditModal } from '../../Edit/blog/similar.edit'

const truncateTitle = (title, maxLength) => {
	if (title.length > maxLength) {
		return title.slice(0, maxLength) + '...' // Truncate and add ellipsis
	}
	return title
}

const SimilarNews = () => {
	const [newBlog, setNewBlogMultiple] = useState([]) // Initialize with an empty array
	const [open, setOpenModal] = useState(false)
	const [loading, setLoading] = useState(false) // Track loading state
	const [editModal, setEditModal] = useState(false)
	const [currentEditBlog, setCurrentEditBlog] = useState(null) // Track blog being edited

	// Toggle the state for the edit modal and set the current blog to be edited
	const handleEditBlog = blogData => {
		setCurrentEditBlog(blogData) // Pass the blog data to the modal
		setEditModal(true) // Open the modal
	}

	// Function to update the blog after editing
	const updateBlogInState = updatedBlog => {
		setNewBlogMultiple(prevBlog =>
			prevBlog.map(
				blog => (blog.id === updatedBlog.id ? updatedBlog : blog) // Replace the edited blog
			)
		)
		setEditModal(false) // Close the modal
	}

	const addNewBlog = blogData => {
		setNewBlogMultiple(prevBlog => [...prevBlog, blogData]) // Append new blog
	}

	const handleDeleteBlog = index => {
		setNewBlogMultiple(prevBlog => prevBlog.filter((blog, i) => i !== index)) // Remove blog by index
	}

	const showModalState = () => setOpenModal(!open)
	const displayBlogData = Array.isArray(newBlog) ? newBlog : [newBlog]

	const createBlogsSequentially = async (index = 0) => {
		if (index >= newBlog.length) {
			setNewBlogMultiple([])
			toastr.success('Все блоги успешно созданы!')
			return
		}

		setLoading(true) // Start loading
		try {
			// Prepare FormData
			const formData = new FormData()

			// Create the 'json' payload excluding the photo
			const blogCopy = { ...newBlog[index], orderNum: index }

			// Explicitly set the 'main' and 'active' fields to either true or false
			blogCopy.main = blogCopy.main ?? false // Default to 'false' if null/undefined
			blogCopy.active = blogCopy.active ?? true // Default to 'true' if null/undefined
			blogCopy.option = blogCopy.option.map((option, idx) => {
				const { photo, ...rest } = option // Exclude 'photo' from the option
				rest.orderNum = idx // Set the correct order for each option
				return rest
			})

			// Append the 'json' part to FormData
			formData.append('json', JSON.stringify(blogCopy))

			// Append the photos to FormData
			newBlog[index].option.forEach((option, idx) => {
				if (option.photo instanceof File) {
					formData.append(`photo`, option.photo) // Add the photo corresponding to the option
				}
			})

			// Send FormData to the createBlog API
			const response = await createBlog(formData)
			// Check if the response is successful
			if (response.message === 'Blog succesfully created') {
				toastr.success(`Блог ${index + 1} успешно создан!`)
				handleDeleteBlog(index) // Remove blog from state after successful creation
			} else {
				throw new Error(response.data.message || 'Не удалось создать блог')
			}

			// Call the function recursively to create the next blog
			await createBlogsSequentially(index + 1) // Increment the index
		} catch (error) {
			toastr.error(`Не удалось создать блог ${index + 1}: ${error.message}`)
		} finally {
			setLoading(false) // End loading
		}
	}

	return (
		<div className='bg-white py-[30px] px-[20px] rounded-[30px] mx-[16px] mdl:py-[50px] flex flex-col justify-between relative min-h-[100vh]'>
			<div className='flex flex-col gap-6'>
				{displayBlogData?.map((news, index) => (
					<div
						key={index}
						className='border-b-[1px] border-[#F0F0F0] pb-[25px] flex flex-row'
					>
						<div className='rounded-md flex flex-col items-center'>
							<div className='flex flex-row items-center justify-between'>
								<div className='w-[100px] h-[100px] rounded-[25px] flex items-center justify-center'>
									{news.option[0]?.photo ? (
										<Image
											src={URL.createObjectURL(news.option[0]?.photo)}
											width={100}
											height={100}
											quality={100}
											alt='blog image'
											className='object-contain'
										/>
									) : (
										<span>No Image</span>
									)}
								</div>

								<div className='flex flex-col w-[70%]'>
									<h3 className='text-[#010101] text-[18px] font-bold mb-[12px]'>
										{truncateTitle(news?.option?.[0]?.title?.ru || '', 40)}{' '}
									</h3>
									<div className='flex flex-row gap-[12px] w-full items-center'>
										<button
											onClick={() => handleEditBlog(news)}
											className='text-[#7B72EB] text-[14px] font-bold flex items-center mdl:text-[16px]'
										>
											Редактировать
										</button>
										<div className='h-[19px] w-[1px] bg-violet100' />
										<button
											onClick={() => handleDeleteBlog(index)} // Call handleDeleteBlog on click
											className='text-[#7B72EB] text-[14px] font-medium flex items-center mdl:text-[16px]'
										>
											Удалить
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Pass the addNewBlog function to BlogCreateModal */}
			<BlogCreateModal
				open={open}
				close={showModalState}
				setNewBlogMultiple={addNewBlog}
			/>

			{/* Edit modal, only open when editModal state is true */}
			{currentEditBlog && (
				<SimilarEditModal
					isVisible={editModal}
					onClose={() => setEditModal(false)} // Close modal without changes
					initialBlog={currentEditBlog} // Pass full blog data to modal
					updateBlog={updateBlogInState} // Function to update the blog in the parent state
				/>
			)}

			{/* Centered Buttons */}
			<div className='absolute left-1/2 transform -translate-x-1/2 bottom-[20px] flex flex-col items-center w-[100%] pt-[20px] border-t border-[#F0F0F0]'>
				<button
					disabled={loading} // Disable while loading
					onClick={() => createBlogsSequentially()}
					className={`rounded-full py-[20px] px-[30px] text-white ${
						loading ? 'bg-gray-500' : 'bg-violet100'
					} w-[80%] mx-auto mb-2 font-bold text-[18px]`}
				>
					{loading ? 'Creating...' : 'Выгрузить новости'}
				</button>
				<button
					onClick={showModalState}
					className='rounded-full py-[20px] px-[30px] text-violet100 border border-violet100 bg-white100 w-[80%] mx-auto font-bold text-[18px]'
				>
					Добавить новость
				</button>
			</div>
		</div>
	)
}

export default SimilarNews

'use client'
import { useState, useEffect } from 'react'
import { Modal, Upload } from 'antd'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { IoClose } from 'react-icons/io5'
import { IoIosAddCircleOutline } from 'react-icons/io'

export const SimilarEditModal = ({
	isVisible, // Controls modal visibility
	onClose, // Callback to close the modal
	initialBlog, // The full blog data
	updateBlog, // Function to update the parent state
}) => {
	const [currentLang, setCurrentLang] = useState('ru') // Language switcher
	const [fileList, setFileList] = useState([]) // Image file list state
	const [editData, setEditData] = useState({ option: [], relatedId: [] }) // Initialize with option array

	useEffect(() => {
		// Initialize the form data with passed blog data
		if (initialBlog) {
			setEditData({
				option: initialBlog.option.map(opt => ({
					title: opt.title || { uz: '', ru: '', en: '' },
					text: opt.text || { uz: '', ru: '', en: '' },
					photo: opt.photo || null,
					orderNum: opt.orderNum || 0,
				})),
				relatedId: initialBlog.relatedId || [],
			})

			// Set the file list with existing images if available
			const initialFileList = initialBlog.option.map(opt => ({
				uid: opt.photo?.id || '-1',
				name: 'Existing Image',
				status: 'done',
				url: opt.photo ? URL.createObjectURL(opt.photo) : null,
			}))
			setFileList(initialFileList)
		}
	}, [initialBlog])

	const handleLangSwitch = lang => setCurrentLang(lang)

	const handleTitleChange = (e, index) => {
		const updatedOption = [...editData.option]
		updatedOption[index].title[currentLang] = e.target.value
		setEditData({ ...editData, option: updatedOption })
	}

	const handleTextChange = (e, index) => {
		const updatedOption = [...editData.option]
		updatedOption[index].text[currentLang] = e.target.value
		setEditData({ ...editData, option: updatedOption })
	}

	const handleUploadChange = (info, index) => {
		const updatedOption = [...editData.option]
		updatedOption[index].photo = info.file
		setEditData({ ...editData, option: updatedOption })
	}

	const handleRemoveImage = index => {
		const updatedOption = [...editData.option]
		updatedOption[index].photo = null // Remove the photo
		setEditData({ ...editData, option: updatedOption })
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const updatedBlog = {
			...initialBlog,
			option: editData.option,
			relatedId: editData.relatedId,
		}

		try {
			// Simulate API call (you can replace this with the actual API call)
			updateBlog(updatedBlog)
			toastr.success('Блог успешно обновлен!')
			onClose() // Close modal
		} catch (error) {
			toastr.error('Не удалось обновить блог.')
		}
	}

	return (
		<Modal
			title={
				<span style={{ fontSize: '30px', fontWeight: 'bold' }}>
					Редактировать Блог
				</span>
			}
			open={isVisible}
			onCancel={onClose}
			footer={null}
			width={1000}
			closeIcon={<IoClose size={30} />}
		>
			<form onSubmit={handleSubmit}>
				<div className='flex gap-2 mb-4'>
					{['ru', 'uz', 'en'].map(lang => (
						<button
							key={lang}
							type='button'
							className={`px-4 py-2 rounded-lg ${
								currentLang === lang ? 'bg-violet100 text-white' : 'bg-gray-200'
							}`}
							onClick={() => handleLangSwitch(lang)}
						>
							{lang.toUpperCase()}
						</button>
					))}
				</div>

				{editData.option.map((option, index) => (
					<div key={index} className='option-block mb-4 p-4 border rounded-lg'>
						<div className='flex flex-col'>
							<label className='text-[#A6A6A6] font-medium'>
								Заголовок статьи ({currentLang.toUpperCase()})
							</label>
							<input
								value={option.title[currentLang]}
								onChange={e => handleTitleChange(e, index)}
								required
								className='mt-[10px] rounded-[20px] border border-[#F0F0F0]'
							/>
						</div>

						<div className='flex flex-col'>
							<label className='text-[#A6A6A6] font-medium'>
								Текст ({currentLang.toUpperCase()})
							</label>
							<textarea
								value={option.text[currentLang]}
								onChange={e => handleTextChange(e, index)}
								required
								className='mt-[10px] rounded-[20px] border border-[#F0F0F0]'
							/>
						</div>

						<Upload
							name='photo'
							listType='picture-card'
							beforeUpload={() => false}
							onChange={info => handleUploadChange(info, index)}
							showUploadList={false}
							className='mt-[10px]'
						>
							{option.photo ? (
								<img
									src={URL.createObjectURL(option.photo)}
									alt='option'
									style={{ width: '100px' }}
								/>
							) : (
								<div className='w-[40px] h-[40px] flex items-center justify-center'>
									<IoIosAddCircleOutline className='text-violet100' size={50} />
								</div>
							)}
						</Upload>

						<button
							type='button'
							className='mt-[10px] text-red-500 flex items-center gap-2'
							onClick={() => handleRemoveImage(index)}
						>
							<IoClose size={24} />
							Удалить изображение
						</button>
					</div>
				))}

				<div className='w-full flex justify-end mt-4'>
					<button
						type='submit'
						className='w-[30%] py-[20px] px-[30px] bg-violet100 text-white rounded-full font-bold'
					>
						Сохранить
					</button>
				</div>
			</form>
		</Modal>
	)
}

import { useState } from 'react'
import { Modal, Input, Button, Upload } from 'antd'
import { FiPlus } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import { updateBlog } from '@/app/[lng]/lib/api/edit.api'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
export const BlogOptionCreate = ({ close, open, blogID }) => {
	const [currentLang, setCurrentLang] = useState('ru')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [blogData, setBlogData] = useState({
		option: [
			{
				title: { uz: '', ru: '', en: '' },
				description: { uz: '', ru: '', en: '' },
				photo: { url: '' },
				orderNum: 0,
			},
		],
	})

	const handleInputChange = (e, index, field) => {
		const updatedOption = [...blogData.option]
		updatedOption[index][field][currentLang] = e.target.value
		setBlogData({ ...blogData, option: updatedOption })
	}

	const handlePhotoUpload = (info, index) => {
		const updatedOption = [...blogData.option]
		if (info.file) {
			// Only set the URL and let the server assign the ID
			updatedOption[index].photo = { url: URL.createObjectURL(info.file) }
		}
		setBlogData({ ...blogData, option: updatedOption })
	}

	const handleAddOption = () => {
		setBlogData(prevData => ({
			...prevData,
			option: [
				...prevData.option,
				{
					title: { uz: '', ru: '', en: '' },
					description: { uz: '', ru: '', en: '' },
					photo: { url: '' },
					orderNum: 0,
				},
			],
		}))
	}

	const handleRemoveOption = index => {
		const updatedOption = blogData.option.filter((_, i) => i !== index)
		setBlogData({ ...blogData, option: updatedOption })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		// Check if blogID is provided
		if (!blogID) {
			setError('Blog ID is required.')
			toastr.error('Blog ID is missing.')
			setLoading(false)
			return
		}

		try {
			const jsonData = {
				id: blogID,
				option: blogData.option.map((option, index) => ({
					title: option.title,
					description: option.description,
					orderNum: index,
					//   photo: { url: option.photo.url }  // Only pass the photo URL
				})),
			}

			await updateBlog(jsonData) // Send JSON data only
			toastr.success('Blog created successfully')
			close() // Close modal after success
		} catch (error) {
			toastr.error('Error creating blog')
			setError(error.message)
			console.error('Submission error:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Modal
			title='Create new option'
			open={open}
			onCancel={close}
			footer={null}
			width={800}
		>
			<form onSubmit={handleSubmit}>
				<div className='language-switcher flex gap-2 mb-4'>
					{['ru', 'uz', 'en'].map(lang => (
						<button
							key={lang}
							type='button'
							className={`px-4 py-2 rounded-lg ${
								currentLang === lang ? 'bg-violet100 text-white' : 'bg-gray-200'
							}`}
							onClick={() => setCurrentLang(lang)}
						>
							{lang.toUpperCase()}
						</button>
					))}
				</div>

				{blogData.option.map((option, index) => (
					<div key={index} className='option-block mb-4 p-4 rounded-lg'>
						<div className='flex flex-col gap-4 mb-2'>
							<div className='flex flex-col'>
								<label className='text-[#A6A6A6] text-[15px] font-medium'>
									Заголовок статьи ({currentLang.toUpperCase()})
								</label>
								<input
									value={option.title[currentLang]}
									onChange={e => handleInputChange(e, index, 'title')}
									required
									className='mt-[10px] rounded-[10px] border border-[#F0F0F0]'
								/>
							</div>

							<div>
								<label className='text-[#A6A6A6] text-[15px] font-medium'>
									Текст ({currentLang.toUpperCase()})
								</label>
								<Input.TextArea
									value={option.description[currentLang]}
									onChange={e => handleInputChange(e, index, 'description')}
									required
									className='mt-[10px]'
								/>
							</div>
						</div>

						<div className='flex flex-col border border-[#F0F0F0] rounded-[20px] gap-2 p-[20px] w-[60%]'>
							<label
								htmlFor='photo'
								className='text-titleDark text-[18px] font-semibold'
							>
								Изображение
							</label>
							<Upload
								name='photo'
								listType='picture-card'
								beforeUpload={() => false}
								onChange={info => handlePhotoUpload(info, index)}
								showUploadList={false}
							>
								{option.photo.url ? (
									<img
										src={option.photo.url}
										alt='option'
										style={{ width: '100px' }}
									/>
								) : (
									<div className='w-[40px] h-[40px] flex items-center justify-center'>
										<FiPlus className='text-violet100 w-full h-full' />
									</div>
								)}
							</Upload>
							{option.photo.url && (
								<MdDeleteForever
									size={24}
									className='text-red-600 cursor-pointer'
									onClick={() => handlePhotoUpload({ file: null }, index)}
								/>
							)}
						</div>

						{blogData.option.length > 1 && (
							<Button type='danger' onClick={() => handleRemoveOption(index)}>
								Remove Option
							</Button>
						)}
					</div>
				))}

				<Button type='dashed' onClick={handleAddOption} className='w-full mb-4'>
					<FiPlus /> Add Option
				</Button>

				{error && <p className='text-red-500'>{error}</p>}

				<div className='flex justify-end items-center'>
					<button
						type='submit'
						loading={loading}
						className='w-[20%] mt-4 py-[15px] rounded-full px-[20px] bg-violet100 text-white font-bold'
					>
						{loading ? 'Сохраняется' : 'Сохранить'}
					</button>
				</div>
			</form>
		</Modal>
	)
}

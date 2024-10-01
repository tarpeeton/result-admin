import { useState } from 'react'
import { Modal, Input, Button, Upload } from 'antd'
import { MdDeleteForever } from 'react-icons/md'
import { createBlog } from '../../../lib/api/create.api'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { lang } from '../../constants/langugaes'
import { IoIosAddCircleOutline } from 'react-icons/io'

import { IoClose } from 'react-icons/io5'

export const BlogCreateModal = ({ close, open }) => {
	const [currentLang, setCurrentLang] = useState('ru')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const [blogData, setBlogData] = useState({
		option: [
			{
				title: { uz: '', ru: '', en: '' },
				text: { uz: '', ru: '', en: '' },
				photo: null,
				orderNum: 0,
			},
		],
		relatedId: [],
	})

	const handleInputChange = (e, index, field) => {
		const updatedoption = [...blogData.option]
		updatedoption[index][field][currentLang] = e.target.value
		setBlogData({ ...blogData, option: updatedoption })
	}

	const handlePhotoUpload = (info, index) => {
		const updatedoption = [...blogData.option]
		updatedoption[index].photo = info.file
		setBlogData({ ...blogData, option: updatedoption })
	}

	const handleAddOption = () => {
		setBlogData(prevData => ({
			...prevData,
			option: [
				...prevData.option,
				{
					title: { uz: '', ru: '', en: '' },
					text: { uz: '', ru: '', en: '' },
					photo: null,
					orderNum: 0,
				},
			],
		}))
	}

	const handleRemoveOption = index => {
		const updatedoption = blogData.option.filter((_, i) => i !== index)
		setBlogData({ ...blogData, option: updatedoption })
	}

	const handleRelatedIdChange = e => {
		const ids = e.target.value.split(',').map(id => Number(id.trim()))
		setBlogData({ ...blogData, relatedId: ids })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		setError(null) // Reset error state before submission

		try {
			const jsonData = {
				option: blogData.option.map((option, index) => ({
					title: option.title,
					text: option.text,
					orderNum: index,
				})),
				relatedId: blogData.relatedId.length > 0 ? blogData.relatedId : [0],
				main: true,
				active: true,
			}

			const formData = new FormData()
			formData.append('json', JSON.stringify(jsonData))

			blogData.option.forEach(option => {
				if (option.photo instanceof File) {
					formData.append('photo', option.photo)
				}
			})

			await createBlog(formData)
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
			open={open}
			onCancel={close}
			footer={null}
			width={800}
			title={
				<span style={{ fontSize: '30px', fontWeight: 'bold' }}>
					Редактировать Блог
				</span>
			}
			closeIcon={<IoClose size={30} />}
		>
			<form onSubmit={handleSubmit}>
				<div className='language-switcher flex gap-2 mb-4'>
					{lang.map(lang => (
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
					<div key={index} className='option-block mb-4 p-4 border rounded-lg'>
						<div className='flex gap-4 mb-2 flex-col'>
							<div className='flex flex-col'>
								<label>Title ({currentLang.toUpperCase()})</label>
								<input
									value={option.title[currentLang]}
									onChange={e => handleInputChange(e, index, 'title')}
									required
									className='mt-[10px]  rounded-[20px] border border-[#F0F0F0]'
								/>
							</div>

							<div className='flex flex-col'>
								<label>Text ({currentLang.toUpperCase()})</label>
								<textarea
									value={option.text[currentLang]}
									onChange={e => handleInputChange(e, index, 'text')}
									required
									className='mt-[10px] rounded-[20px] border border-[#F0F0F0]'
								/>
							</div>
						</div>

						<div className='flex flex-col '>
							<label className='text-[18px] font-montserrat font-semibold text-[#000]'>
								Изображение
							</label>
							<Upload
								name='photo'
								listType='picture-card'
								beforeUpload={() => false}
								onChange={info => handlePhotoUpload(info, index)}
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
										<IoIosAddCircleOutline
											className='text-violet100'
											size={50}
										/>
									</div>
								)}
							</Upload>
							{option.photo && (
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

				<div className='mb-4'>
					<label>Related ID</label>
					<Input
						placeholder='Enter related IDs (e.g., 1, 2, 3)'
						onChange={handleRelatedIdChange}
					/>
				</div>

				<div></div>
				<button
					type='dashed'
					onClick={handleAddOption}
					className='w-[30%] mb-4'
				>
					Добавить Опции
				</button>

				{error && <p className='text-red-500'>{error}</p>}

				<Button
					htmlType='submit'
					loading={loading}
					className='w-full mt-4 py-2 px-4 bg-violet100 text-white'
				>
					{loading ? 'сохраняется' : 'Сохранить'}
				</Button>
			</form>
		</Modal>
	)
}

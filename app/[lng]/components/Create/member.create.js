'use client'
import { useState } from 'react'
import { Modal, Button, Switch, Upload } from 'antd'
import { createMembers } from '../../lib/api/create.api'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css' // Import Toastr CSS
import { UploadOutlined } from '@ant-design/icons'
import { MdDelete } from 'react-icons/md' // Import the delete icon
export const CreateMember = ({ isCloseCreateModal, visible }) => {
	const [currentLang, setCurrentLang] = useState('ru') // State for the current selected language

	// Initial state for the member object
	const [member, setMember] = useState({
		fullName: { uz: '', ru: '', en: '' },
		position: { uz: '', ru: '', en: '' },
		active: true, // Member active status
		photo: null, // File upload field
	})

	const [errors, setErrors] = useState({
		fullName: { uz: false, ru: false, en: false },
		position: { uz: false, ru: false, en: false },
	})

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [fileList, setFileList] = useState([])

	// Handles switching between languages in the UI
	const handleLangSwitch = lang => {
		setCurrentLang(lang) // Update the current language selection
	}

	// Handle input changes for the fields based on the current language
	const handleChange = (e, field) => {
		setMember({
			...member,
			[field]: { ...member[field], [currentLang]: e.target.value },
		})

		// Validate input fields for errors
		if (e.target.value.trim() === '') {
			setErrors({
				...errors,
				[field]: { ...errors[field], [currentLang]: true },
			})
		} else {
			setErrors({
				...errors,
				[field]: { ...errors[field], [currentLang]: false },
			})
		}
	}

	// Handle the switch toggle for active status
	const handleActiveChange = checked => {
		setMember({ ...member, active: checked })
	}

	// Handle file upload
	const handleFileUpload = ({ fileList }) => {
		setFileList(fileList)
		setMember({ ...member, photo: fileList[0]?.originFileObj || null })
	}
	// Remove file handler
	const handleRemoveFile = () => {
		setFileList([])
		setMember({ ...member, photo: null })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)

		// Prepare the JSON data object
		const jsonData = {
			fullName: {
				uz: member.fullName.uz,
				ru: member.fullName.ru,
				en: member.fullName.en,
			},
			position: {
				uz: member.position.uz,
				ru: member.position.ru,
				en: member.position.en,
			},
			active: member.active,
		}

		// Prepare form data
		const formData = new FormData()
		formData.append('json', JSON.stringify(jsonData)) // Append 'json' part as a stringified object
		if (member.photo) {
			formData.append('photo', member.photo) // Append the file if it exists
		}

		try {
			await createMembers(formData) // Send the member data to the server
			toastr.success('Член успешно создан!') // Show success notification
			isCloseCreateModal() // Close modal after success
			setFileList([]) // Clear the file list
			setMember({
				fullName: { uz: '', ru: '', en: '' },
				position: { uz: '', ru: '', en: '' },
				active: true,
				photo: null,
			}) // Reset the form
		} catch (error) {
			setError('Не удалось создать члена. Попробуйте еще раз.') // Show error notification
		} finally {
			setLoading(false)
		}
	}

	// Function to manage dynamic input class based on error state
	const inputClass = field => {
		return `${errors[field][currentLang] ? 'border-red-500' : ''}`
	}

	return (
		<Modal
			title={<span className='text-[18px] font-bold'>Добавить Член</span>}
			visible={visible}
			onCancel={isCloseCreateModal}
			footer={null}
			width={900}
		>
			<form onSubmit={handleSubmit}>
				{/* Custom Language Switcher */}
				<div className='flex gap-2 mb-4'>
					<button
						type='button'
						className={`px-4 py-2 rounded-lg ${
							currentLang === 'ru' ? 'bg-violet100 text-white' : 'bg-gray-200'
						}`}
						onClick={() => handleLangSwitch('ru')}
					>
						RU
					</button>
					<button
						type='button'
						className={`px-4 py-2 rounded-lg ${
							currentLang === 'uz' ? 'bg-violet100 text-white' : 'bg-gray-200'
						}`}
						onClick={() => handleLangSwitch('uz')}
					>
						UZ
					</button>
					<button
						type='button'
						className={`px-4 py-2 rounded-lg ${
							currentLang === 'en' ? 'bg-violet100 text-white' : 'bg-gray-200'
						}`}
						onClick={() => handleLangSwitch('en')}
					>
						EN
					</button>
				</div>

				{/* Full Name Input Field */}
				<div className='flex flex-col gap-[10px]'>
					<label className='text-[16px] font-medium text-[#A6A6A6]'>Полное имя</label>
					<input
						value={member.fullName[currentLang]}
						onChange={e => handleChange(e, 'fullName')}
						className={inputClass('fullName')}
						required
						className='p-[20px] rounded-[10px] text-[18px] border border-[#F0F0F0] outline-none text-titleDark'
					/>
				</div>

				{/* Position Input Field */}
				<div className='flex flex-col gap-[10px] mt-4'>
					<label className='text-[16px] font-medium text-[#A6A6A6]'>Должность</label>
					<input
						value={member.position[currentLang]}
						onChange={e => handleChange(e, 'position')}
						className={inputClass('position')}
						required
						className='p-[20px] rounded-[10px] text-[18px] border border-[#F0F0F0] outline-none text-titleDark'
					/>
				</div>

				{/* Main Toggle Field */}
				<div className='mt-4'>
					<label className='text-[16px] font-medium text-[#A6A6A6]'>
						Активен?
					</label>
					<Switch
						checked={member.active}
						onChange={handleActiveChange}
						className='ml-2 bg-violet100'
					/>
				</div>

				{/* File Upload Field */}
				<div className='flex flex-col gap-[10px] mt-4 relative'>
					<label className='text-[16px] font-medium text-[#A6A6A6]'>Фото</label>
					<Upload
						name='photo'
						listType='picture-card'
						showUploadList={false}
						beforeUpload={() => false} // Disable automatic upload
						onChange={handleFileUpload}
						className='relative overflow-hidden'
					>
						{fileList.length > 0 ? (
							<div>
								<img
									src={URL.createObjectURL(
										fileList[0].originFileObj || fileList[0]
									)}
									alt='photo'
									className='w-full h-full object-cover'
								/>
								<Button
									danger
									onClick={handleRemoveFile}
									className='mt-[10px] absolute right-[10px] top-[10px] rounded-full py-[15px] px-[10px]'
								>
									<MdDelete className='text-red-500' />
								</Button>
							</div>
						) : (
							<div className='flex items-center justify-center h-[100px]'>
								<UploadOutlined className='text-violet100 text-[40px]' />
							</div>
						)}
					</Upload>
				</div>

				{/* Error Handling */}
				{error && <p className='text-red-500 mt-[10px]'>{error}</p>}

				{/* Submit Button */}
				<div className='w-full flex flex-row justify-end'>
					<Button
						htmlType='submit'
						loading={loading}
						className='w-[30%] mt-[12px] flex py-[20px] px-[25px] rounded-full bg-violet100 text-white font-bold'
					>
						{loading ? 'сохраняется..' : 'Сохранить'}
					</Button>
				</div>
			</form>
		</Modal>
	)
}

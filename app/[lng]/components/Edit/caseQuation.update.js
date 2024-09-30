'use client'
import { useState, useEffect } from 'react'
import { Modal, Button } from 'antd'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { updateQuestionUpdate } from '../../lib/api/update.api'
import { IoIosClose } from "react-icons/io";
import { useRouter } from 'next/navigation';
	

export const EditQuestion = ({
	isCloseCreateModal,
	visible,
	questionID,
	queryData,
	description,
}) => {
	const [currentLang, setCurrentLang] = useState('ru')
	const router = useRouter()
	const [editMemberData, setEditMemberData] = useState({
		id: questionID,
		query: [],
		description: {
			uz: '',
			ru: '',
			en: '',
		},
	})

	const languages = [
		{ code: 'ru', label: 'RU' },
		{ code: 'uz', label: 'UZ' },
		{ code: 'en', label: 'EN' },
	]

	// Fetch existing question data when the modal opens
	useEffect(() => {
		if (questionID && queryData) {
			// Initialize with the provided queryData and description
			setEditMemberData({
				id: questionID,
				query: queryData.map(q => ({
					uz: q.uz || '',
					ru: q.ru || '',
					en: q.en || '',
				})),
				description: {
					uz: description.uz || '',
					ru: description.ru || '',
					en: description.en || '',
				},
			})
		}
	}, [questionID, queryData, description])

	// Switch between different languages
	const handleLangSwitch = lang => {
		setCurrentLang(lang)
	}

	// Handle input changes for queries dynamically based on the current language
	const handleChange = (e, index) => {
		const updatedQuery = [...editMemberData.query]
		updatedQuery[index][currentLang] = e.target.value // Update the specific field for the current language
		setEditMemberData({ ...editMemberData, query: updatedQuery })
	}

	// Handle description input change for all three languages
	const handleDescriptionChange = (e, lang) => {
		setEditMemberData({
			...editMemberData,
			description: {
				...editMemberData.description,
				[lang]: e.target.value,
			},
		})
	}

	// Add a new query
	const handleAddQuery = () => {
		const newQuery = {
			uz: '',
			ru: '',
			en: '',
		}
		setEditMemberData({
			...editMemberData,
			query: [...editMemberData.query, newQuery],
		})
	}

	// Delete a query by index
	const handleDeleteQuery = index => {
		const updatedQuery = editMemberData.query.filter((_, i) => i !== index)
		setEditMemberData({ ...editMemberData, query: updatedQuery })
	}

	// Submit updated data
	const handleSubmit = async e => {
		e.preventDefault()

		const jsonData = {
			id: editMemberData.id,
			query: editMemberData.query.map(q => ({
				uz: q.uz,
				ru: q.ru,
				en: q.en,
			})),
			queryDescription: editMemberData.description, // Include updated description for all languages
		}

		try {
			// Call the updateQuestionUpdate function to update the question details
			await updateQuestionUpdate(jsonData)
			toastr.success('Вопрос успешно обновлен!')
			isCloseCreateModal()
			router.refresh()
		} catch (error) {
			toastr.error('Не удалось обновить вопрос.')
		}
	}
	return (
		<Modal
		title={<span style={{ fontSize: '30px', fontWeight: 'bold' }}>Редактировать Запросы</span>}
			open={visible}
			onCancel={isCloseCreateModal}
			footer={null}
			width={1000}
		>
			<form onSubmit={handleSubmit}>
				<div className='flex gap-2 mb-4 mt-[20px]'>
					{languages.map(lang => (
						<button
							key={lang.code}
							type='button'
							className={`px-4 py-2 rounded-lg ${currentLang === lang.code ? 'bg-violet100 text-white' : 'bg-gray-200'}`}
							onClick={() => handleLangSwitch(lang.code)}
						>
							{lang.label}
						</button>
					))}
				</div>

				{editMemberData.query.map((q, index) => (
					<div key={index} className='flex flex-col gap-[10px] mt-4 relative'>
						<label className='text-[16px] font-medium text-[#A6A6A6]'>Вопрос</label>
						
						<div className='relative w-[100%]'>
							<input
								value={q[currentLang]}
								onChange={e => handleChange(e, index)} // Pass only index
								className='p-[15px] w-full border border-[#F0F0F0] rounded-[10px] h-full text-[18px] text-titleDark pr-[40px] outline-violet100' // Added padding to the right for the delete icon
							/>
							<button
								type='button'
								onClick={() => handleDeleteQuery(index)} // Delete button inside the input field
								className='absolute top-[50%] right-[10px] transform -translate-y-[50%] text-[#A6A6A6]'
							>
								<IoIosClose size={24} />
							</button>
						</div>
					</div>
				))}

				<div className='flex flex-col gap-[10px] mt-4'>
					<label className='text-[16px] font-medium text-[#A6A6A6]'>Описание</label>
					<textarea
						value={editMemberData.description[currentLang]}
						onChange={e => handleDescriptionChange(e, currentLang)} // Handle description change
						required
						className='p-[20px] border border-[#F0F0F0] outline-violet100'
					/>
				</div>

				<div className='w-full flex flex-row justify-end mt-4 items-center'>
					<button
						type='button'
						onClick={handleAddQuery}
						className='bg-violet100 rounded-full text-white mr-2 mt-4 py-[20px] px-[30px] font-bold font-montserrat '
					>
						Добавить Вопрос
					</button>
					<button
						type='submit'
						className='w-[30%] mt-4 py-[20px] px-[30px] bg-violet100 text-white rounded-full font-bold font-montserrat'
					>
						Сохранить
					</button>
				</div>
			</form>
		</Modal>
	)
}

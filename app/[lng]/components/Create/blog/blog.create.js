import { useState } from 'react'
import { Modal, Upload } from 'antd'
import { MdDeleteForever } from 'react-icons/md'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { lang } from '../../constants/langugaes'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'

export const BlogCreateModal = ({ close, open, setNewBlogMultiple }) => {
	const [currentLang, setCurrentLang] = useState('ru')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [blogData, setBlogData] = useState({
		option: [
			{
				title: { uz: '', ru: '', en: '' },
				text: { uz: '', ru: '', en: '' }, // Using 'text' instead of 'description'
				photo: null,
				orderNum: 0,
			},
		],
		main: true, // Always true
		active: true, // Always true
		relatedId: [], // Related IDs
	})

	const handleInputChange = (e, index, field) => {
		const updatedOption = [...blogData.option]
		updatedOption[index][field][currentLang] = e.target.value
		setBlogData({ ...blogData, option: updatedOption })
	}

	const handlePhotoUpload = (info, index) => {
		const updatedOption = [...blogData.option]
		updatedOption[index].photo = info.file
		setBlogData({ ...blogData, option: updatedOption })
	}

	const handleAddOption = () => {
		setBlogData(prevData => ({
			...prevData,
			option: [
				...prevData.option,
				{
					title: { uz: '', ru: '', en: '' },
					text: { uz: '', ru: '', en: '' }, // Changed to 'text'
					photo: null,
					orderNum: 0,
				},
			],
		}))
	}

	const handleRemoveOption = index => {
		const updatedOption = blogData.option.filter((_, i) => i !== index)
		setBlogData({ ...blogData, option: updatedOption })
	}

	const handleRelatedIdChange = e => {
		const ids = e.target.value.split(',').map(id => Number(id.trim()))
		setBlogData({ ...blogData, relatedId: ids })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		try {
			await setNewBlogMultiple(blogData)
			toastr.success('Blog created successfully')
			close()
		} catch (error) {
			toastr.error('Error creating blog')
			setError(error.message)
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
					Создать Блог
				</span>
			}
			closeIcon={<IoClose size={30} />}
		>
			<form onSubmit={handleSubmit}>
				<div className='language-switcher flex gap-2 mb-4'>
					{lang.map(language => (
						<button
							key={language}
							type='button'
							className={`px-4 py-2 rounded-lg ${
								currentLang === language
									? 'bg-violet100 text-white'
									: 'bg-gray-200'
							}`}
							onClick={() => setCurrentLang(language)}
						>
							{language.toUpperCase()}
						</button>
					))}
				</div>

				{blogData.option.map((option, index) => (
					<div key={index} className='option-block mb-4 p-4 border rounded-lg'>
						<div className='flex flex-col'>
							<label className='text-[#A6A6A6] font-medium'>
								Заголовок статьи ({currentLang.toUpperCase()})
							</label>
							<input
								value={option.title[currentLang]}
								onChange={e => handleInputChange(e, index, 'title')}
								required
								className='mt-[10px] rounded-[20px] border border-[#F0F0F0]'
							/>
						</div>

						<div className='flex flex-col mt-[10px]'>
							<label className='text-[#A6A6A6] font-medium'>
								Текст ({currentLang.toUpperCase()})
							</label>
							<textarea
								value={option.text[currentLang]} // Changed to 'text'
								onChange={e => handleInputChange(e, index, 'text')} // Changed to handle 'text'
								required
								className='mt-[10px] rounded-[20px] border border-[#F0F0F0]'
							/>
						</div>

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
									<IoIosAddCircleOutline className='text-violet100' size={50} />
								</div>
							)}
						</Upload>

						<button
							type='button'
							className='mt-[10px] text-red-500 flex items-center gap-2'
							onClick={() => handleRemoveOption(index)}
						>
							<MdDeleteForever size={24} />
							Удалить опцию
						</button>
					</div>
				))}

				<div className='mb-4 flex flex-col gap-[8px]'>
					<label className='text-[18px] font-montserrat font-semibold text-[#000]'>
						похожие (ID)
					</label>
					<input
						placeholder='например (1 , 2 , 3 , .....)'
						onChange={handleRelatedIdChange}
						className='text-titleDark font-medium text-[18px] font-robotoFlex border border-[#F0F0F0]'
					/>
				</div>

				<div className='mt-[20px] flex flex-row'>
					<button
						onClick={handleAddOption}
						className='w-[30%] mb-4 text-center text-white100 font-medium text-[18px] py-[15px] px-[20px] bg-violet100 rounded-full'
					>
						Добавить Опции
					</button>

					{error && <p className='text-red-500'>{error}</p>}
				</div>

				<div className='flex justify-end'>
					<button
						type='submit'
						className='rounded-full mt-4 py-[20px] px-[30px] font-bold bg-violet100 text-white'
						disabled={loading}
					>
						{loading ? 'сохраняется...' : 'Сохранить'}
					</button>
				</div>
			</form>
		</Modal>
	)
}

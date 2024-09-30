'use client'
import { useState, useEffect } from 'react'
import { Modal, Button, Upload } from 'antd'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { updateBannerImage, updateBannerInfo } from '../../lib/api/update.api'
import { UploadOutlined } from '@ant-design/icons'
import { lang } from '../constants/langugaes'
import { IoClose } from "react-icons/io5";
import { useRouter } from 'next/navigation';
const EditCase = ({
	isCloseCreateModal,
	visible,
	bannerID,
	bgPhotoId,
	photoID,
	title,
	description,
	bgPhotoSrc,
	PhotoSrc,
	Data_ID,
}) => {
	const [currentLang, setCurrentLang] = useState('ru')
	const [editCaseBanner, setEditCaseBanner] = useState({
		id: bannerID || 0,
		title: { uz: title.uz, ru: title.ru, en: title.en },
		shortDescription: {
			uz: description.uz,
			ru: description.ru,
			en: description.en,
		},
		bgphoto: bgPhotoSrc || null,
		photo: PhotoSrc || null,
		bgphotoID: bgPhotoId || 0,
		photoID: photoID || 0,
	})

	const [fileList, setFileList] = useState([])
	const [bgFileList, setBgFileList] = useState([])
	const router = useRouter()
	useEffect(() => {
		// Ensure that the props are properly initialized into state
		if (bannerID) {
			setEditCaseBanner({
				id: bannerID,
				title: { uz: title.uz, ru: title.ru, en: title.en },
				shortDescription: {
					uz: description.uz,
					ru: description.ru,
					en: description.en,
				},
				bgphoto: bgPhotoSrc || null,
				photo: PhotoSrc || null,
				bgphotoID: bgPhotoId || 0,
				photoID: photoID || 0, // Ensure the correct photoID is set
			})

			if (PhotoSrc) {
				setFileList([
					{
						uid: '-1',
						name: 'new-photo',
						status: 'done',
						url: PhotoSrc,
					},
				])
			}

			if (bgPhotoSrc) {
				setBgFileList([
					{
						uid: '-2',
						name: 'new-photo',
						status: 'done',
						url: bgPhotoSrc,
					},
				])
			}
		}
	}, [bannerID, bgPhotoSrc, PhotoSrc, title, description, bgPhotoId, photoID])

	const handleLangSwitch = lang => {
		setCurrentLang(lang)
	}

	const handleChange = (e, field) => {
		setEditCaseBanner({
			...editCaseBanner,
			[field]: { ...editCaseBanner[field], [currentLang]: e.target.value },
		})
	}

	const handleBgFileUpload = ({ file, fileList }) => {
		setBgFileList(fileList)
		setEditCaseBanner({ ...editCaseBanner, bgphoto: file })
	}

	const handleFileUpload = ({ file, fileList }) => {
		setFileList(fileList)
		setEditCaseBanner({ ...editCaseBanner, photo: file })
	}

	const handleUpdateBannerInfo = async () => {
		// Constructing jsonData according to the specified format
		const jsonData = {
			id: Data_ID, // Outer id
			banner: {
				id: editCaseBanner.id, // Inner banner id
				title: {
					uz: editCaseBanner.title.uz,
					ru: editCaseBanner.title.ru,
					en: editCaseBanner.title.en,
				},
				shortDescription: {
					uz: editCaseBanner.shortDescription.uz,
					ru: editCaseBanner.shortDescription.ru,
					en: editCaseBanner.shortDescription.en,
				},
			},
		}

		try {
			await updateBannerInfo(jsonData)
			toastr.success('Информация о баннере успешно обновлена!')
			router.refresh()
		} catch (error) {
			toastr.error('Не удалось обновить информацию о баннере.')
		}
	}

	const handleUpdateImages = async () => {
		try {
			if (fileList.length > 0 && fileList[0].originFileObj) {
				await updateBannerImage(
					editCaseBanner.photoID,
					fileList[0].originFileObj
				) // Using correct photoID
			}

			if (bgFileList.length > 0 && bgFileList[0].originFileObj) {
				await updateBannerImage(
					editCaseBanner.bgphotoID,
					bgFileList[0].originFileObj
				) // Using correct bgphotoID
			}

			toastr.success('Изображения успешно обновлены!')
		} catch (error) {
			toastr.error('Не удалось обновить изображения.')
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()

		await handleUpdateBannerInfo()
		await handleUpdateImages()
		isCloseCreateModal()
	}

	return (
		<Modal
    title={<span style={{ fontSize: '30px', fontWeight: 'bold'}}>Редактировать Баннер</span>}
			open={visible}
			onCancel={isCloseCreateModal}
			footer={null}
			width={1200}
      closeIcon={<IoClose className='flex items-center justify-center'  style={{ fontSize: '30px' }} />}
		>
			<form onSubmit={handleSubmit}>
				<div className='flex gap-2 mb-4 mt-[20px]'>
					{lang.map(lang => (
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

				<div className='flex flex-col gap-[10px]'>
					<label className='text-[16px] font-medium text-[#A6A6A6]'>
          Заголовок баннера
					</label>
					<input
						value={editCaseBanner.title[currentLang]}
						onChange={e => handleChange(e, 'title')}
						className='p-[20px] border border-[#F0F0F0] text-titleDark text-[18px] font-medium'
					/>
				</div>

				<div className='flex flex-col gap-[10px] mt-4'>
					<label className='text-[16px] font-medium text-[#A6A6A6]'>
						Краткое Описание
					</label>
					<input
						value={editCaseBanner.shortDescription[currentLang]}
						onChange={e => handleChange(e, 'shortDescription')}
						className='p-[20px] border border-[#F0F0F0] text-titleDark text-[18px] font-medium'
					/>
				</div>

				<div className='flex flex-row items-center justify-between'>
					<div className='flex flex-col gap-[10px] mt-4 w-[45%]  border border-[#F0F0F0] p-[20px] rounded-[20px]'>
						<label className='text-[18px]  text-titleDark font-semibold'>
            Фон баннера
						</label>
						<Upload
							name='bgphoto'
							listType='picture-card'
							fileList={bgFileList}
							onChange={handleBgFileUpload}
							beforeUpload={() => false} // Prevent automatic upload
						>
							{bgFileList.length === 0 && (
								<div className='flex items-center justify-center h-[100px]'>
									<UploadOutlined className='text-violet100 text-[40px]' />
								</div>
							)}
						</Upload>
					</div>
					<div className='flex flex-col gap-[10px] mt-4 w-[45%] border border-[#F0F0F0] p-[20px] rounded-[20px]'>
						<label className='text-[18px]  text-titleDark font-semibold'>
            Изображение баннера
						</label>
						<Upload
							name='photo'
							listType='picture-card'
							fileList={fileList}
							onChange={handleFileUpload}
							beforeUpload={() => false}
						>
							{fileList.length === 0 && (
								<div className='flex items-center justify-center h-[100px]'>
									<UploadOutlined className='text-violet100 text-[40px]' />
								</div>
							)}
						</Upload>
					</div>
				</div>

				<div className='flex flex-row items-center justify-end'>
					<button
						type='submit'
						className='py-[15px] w-[20%] px-[20px] bg-violet100 text-[18px] font-bold text-center text-white rounded-full'
					>
						Сохранить
					</button>
				</div>
			</form>
		</Modal>
	)
}

export default EditCase

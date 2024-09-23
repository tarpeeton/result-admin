'use client'
import { useState } from 'react'
import { Modal, Input, Button, Upload } from 'antd'
import { createPartner } from '../../lib/api/create.api' // Modify createPartner API function as needed
import { UploadOutlined } from '@ant-design/icons'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css' // Import Toastr CSS
import { MdDelete } from 'react-icons/md'

export const CreatePartner = ({ isCloseCreateModal, visible }) => {
	const [partnerName, setPartnerName] = useState('')
	const [fileList, setFileList] = useState([])

	// File upload handler
	const handleFileUpload = ({ file }) => {
		// Set only the latest uploaded file
		setFileList([file]);
	}

	// Remove file handler
	const handleRemoveFile = () => setFileList([])

	// Partner creation handler
	const handleSubmit = async e => {
		e.preventDefault()

		// Prepare form data
		const formData = new FormData()
		formData.append('name', partnerName)
		if (fileList.length > 0) {
			formData.append('photo', fileList[0].originFileObj || fileList[0]) // Attach file as originFileObj if exists
		}

		try {
			// API call to create a partner
			await createPartner(formData)
			toastr.success('Партнер успешно создан!')
			isCloseCreateModal() // Close the modal
			setPartnerName('') // Clear the input
			setFileList([]) // Clear the file list
		} catch (error) {
			toastr.error('Ошибка при создании партнера! Попробуйте еще раз.')
		}
	}

	return (
		<Modal
			title={<span className='text-[18px] font-bold'>Добавить Партнер</span>}
			visible={visible}
			onCancel={isCloseCreateModal}
			footer={null}
			width={600}
		>
			<form onSubmit={handleSubmit}>
				{/* Name Input Field */}
				<div className='flex flex-col gap-[10px]'>
					<label>Название компании</label>
					<Input
						value={partnerName}
						onChange={e => setPartnerName(e.target.value)}
						required
					/>
				</div>

				{/* File Upload Field */}
				<div className='flex flex-col gap-[10px] mt-[10px] relative w-[20%]'>
					<label className='font-bold text-[18px]'>Фото</label>
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
									src={URL.createObjectURL(fileList[0].originFileObj || fileList[0])}
									alt='photo'
									className=' object-cover'
								/>
								<Button
									onClick={handleRemoveFile}
									className='mt-[10px] absolute right-[10px] top-[10px] rounded-full py-[15px] px-[10px]'
								>
									<MdDelete />
								</Button>
							</div>
						) : (
							<div className='h-[40px] flex items-center justify-center'>
								<UploadOutlined className='text-violet100 w-full h-full text-[40px]' />
							</div>
						)}
					</Upload>
				</div>

				{/* Submit Button */}
                <div className='w-full flex flex-row justify-end'>
          <Button
            htmlType="submit"
            className='w-[30%] mt-[12px] flex py-[20px] px-[25px] rounded-full bg-violet100 text-white font-bold'
          >
            Сохранить
          </Button>
        </div>
				
			</form>
		</Modal>
	)
}

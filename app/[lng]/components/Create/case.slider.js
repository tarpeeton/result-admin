'use client'
import { useState } from 'react'
import { Modal, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { createImage } from '../../lib/api/create.api'
import { updateQuestionUpdate } from '../../lib/api/update.api';
import toastr from "toastr";
import "toastr/build/toastr.min.css"; // Toastr CSS for notifications

export const CreateSliders = ({ close, visible, onImagesUploaded, ID }) => {
    const [fileList, setFileList] = useState([])

    // Handle file upload, allowing multiple files
    const handleFileUpload = ({ fileList }) => {
        setFileList(fileList)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        // Prepare form data for multiple files
        const formData = new FormData()
        fileList.forEach(file => {
            formData.append('photo', file.originFileObj || file) // Append all files under the 'photo' key
        })

        try {
            // Call the createImage API with the formData
            const response = await createImage(formData)
            
            // Extract URLs from the uploaded images and format them for the slider update
            const imageUrls = response.data.map(img => ({ url: img.url }))
            
            // Create the jsonData for the update request (following your schema)
            const jsonData = {
                id: ID,
                slider: imageUrls  // Pass the array of URLs to the slider
            }

            // Call the update API to update the slider
            await updateQuestionUpdate(jsonData)


            toastr.success('Images uploaded and slider updated successfully!')
            close() // Close modal after success
            setFileList([]) // Reset the file list after successful upload
        } catch (error) {
            toastr.error('Error uploading images or updating slider. Please try again.')
            console.error('Error submitting the form', error)
        }
    }

    return (
        <Modal
            title={<span className='text-[18px] font-bold'>Добавить Слидер</span>}
            open={visible}
            onCancel={close}
            footer={null}
            width={900}
        >
            <form onSubmit={handleSubmit}>
                {/* Multiple File Upload Field */}
                <div className='flex flex-col gap-[10px] mt-4 relative'>
                    <label className='text-[16px] font-medium text-[#A6A6A6]'>
                        Слидер
                    </label>
                    <Upload
                        name='photos'
                        listType='picture-card'
                        multiple // Enable multiple file uploads
                        fileList={fileList}
                        beforeUpload={() => false} // Disable automatic upload
                        onChange={handleFileUpload}
                        className='relative overflow-hidden'
                    >
                        <div className='flex items-center justify-center h-[100px]'>
                            <UploadOutlined className='text-violet100 text-[40px]' />
                        </div>
                    </Upload>
                </div>

                {/* Submit Button */}
                <div className='w-full flex flex-row justify-end'>
                    <button
                        type='submit'
                        className='w-[30%] mt-[12px] flex py-[20px] px-[25px] rounded-full bg-violet100 text-white font-bold'
                    >
                        Сохранить
                    </button>
                </div>
            </form>
        </Modal>
    )
}

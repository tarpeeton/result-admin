'use client'
import { useState } from 'react'
import { Modal, Input, Button, Upload, Image } from 'antd'
import { createPartner } from '../../lib/api/create.api' // Modify createPartner API function as needed
import { UploadOutlined } from '@ant-design/icons'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css' // Import Toastr CSS
import { MdDelete } from 'react-icons/md'

// Helper function to get base64 from file
const getBase64 = (file) => 
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const CreatePartner = ({ isCloseCreateModal, visible }) => {
  const [partnerName, setPartnerName] = useState('')
  const [fileList, setFileList] = useState([]) // Array to hold the file objects
  const [previewOpen, setPreviewOpen] = useState(false) // Controls preview modal visibility
  const [previewImage, setPreviewImage] = useState('') // Image to preview

  // File upload handler
  const handleFileUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList); // Update the file list with the newly uploaded files
  };

  // Handle preview for image file
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Remove file handler
  const handleRemoveFile = () => setFileList([]);

  // Partner creation handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('name', partnerName);
    if (fileList.length > 0) {
      formData.append('photo', fileList[0].originFileObj || fileList[0]); // Attach file as originFileObj if exists
    }

    try {
      // API call to create a partner
      await createPartner(formData);
      toastr.success('Партнер успешно создан!');
      isCloseCreateModal(); // Close the modal
      setPartnerName(''); // Clear the input
      setFileList([]); // Clear the file list
    } catch (error) {
      toastr.error('Ошибка при создании партнера! Попробуйте еще раз.');
    }
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
          <label className='text-[16px] font-medium text-[#A6A6A6]'>Название компании</label>
          <input
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            required
            className='p-[20px] rounded-[10px] text-[18px] border border-[#F0F0F0] outline-none text-titleDark'
          />
        </div>

        {/* Custom File Upload Field */}
        <div className='flex flex-col gap-[10px] mt-[10px] relative w-[30%]'>
          <label className='text-[16px] font-medium text-[#A6A6A6]'>Фото</label>
          <Upload
            listType='picture-card'
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleFileUpload}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </div>

        {/* Image Preview Modal */}
        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
            }}
            src={previewImage}
          />
        )}

        {/* Submit Button */}
        <div className='w-full flex flex-row justify-end'>
          <Button
            htmlType='submit'
            className='w-[30%] mt-[12px] flex py-[20px] px-[25px] rounded-full bg-violet100 text-white font-bold'
          >
            Сохранить
          </Button>
        </div>
      </form>
    </Modal>
  );
};

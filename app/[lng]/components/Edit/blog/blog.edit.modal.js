'use client';
import { useState, useEffect } from 'react';
import { Modal, Upload } from 'antd';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { updateBlog, editImage } from '@/app/[lng]/lib/api/edit.api';
import { deleteImage } from '@/app/[lng]/lib/api/delete.api';
import { useRouter } from 'next/navigation';
import { IoClose } from 'react-icons/io5';
import { IoIosAddCircleOutline } from 'react-icons/io';

export const EditBlog = ({
  isCloseCreateModal,
  visible,
  blogID,
  optionID,
  titleData,
  descriptionData,
  imageID,
  imageURL,
  orderNumData,
}) => {
  const [currentLang, setCurrentLang] = useState('ru');
  const router = useRouter();
  const [fileList, setFileList] = useState([]);

  // Initialize currentImageID to null
  const [currentImageID, setCurrentImageID] = useState(null);

  // Update currentImageID when imageID prop changes
  useEffect(() => {
    if (imageID) {
      setCurrentImageID(imageID);
    }
  }, [imageID]);

  console.log(currentImageID, "currentImageID");

  const [editBlogData, setEditBlogData] = useState({
    id: optionID,
    title: {
      uz: '',
      ru: '',
      en: '',
    },
    description: {
      uz: '',
      ru: '',
      en: '',
    },
    orderNum: orderNumData || 0,
  });

  const languages = [
    { code: 'ru', label: 'RU' },
    { code: 'uz', label: 'UZ' },
    { code: 'en', label: 'EN' },
  ];

  // Initialize fileList with the existing image
  useEffect(() => {
    if (imageURL) {
      setFileList([
        {
          uid: '-1',
          name: 'Current Image',
          status: 'done',
          url: imageURL,
        },
      ]);
    }
  }, [imageURL]);

  // Fetch existing option data when the modal opens
  useEffect(() => {
    if (optionID && titleData && descriptionData) {
      setEditBlogData({
        id: optionID,
        title: {
          uz: titleData.uz || '',
          ru: titleData.ru || '',
          en: titleData.en || '',
        },
        description: {
          uz: descriptionData.uz || '',
          ru: descriptionData.ru || '',
          en: descriptionData.en || '',
        },
        orderNum: orderNumData || 0,
      });
    }
  }, [optionID, titleData, descriptionData, orderNumData]);

  // Switch between different languages
  const handleLangSwitch = (lang) => {
    setCurrentLang(lang);
  };

  // Handle input changes for titles
  const handleTitleChange = (e) => {
    setEditBlogData({
      ...editBlogData,
      title: {
        ...editBlogData.title,
        [currentLang]: e.target.value,
      },
    });
  };

  // Handle input changes for descriptions
  const handleDescriptionChange = (e) => {
    setEditBlogData({
      ...editBlogData,
      description: {
        ...editBlogData.description,
        [currentLang]: e.target.value,
      },
    });
  };

  // Handle image upload change
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);

    // Only reset currentImageID if a new image is added (has originFileObj)
    if (fileList.length > 0 && fileList[0].originFileObj) {
      // This means a new image is selected
      setCurrentImageID(null);
    }
  };

  // Handle image removal
  const handleRemoveImage = async () => {
    console.log('handleRemoveImage called. currentImageID:', currentImageID);

    if (!currentImageID) {
      // If there's no image ID, just remove the image from the UI
      setFileList([]);
      toastr.success('Изображение удалено.');
      return;
    }
    try {
      await deleteImage(currentImageID);
      toastr.success('Фотография успешно удалена!');
      setFileList([]);
      setCurrentImageID(null); // Reset the image ID
    } catch (error) {
      toastr.error('Не удалось удалить фотографию.');
      console.error('Image deletion error:', error);
    }
  };

  // Submit updated blog data and handle image upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    const jsonData = {
      id: blogID,
      option: [
        {
          id: editBlogData.id,
          title: editBlogData.title,
          description: editBlogData.description,
          orderNum: editBlogData.orderNum,
        },
      ],
    };

    // If there's a new image to upload
    if (fileList.length > 0 && fileList[0].originFileObj) {
      try {
        const formData = new FormData();
        formData.append('new-photo', fileList[0].originFileObj);

        // Upload the new image
        const response = await editImage(null, formData); // Adjust based on your API
        toastr.success('Фотография успешно загружена!');

        // Update image ID and URL with the new image data
        const newImageID = response.data.id; // Adjust based on your API's response
        const newImageURL = response.data.url;

        setCurrentImageID(newImageID);
        setFileList([
          {
            uid: '-1',
            name: 'Uploaded Image',
            status: 'done',
            url: newImageURL,
          },
        ]);

        // Include the new image in the blog option
        jsonData.option[0].photo = {
          id: newImageID,
          url: newImageURL,
        };
      } catch (error) {
        toastr.error('Не удалось загрузить новую фотографию.');
        console.error('Image upload error:', error);
      }
    } else if (currentImageID) {
      // If the image exists, include it in the blog option
      jsonData.option[0].photo = {
        id: currentImageID,
        url: fileList[0]?.url || imageURL,
      };
    } else {
      // If the image was deleted, ensure photo is removed
      jsonData.option[0].photo = null;
    }

    try {
      // Update the blog option
      await updateBlog(jsonData);
      toastr.success('Блог успешно обновлен!');

      isCloseCreateModal();
      router.refresh();
    } catch (error) {
      toastr.error('Не удалось обновить блог.');
      console.error('Update error:', error);
    }
  };

  return (
    <Modal
      title={<span style={{ fontSize: '30px', fontWeight: 'bold' }}>Редактировать Блог</span>}
      open={visible}
      onCancel={isCloseCreateModal}
      footer={null}
      width={1000}
      closeIcon={<IoClose size={30} />}
    >
      <form onSubmit={handleSubmit} className='mt-[30px]'>
        <div className='flex gap-2 mb-4 '>
          {languages.map((lang) => (
            <button
              key={lang.code}
              type='button'
              className={`px-4 py-2 rounded-lg ${
                currentLang === lang.code ? 'bg-violet100 text-white' : 'bg-gray-200'
              }`}
              onClick={() => handleLangSwitch(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Input for Title */}
        <div className='flex flex-col gap-[10px] mt-4 relative'>
          <label className='text-[16px] font-medium text-[#A6A6A6]'>Заголовок</label>
          <input
            value={editBlogData.title[currentLang]}
            onChange={handleTitleChange}
            className='p-[15px] w-full border border-[#F0F0F0] rounded-[10px] h-full text-[18px] text-titleDark pr-[40px] outline-violet100 font-medium font-robotoFlex'
            required
          />
        </div>

        {/* Input for Description */}
        <div className='flex flex-col gap-[10px] mt-4'>
          <label className='text-[16px] font-medium text-[#A6A6A6]'>Описание</label>
          <textarea
            value={editBlogData.description[currentLang]}
            onChange={handleDescriptionChange}
            required
            className='p-[20px] text-titleDark font-robotoFlex font-medium text-[18px] border border-[#F0F0F0] outline-violet100 min-h-[200px]'
          />
        </div>

        {/* Image Upload */}
        <div className='flex flex-col gap-[10px] mt-[30px] rounded-[20px] border border-[#F0F0F0] p-[20px]'>
          <label className='text-[18px] font-montserrat font-semibold text-[#000]'>Изображение</label>
          <div className='relative mt-[20px]'>
            {fileList.length > 0 ? (
              <div className='relative w-[50%]'>
                <img
                  src={fileList[0].url || URL.createObjectURL(fileList[0].originFileObj)}
                  alt='Image preview'
                  className='w-[300px] h-[200px] object-cover rounded-md'
                />
                <button
                  type='button'
                  className='absolute top-2 right-[200px] bg-white rounded-full p-1 shadow-lg'
                  onClick={handleRemoveImage}
                >
                  <IoClose className='text-black' size={30} />
                </button>
              </div>
            ) : (
              <Upload
                fileList={fileList}
                onChange={handleUploadChange}
                beforeUpload={() => false}
                accept='image/*'
                listType='picture-card'
                className='upload-custom'
              >
                <div className='flex flex-col items-center justify-center'>
                  <IoIosAddCircleOutline className='text-violet100' size={50} />
                </div>
              </Upload>
            )}
          </div>
        </div>

        <div className='w-full flex flex-row justify-end mt-4 items-center'>
          <button
            type='submit'
            className='w-[30%] mt-4 py-[20px] px-[30px] bg-violet100 text-white rounded-full font-bold font-montserrat'
          >
            Сохранить
          </button>
        </div>
      </form>
    </Modal>
  );
};

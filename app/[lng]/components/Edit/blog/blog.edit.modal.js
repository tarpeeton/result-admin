'use client';
import { useState, useEffect } from 'react';
import { Modal, Upload, Button } from 'antd';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { updateBlog, editImage } from '@/app/[lng]/lib/api/edit.api';
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export const EditBlog = ({
    isCloseCreateModal,
    visible,
    blogID,
    optionID, // This is the ID of the specific option to update
    titleData,
    descriptionData,
    imageID
}) => {
    const [currentLang, setCurrentLang] = useState('ru');
    const router = useRouter();
    const [fileList, setFileList] = useState([]); // State for the image upload

    const [editBlogData, setEditBlogData] = useState({
        id: optionID, // Using optionID for this specific option
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
    });

    const languages = [
        { code: 'ru', label: 'RU' },
        { code: 'uz', label: 'UZ' },
        { code: 'en', label: 'EN' },
    ];

    // Fetch existing option data when the modal opens
    useEffect(() => {
        if (optionID && titleData && descriptionData) {
            setEditBlogData({
                id: optionID, // Set the option ID for updating
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
            });
        }
    }, [optionID, titleData, descriptionData]);

    // Switch between different languages
    const handleLangSwitch = lang => {
        setCurrentLang(lang);
    };

    // Handle input changes for titles dynamically based on the current language
    const handleTitleChange = e => {
        setEditBlogData({
            ...editBlogData,
            title: {
                ...editBlogData.title,
                [currentLang]: e.target.value,
            },
        });
    };

    // Handle input changes for descriptions dynamically based on the current language
    const handleDescriptionChange = e => {
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
    };

    // Submit updated blog data and handle image upload
    const handleSubmit = async e => {
        e.preventDefault();

        const jsonData = {
            id: blogID, // This is the blog ID
            options: [
                {
                    id: editBlogData.id, // Option ID inside the options array
                    title: editBlogData.title, // Title translations
                    description: editBlogData.description, // Description translations
                    orderNum: 0, // You can adjust this based on your needs
                },
            ],
        };

        try {
            // Update the blog option
            await updateBlog(jsonData);
            toastr.success('Блог успешно обновлен!');

            // Check if there is an image to upload
            if (fileList.length > 0) {
                const formData = new FormData();
                formData.append('photo', fileList[0].originFileObj); // Add the selected file

                // Call the editImage function to update the image by imageID
                await editImage(imageID, formData);
                toastr.success('Фотография успешно обновлена!');
            }

            isCloseCreateModal();
            router.refresh();
        } catch (error) {
            toastr.error('Не удалось обновить блог или фотографию.');
        }
    };

    return (
        <Modal
            title={<span style={{ fontSize: '30px', fontWeight: 'bold' }}>Редактировать Блог</span>}
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

                {/* Input for Title */}
                <div className='flex flex-col gap-[10px] mt-4 relative'>
                    <label className='text-[16px] font-medium text-[#A6A6A6]'>Заголовок</label>
                    <input
                        value={editBlogData.title[currentLang]}
                        onChange={handleTitleChange} // Handle title change
                        className='p-[15px] w-full border border-[#F0F0F0] rounded-[10px] h-full text-[18px] text-titleDark pr-[40px] outline-violet100'
                        required
                    />
                </div>

                {/* Input for Description */}
                <div className='flex flex-col gap-[10px] mt-4'>
                    <label className='text-[16px] font-medium text-[#A6A6A6]'>Описание</label>
                    <textarea
                        value={editBlogData.description[currentLang]}
                        onChange={handleDescriptionChange} // Handle description change
                        required
                        className='p-[20px] border border-[#F0F0F0] outline-violet100'
                    />
                </div>

                {/* Image Upload */}
                <div className='flex flex-col gap-[10px] mt-4'>
                    <label className='text-[16px] font-medium text-[#A6A6A6]'>Загрузить Фото</label>
                    <Upload
                        fileList={fileList}
                        onChange={handleUploadChange}
                        beforeUpload={() => false} // Prevent automatic upload
                        accept="image/*"
                    >
                        <Button icon={<UploadOutlined />}>Выберите Фото</Button>
                    </Upload>
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

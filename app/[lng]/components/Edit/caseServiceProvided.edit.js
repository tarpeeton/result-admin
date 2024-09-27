'use client';
import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { updateQuestionUpdate } from '../../lib/api/update.api';
import { IoIosClose } from "react-icons/io";

export const EditServiceProvided = ({
    isCloseCreateModal,
    visible,
    data,
    ID
}) => {
    const [currentLang, setCurrentLang] = useState('ru');
    const [editMemberData, setEditMemberData] = useState({
        id: ID,
        providedService: [],    // Stores added or updated services
        deletedServices: []     // Stores services that will be deleted
    });

    const languages = [
        { code: 'ru', label: 'RU' },
        { code: 'uz', label: 'UZ' },
        { code: 'en', label: 'EN' }
    ];

    // Fetch existing data when the modal opens
    useEffect(() => {
        if (data) {
            setEditMemberData({
                id: ID,
                providedService: data.map(service => ({
                    id: service.id,  // Existing services have an ID
                    name: {
                        uz: service.name || '',
                        ru: service.name || '',
                        en: service.name || ''
                    },
                    description: {
                        uz: service.description || '',
                        ru: service.description || '',
                        en: service.description || ''
                    },
                    orderNum: service.orderNum,
                    active: service.active,
                })),
                deletedServices: []  // Reset deleted services on modal load
            });
        }
    }, [data, ID]);

    const handleLangSwitch = (lang) => {
        setCurrentLang(lang);
    };

    const handleNameChange = (e, index) => {
        const updatedServices = [...editMemberData.providedService];
        updatedServices[index].name[currentLang] = e.target.value;
        setEditMemberData({ ...editMemberData, providedService: updatedServices });
    };

    const handleDescriptionChange = (e, index) => {
        const updatedServices = [...editMemberData.providedService];
        updatedServices[index].description[currentLang] = e.target.value;
        setEditMemberData({ ...editMemberData, providedService: updatedServices });
    };

    // Handle the deletion of an existing service
    const handleDeleteService = (index) => {
        const updatedServices = [...editMemberData.providedService];
        const deletedServiceId = updatedServices[index].id;

        // If the service has an ID (existing service), mark it for deletion
        if (deletedServiceId) {
            setEditMemberData((prevData) => ({
                ...prevData,
                deletedServices: [...prevData.deletedServices, { id: deletedServiceId }]
            }));
        }

        // Remove the service from the providedService array
        updatedServices.splice(index, 1);
        setEditMemberData((prevData) => ({
            ...prevData,
            providedService: updatedServices
        }));
    };

    // Handle adding a new service
    const handleAddService = () => {
        const newService = {
            name: { uz: '', ru: '', en: '' },  // No ID for new services
            description: { uz: '', ru: '', en: '' },
            orderNum: 0,
            active: true
        };

        setEditMemberData((prevData) => ({
            ...prevData,
            providedService: [...prevData.providedService, newService]
        }));
    };

    // Submit both added/updated and deleted services
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare payload according to the API specification
        const payload = {
            id: editMemberData.id,  // The main entity's ID
            providedService: [
                ...editMemberData.providedService.filter(service => !service.id), // Only new services (no id)
                ...editMemberData.deletedServices.map(service => ({ id: service.id }))  // Only IDs for deletion
            ],
          
        };

        try {
            await updateQuestionUpdate(payload);  // Ensure your API call is correct
            toastr.success('Услуги успешно обновлены!');
            isCloseCreateModal();
        } catch (error) {
            toastr.error('Не удалось обновить услуги.');
        }
    };

    return (
        <Modal
            title='Редактировать Услуги'
            open={visible}
            onCancel={isCloseCreateModal}
            footer={null}
            width={1000}
        >
            <form onSubmit={handleSubmit}>
                {/* Language Switcher */}
                <div className='flex gap-2 mb-4'>
                    {languages.map((lang) => (
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

                {/* Service Inputs */}
                {editMemberData.providedService.map((service, index) => (
                    <div key={service.id || index} className='mb-6 relative'>
                        {/* Delete Button */}
                        <button
                            type='button'
                            onClick={() => handleDeleteService(index)}  // Delete this service
                            className='absolute top-[50px] right-[10px] text-[#A6A6A6]'
                        >
                            <IoIosClose size={28} />
                        </button>

                        {/* Service Name */}
                        <div className='flex flex-col gap-2'>
                            <label className='text-[16px] font-medium text-[#A6A6A6]'>Название услуги </label>
                            <input
                                value={service.name[currentLang]}
                                onChange={(e) => handleNameChange(e, index)}
                                className='p-[15px] w-full border border-[#F0F0F0] rounded-[10px] text-[18px] text-titleDark'
                            />
                        </div>

                        {/* Service Description */}
                        <div className='flex flex-col gap-2 mt-4'>
                            <label className='text-[16px] font-medium text-[#A6A6A6]'>Описание </label>
                            <textarea
                                value={service.description[currentLang]}
                                onChange={(e) => handleDescriptionChange(e, index)}
                                className='p-[20px] w-full border border-[#F0F0F0] rounded-[10px] text-[18px] text-titleDark'
                            />
                        </div>
                    </div>
                ))}

                {/* Add New Service Button */}
                <div className='w-full flex justify-end mt-4'>
                    <button
                        type='button'
                        onClick={handleAddService}
                        className='py-[20px] px-[30px] bg-violet100 text-white rounded-full font-bold mr-4'
                    >
                        Добавить 
                    </button>
                    <button
                        type='submit'
                        className='py-[20px] px-[30px] bg-violet100 text-white rounded-full font-bold'
                    >
                        Сохранить
                    </button>
                </div>
            </form>
        </Modal>
    );
};

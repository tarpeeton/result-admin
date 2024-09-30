'use client'
import { useState, useEffect } from 'react'
import { Modal } from 'antd'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { updateQuestionUpdate } from '../../lib/api/update.api'
import { IoIosClose } from 'react-icons/io'
import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { useRouter } from 'next/navigation';
export const EditResult = ({
    obtainedResult,  // List of existing results
    ID,
    visible,
    close,
    resultDescription,
    resultSiteLink,
    resultInstagramLink,
    resultTelegramLink
}) => {
    const [currentLang, setCurrentLang] = useState('ru')
    const [linkType, setLinkType] = useState('resultSiteLink')  // Changed from 'site' to match the data structure
    const [editMemberData, setEditMemberData] = useState({
        id: ID,
        obtainedResult: [], // Stores added or updated results
        deletedResults: [], // Stores results that will be deleted
        resultDescription: { uz: '', ru: '', en: '' }, // Manages the result description
        resultSiteLink: resultSiteLink || '', // Initialize with passed value or empty string
        resultInstagramLink: resultInstagramLink || '',
        resultTelegramLink: resultTelegramLink || '',
    })

    const router = useRouter()
    const languages = [
        { code: 'ru', label: 'RU' },
        { code: 'uz', label: 'UZ' },
        { code: 'en', label: 'EN' },
    ]

    useEffect(() => {
        if (obtainedResult) {
            setEditMemberData({
                id: ID,
                obtainedResult: obtainedResult.map(result => ({
                    id: result.id, // Existing results have an ID
                    name: {
                        uz: result.name.uz || '',
                        ru: result.name.ru || '',
                        en: result.name.en || '',
                    },
                    result: {
                        uz: result.result.uz || '',
                        ru: result.result.ru || '',
                        en: result.result.en || '',
                    },
                    orderNum: result.orderNum || '',
                })),
                resultDescription: {
                    uz: resultDescription.uz || '',
                    ru: resultDescription.ru || '',
                    en: resultDescription.en || '',
                },
                resultSiteLink: resultSiteLink || '',
                resultInstagramLink: resultInstagramLink || '',
                resultTelegramLink: resultTelegramLink || '',
                deletedResults: [], // Reset deleted results on modal load
            })
        }
    }, [obtainedResult, ID])

    const handleLangSwitch = (lang) => {
        setCurrentLang(lang)
    }

    const handleNameChange = (e, index) => {
        const updatedResults = [...editMemberData.obtainedResult]
        updatedResults[index].name[currentLang] = e.target.value
        setEditMemberData({ ...editMemberData, obtainedResult: updatedResults })
    }

    const handleResultChange = (e, index) => {
        const updatedResults = [...editMemberData.obtainedResult]
        updatedResults[index].result[currentLang] = e.target.value
        setEditMemberData({ ...editMemberData, obtainedResult: updatedResults })
    }

    const handleDescriptionChange = (e) => {
        const updatedDescription = { ...editMemberData.resultDescription }
        updatedDescription[currentLang] = e.target.value // Update description for the current language
        setEditMemberData({ ...editMemberData, resultDescription: updatedDescription })
    }

    const handleLinkChange = (e) => {
        setEditMemberData(prevData => ({
            ...prevData,
            [linkType]: e.target.value // Dynamically update based on selected link type
        }))
    }

    const handleDeleteResult = (index) => {
        const updatedResults = [...editMemberData.obtainedResult]
        const deletedResultId = updatedResults[index].id

        if (deletedResultId) {
            setEditMemberData((prevData) => ({
                ...prevData,
                deletedResults: [...prevData.deletedResults, { id: deletedResultId }],
            }))
        }

        updatedResults.splice(index, 1)
        setEditMemberData((prevData) => ({
            ...prevData,
            obtainedResult: updatedResults,
        }))
    }

    const handleAddResult = () => {
        const newResult = {
            name: { uz: '', ru: '', en: '' },
            result: { uz: '', ru: '', en: '' },
            orderNum: '',
        }

        setEditMemberData((prevData) => ({
            ...prevData,
            obtainedResult: [...prevData.obtainedResult, newResult],
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            id: editMemberData.id,
            obtainedResult: [
                ...editMemberData.obtainedResult,
                ...editMemberData.deletedResults.map(result => ({ id: result.id })),
            ],
            resultDescription: editMemberData.resultDescription,
            resultSiteLink: editMemberData.resultSiteLink,
            resultInstagramLink: editMemberData.resultInstagramLink,
            resultTelegramLink: editMemberData.resultTelegramLink,
        }

        try {
            await updateQuestionUpdate(payload)
            toastr.success('Результаты успешно обновлены!')
            close()
router.refresh()
        } catch (error) {
            toastr.error('Не удалось обновить результаты.')
        }
    }

    return (
        <Modal
            title={<span style={{ fontSize: '30px', fontWeight: 'bold'}}>Редактировать Результаты</span>}
            open={visible}
            onCancel={close}
            footer={null}
            width={1400}
        >
            <form onSubmit={handleSubmit} className='mt-[20px]'>
                <div className='flex flex-row justify-between items-center mb-4'>
                    <div className='flex flex-row gap-2 h-[40px]'>
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

                    <div className='flex flex-row gap-2'>
                        <button
                            type='button'
                            className={`px-4 py-2 rounded-lg ${linkType === 'resultSiteLink' ? 'bg-violet100 text-white' : 'bg-gray-200'}`}
                            onClick={() => setLinkType('resultSiteLink')}
                        >
                            <CiGlobe className='text-titleDark' />
                        </button>
                        <button
                            type='button'
                            className={`px-4 h-[40px] py-2 rounded-lg ${linkType === 'resultInstagramLink' ? 'bg-violet100 text-white' : 'bg-gray-200'}`}
                            onClick={() => setLinkType('resultInstagramLink')}
                        >
                            <FaInstagram className='text-[#F863A1]' />
                        </button>
                        <button
                            type='button'
                            className={`px-4 h-[40px] py-2 rounded-lg ${linkType === 'resultTelegramLink' ? 'bg-violet100 text-white' : 'bg-gray-200'}`}
                            onClick={() => setLinkType('resultTelegramLink')}
                        >
                            <FaTelegramPlane className='text-[#2B99FF]' />
                        </button>
                    </div>

                    {/* Link Input */}
                    <div className='flex flex-col gap-2 w-[60%]'>
                        <input
                            value={editMemberData[linkType]}  // Value changes based on selected link type
                            onChange={handleLinkChange}
                            className='p-[15px] border border-[#F0F0F0] rounded-[10px] text-[18px] text-titleDark w-full'
                            placeholder={`Enter ${linkType === 'resultSiteLink' ? 'Website' : linkType === 'resultInstagramLink' ? 'Instagram' : 'Telegram'} link`}
                        />
                    </div>
                </div>

                {editMemberData.obtainedResult.map((result, index) => (
                    <div key={result.id || index} className='mb-6 relative'>
                        <button
                            type='button'
                            onClick={() => handleDeleteResult(index)}
                            className='absolute top-[50px] right-[10px] text-[#A6A6A6]'
                        >
                            <IoIosClose size={28} />
                        </button>

                        <div className='flex flex-col gap-2'>
                            <label className='text-[16px] font-medium text-[#A6A6A6]'>
                                Название результата{' '}
                            </label>
                            <input
                                value={result.name[currentLang]}
                                onChange={e => handleNameChange(e, index)}
                                className='p-[15px] w-full border border-[#F0F0F0] rounded-[10px] text-[18px] text-titleDark'
                            />
                        </div>

                        <div className='flex flex-col gap-2 mt-4'>
                            <label className='text-[16px] font-medium text-[#A6A6A6]'>
                                Описание результата{' '}
                            </label>
                            <textarea
                                value={result.result[currentLang]}
                                onChange={e => handleResultChange(e, index)}
                                className='p-[20px] w-full border border-[#F0F0F0] rounded-[10px] text-[18px] text-titleDark'
                            />
                        </div>
                    </div>
                ))}

                <div className='flex flex-col gap-2 mb-6'>
                    <label className='text-[16px] font-medium text-[#A6A6A6]'>
                        Общие результаты{' '}
                    </label>
                    <textarea
                        value={editMemberData.resultDescription[currentLang]}
                        onChange={handleDescriptionChange}
                        className='p-[20px] w-full border border-[#F0F0F0] rounded-[10px] text-[18px] text-titleDark'
                    />
                </div>

                <div className='w-full flex justify-end mt-4'>
                    <button
                        type='button'
                        onClick={handleAddResult}
                        className='py-[20px] px-[30px] bg-violet100 text-white rounded-full font-bold mr-4'
                    >
                        Добавить Результат
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
    )
}

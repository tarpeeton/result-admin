"use client";
import { useState } from "react";
import { Modal, Input, Button, Upload, Switch } from "antd";
import { createProject } from '../../lib/api/create.api'; // createProject API funksiyasini moslashtirish kerak
import { UploadOutlined } from '@ant-design/icons';
import toastr from "toastr";
import "toastr/build/toastr.min.css"; // Import Toastr CSS

export const CreateProject = ({ isCloseCreateModal, visible }) => {
    const [currentLang, setCurrentLang] = useState('ru'); // Tillarni tanlash uchun holat
    const [partnerName, setPartnerName] = useState({
        uz: '',
        ru: '',
        en: ''
    });
    const [tag, setTag] = useState({
        uz: '',
        ru: '',
        en: ''
    });
    const [link, setLink] = useState('');
    const [orderNum, setOrderNum] = useState(0);
    const [blur, setBlur] = useState(false);
    const [fileList, setFileList] = useState([]);

    // Tilni almashtirish funksiyasi
    const handleLangSwitch = (lang) => {
        setCurrentLang(lang);
    };

    // Input o'zgarishi
    const handleChange = (e, field) => {
        const value = e.target.value;
        if (field === 'name') {
            setPartnerName({ ...partnerName, [currentLang]: value });
        } else if (field === 'tag') {
            setTag({ ...tag, [currentLang]: value });
        } else if (field === 'link') {
            setLink(value);
        }
    };

    // Fayl yuklash funksiyasi
    const handleFileUpload = ({ fileList }) => {
        setFileList(fileList);
    };

    // Faylni o'chirish funksiyasi
    const handleRemoveFile = () => setFileList([]);

    // Formni yuborish
    const handleSubmit = async (e) => {
        e.preventDefault();

        // FormData tayyorlash
        const formData = new FormData();
        formData.append("name[uz]", partnerName.uz);
        formData.append("name[ru]", partnerName.ru);
        formData.append("name[en]", partnerName.en);
        formData.append("tag[uz]", tag.uz);
        formData.append("tag[ru]", tag.ru);
        formData.append("tag[en]", tag.en);
        formData.append("link", link);
        formData.append("orderNum", orderNum);
        formData.append("blur", blur);

        if (fileList.length > 0) {
            formData.append("photo", fileList[0].originFileObj);
        }

        try {
            // API chaqiruvi
            await createProject(formData);
            toastr.success("Project muvaffaqiyatli yaratildi!");
            isCloseCreateModal(); // Modalni yopish
            setPartnerName({ uz: '', ru: '', en: '' });
            setTag({ uz: '', ru: '', en: '' });
            setLink('');
            setOrderNum(0);
            setBlur(false);
            setFileList([]);
        } catch (error) {
            toastr.error("Project yaratishda xatolik yuz berdi!");
        }
    };

    return (
        <Modal
            title={<span className="text-[18px] font-bold">Добавить Партнер</span>}
            visible={visible}
            onCancel={isCloseCreateModal}
            footer={null}
            width={600}
        >
            <form onSubmit={handleSubmit}>
                {/* Language Switcher */}
                <div className='flex gap-2 mb-4'>
                    <button
                        type="button"
                        className={`px-4 py-2 rounded-lg ${currentLang === 'ru' ? 'bg-violet100 text-white' : 'bg-gray-200'}`}
                        onClick={() => handleLangSwitch('ru')}
                    >
                        RU
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 rounded-lg ${currentLang === 'uz' ? 'bg-violet100 text-white' : 'bg-gray-200'}`}
                        onClick={() => handleLangSwitch('uz')}
                    >
                        UZ
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 rounded-lg ${currentLang === 'en' ? 'bg-violet100 text-white' : 'bg-gray-200'}`}
                        onClick={() => handleLangSwitch('en')}
                    >
                        EN
                    </button>
                </div>

                {/* Имя Поле Ввода */}
                <div className='flex flex-col gap-[10px]'>
                    <label>Название компании ({currentLang.toUpperCase()})</label>
                    <Input
                        value={partnerName[currentLang]}
                        onChange={(e) => handleChange(e, 'name')}
                        required
                    />
                </div>

                {/* Tag Field */}
                <div className='flex flex-col gap-[10px] mt-[10px]'>
                    <label>Тэг ({currentLang.toUpperCase()})</label>
                    <Input
                        value={tag[currentLang]}
                        onChange={(e) => handleChange(e, 'tag')}
                    />
                </div>

                {/* Link Field */}
                <div className='flex flex-col gap-[10px] mt-[10px]'>
                    <label>Ссылка</label>
                    <Input
                        value={link}
                        onChange={(e) => handleChange(e, 'link')}
                    />
                </div>

                {/* Order Number Field */}
                <div className='flex flex-col gap-[10px] mt-[10px]'>
                    <label>Порядковый номер</label>
                    <Input
                        type="number"
                        value={orderNum}
                        onChange={(e) => setOrderNum(e.target.value)}
                    />
                </div>

                {/* Blur Switch */}
                <div className="mt-[10px]">
                    <label className='text-[18px] font-bold'>Размытое изображение?</label>
                    <Switch
                        checked={blur}
                        onChange={(checked) => setBlur(checked)}
                        className="ml-2"
                    />
                </div>

                {/* File Upload Field */}
                <div className='flex flex-col gap-[10px] mt-[10px]'>
                    <label className="font-bold text-[18px]">Фото</label>
                    <Upload
                        name="photo"
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleFileUpload}
                    >
                        {fileList.length > 0 ? (
                            <img src={URL.createObjectURL(fileList[0].originFileObj)} alt="photo" style={{ width: '100%' }} />
                        ) : (
                            <div className="w-[40px] h-[40px] flex items-center justify-center">
                                <UploadOutlined className="text-violet100 w-full h-full text-[40px]" />
                            </div>
                        )}
                    </Upload>
                    {fileList.length > 0 && (
                        <Button danger onClick={handleRemoveFile} className="mt-[10px]">
                            Удалить файл
                        </Button>
                    )}
                </div>

                {/* Submit Button */}
                <Button type="primary" htmlType="submit" className="mt-[20px] w-full bg-violet100 text-white">
                    Добавить Партнер
                </Button>
            </form>
        </Modal>
    );
};

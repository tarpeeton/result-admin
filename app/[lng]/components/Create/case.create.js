"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Modal, Button, Upload } from "antd";
import { createCase } from "../../lib/api/create.api";

import { MdDeleteForever } from "react-icons/md"; // O'chirish tugmasi uchun ikonka
import toastr from "toastr";
import "toastr/build/toastr.min.css"; // Toastr uchun CSS
import { IoClose } from "react-icons/io5";
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdDelete } from "react-icons/md";


export const CaseCreateModal = ({ isCloseCreateModal, visible, onCreateSuccess }) => {
  const [currentLang, setCurrentLang] = useState("ru"); // Hozirgi tanlangan til uchun holat
  const router = useRouter();

  // Dastlabki holat
  const [serviceData, setServiceData] = useState({
    banner: {
      title: { uz: "", ru: "", en: "" },
      shortDescription: { uz: "", ru: "", en: "" },
    },
    query: [{ uz: "", ru: "", en: "" }],
    queryDescription: { uz: "", ru: "", en: "" },
    providedService: [
      {
        name: { uz: "", ru: "", en: "" },
        description: { uz: "", ru: "", en: "" },
        orderNum: 0,
        active: true,
      },
    ],
    obtainedResult: [
      {
        name: { uz: "", ru: "", en: "" },
        result: { uz: "", ru: "", en: "" },
        orderNum: 0,
      },
    ],
    resultDescription: { uz: "", ru: "", en: "" },
    type: [{ id: 1 }], // Dastlabki typeID 1
    bannerBackground: null,
    bannerPhoto: null,
    resultSiteLink: '', // Bir tildagi maydon
    resultInstagramLink: '', // Bir tildagi maydon
    resultTelegramLink: '', // Bir tildagi maydon
    slider: [],
    orderNum: 1,
    active: true,
    main: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hozirgi tilga asoslangan maydonlarni boshqarish
  const handleChange = (e, field) => {
    setServiceData((prevState) => ({
      ...prevState,
      banner: {
        ...prevState.banner,
        [field]: { ...prevState.banner[field], [currentLang]: e.target.value },
      },
    }));
  };

  // Querylarni boshqarish
  const handleQueryChange = (e, queryIndex, lang) => {
    const newQuery = [...serviceData.query];
    newQuery[queryIndex][lang] = e.target.value;
    setServiceData({ ...serviceData, query: newQuery });
  };

  const handleAddQuery = () => {
    setServiceData((prevData) => ({
      ...prevData,
      query: [...prevData.query, { uz: "", ru: "", en: "" }],
    }));
  };

  const handleRemoveQuery = (queryIndex) => {
    const newQuery = serviceData.query.filter((_, index) => index !== queryIndex);
    setServiceData({ ...serviceData, query: newQuery });
  };

  // providedService boshqarish
  const handleProvidedServiceChange = (e, index, lang, field) => {
    const updatedServices = [...serviceData.providedService];
    updatedServices[index][field][lang] = e.target.value;
    setServiceData({ ...serviceData, providedService: updatedServices });
  };

  const handleAddProvidedService = () => {
    setServiceData((prevData) => ({
      ...prevData,
      providedService: [
        ...prevData.providedService,
        { name: { uz: "", ru: "", en: "" }, description: { uz: "", ru: "", en: "" }, orderNum: 0, active: true },
      ],
    }));
  };

  // obtainedResult boshqarish
  const handleObtainedResultChange = (e, index, lang, field) => {
    const updatedResults = [...serviceData.obtainedResult];
    updatedResults[index][field][lang] = e.target.value;
    setServiceData({ ...serviceData, obtainedResult: updatedResults });
  };

  const handleAddObtainedResult = () => {
    setServiceData((prevData) => ({
      ...prevData,
      obtainedResult: [
        ...prevData.obtainedResult,
        { name: { uz: "", ru: "", en: "" }, result: { uz: "", ru: "", en: "" }, orderNum: 0 },
      ],
    }));
  };

  // Type boshqarish
  const handleTypeChange = (e, index) => {
    const updatedTypes = [...serviceData.type];
    updatedTypes[index].id = e.target.value;
    setServiceData({ ...serviceData, type: updatedTypes });
  };

  const handleAddType = () => {
    setServiceData((prevData) => ({
      ...prevData,
      type: [...prevData.type, { id: "" }],
    }));
  };

  const handleRemoveType = (index) => {
    const updatedTypes = serviceData.type.filter((_, i) => i !== index);
    setServiceData({ ...serviceData, type: updatedTypes });
  };

  // Fayllarni yuklash
  const handleFileUpload = ({ file }, field) => {
    setServiceData((prevData) => ({
      ...prevData,
      [field]: file,
    }));
  };

  const handleFileRemove = (field) => {
    setServiceData((prevData) => ({
      ...prevData,
      [field]: null,
    }));
  };

  const handleSliderUpload = ({ fileList }) => {
    setServiceData((prevData) => ({
      ...prevData,
      slider: fileList,
    }));
  };

  const handleSliderRemove = (file) => {
    const updatedSlider = serviceData.slider.filter(
      (item) => item.uid !== file.uid
    );
    setServiceData((prevData) => ({
      ...prevData,
      slider: updatedSlider,
    }));
  };

  // Formani yuborish
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const jsonData = {
      banner: {
        title: serviceData.banner.title,
        shortDescription: serviceData.banner.shortDescription,
      },
      query: serviceData.query,
      queryDescription: serviceData.queryDescription,
      providedService: serviceData.providedService,
      obtainedResult: serviceData.obtainedResult,
      resultDescription: serviceData.resultDescription,
      orderNum: serviceData.orderNum,
      active: serviceData.active,
      main: serviceData.main,
      type: serviceData.type,
      resultSiteLink: serviceData.resultSiteLink,
      resultInstagramLink: serviceData.resultInstagramLink,
      resultTelegramLink: serviceData.resultTelegramLink,
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(jsonData));

    // Fayllarni qo'shish
    if (serviceData.bannerPhoto) {
      formData.append("banner-photo", serviceData.bannerPhoto);
    }
    if (serviceData.bannerBackground) {
      formData.append("banner-background", serviceData.bannerBackground);
    }
    if (serviceData.slider.length > 0) {
      serviceData.slider.forEach((file) => {
        formData.append("slider", file.originFileObj);
      });
    }

    try {
      await createCase(formData); // createCase API chaqiruvi
      toastr.success("КЕЙС успешно создан!");
      isCloseCreateModal();
      onCreateSuccess(); // Ma'lumotlarni yangilash funksiyasini chaqiramiz
    } catch (error) {
      toastr.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<span className="text-[30px] font-bold">Создать CASE</span>}
      visible={visible}
      onCancel={isCloseCreateModal}
      footer={null}
      width={800}
      closeIcon={<IoClose size={30} className='text-titleDark'/>}
    >
      <form className='mt-[30px]'>
        {/* Tilni almashtirish */}
        <div className="flex gap-2 mb-4">
          {["ru", "uz", "en"].map((lang) => (
            <button
              key={lang}
              type="button"
              className={`px-4 py-2 rounded-lg ${
                currentLang === lang ? "bg-violet100 text-white" : "bg-gray-200"
              }`}
              onClick={() => setCurrentLang(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Banner maydonlari */}
        <div className="flex flex-col gap-[10px]">
          <label className='editLabelModal'>Название баннера ({currentLang.toUpperCase()})</label>
          <input
            value={serviceData.banner.title[currentLang]}
            onChange={(e) => handleChange(e, "title")}
            required
            className='input_modal'
          />

          <label className='editLabelModal'>Краткое описание ({currentLang.toUpperCase()})</label>
          <input
            value={serviceData.banner.shortDescription[currentLang]}
            onChange={(e) => handleChange(e, "shortDescription")}
            required
            className='input_modal'
          />
        </div>

        {/* Query bo'limi */}
        <div className="mt-4">
          <h3 className="font-bold text-[18px]">Запросы</h3>
          {serviceData.query.map((query, index) => (
            <div key={index} className="flex flex-col gap-[10px] mt-4">
              <label className='editLabelModal'>Запрос ({currentLang.toUpperCase()})</label>
              <input
                value={query[currentLang]}
                onChange={(e) => handleQueryChange(e, index, currentLang)}
                required
                className='input_modal'
              />
              <Button type="danger" onClick={() => handleRemoveQuery(index)} className="mt-2">
                Удалить Запрос
              </Button>
            </div>
          ))}
          <Button onClick={handleAddQuery} className="mt-2">
            Добавить Запрос
          </Button>
        </div>

        <div className="mt-4 flex flex-col">
          <label className='editLabelModal'>Описание Запроса ({currentLang.toUpperCase()})</label>
          <textarea
            value={serviceData.queryDescription[currentLang]}
            onChange={(e) =>
              setServiceData((prevState) => ({
                ...prevState,
                queryDescription: {
                  ...prevState.queryDescription,
                  [currentLang]: e.target.value,
                },
              }))
            }
            required
            className='input_modal'
          />
        </div>

        {/* Provided Services bo'limi */}
        <div className="mt-4">
          <h3 className="font-bold text-[18px]">Предоставленные Услуги</h3>
          {serviceData.providedService.map((service, index) => (
            <div key={index} className="flex flex-col gap-[10px] mt-4">
              <label className='editLabelModal'>Название ({currentLang.toUpperCase()})</label>
              <input
                value={service.name[currentLang]}
                onChange={(e) => handleProvidedServiceChange(e, index, currentLang, "name")}
                required
                className='input_modal'
              />
              <label className='editLabelModal'>Описание ({currentLang.toUpperCase()})</label>
              <textarea
                value={service.description[currentLang]}
                onChange={(e) => handleProvidedServiceChange(e, index, currentLang, "description")}
                required
                className='input_modal'
              />
            </div>
          ))}
          <Button onClick={handleAddProvidedService} className="mt-2">
            Добавить Услугу
          </Button>
        </div>

        {/* Obtained Result bo'limi */}
        <div className="mt-4">
          <h3 className="font-bold text-[18px]">Полученные Результаты</h3>
          {serviceData.obtainedResult.map((result, index) => (
            <div key={index} className="flex flex-col gap-[10px] mt-4">
              <label className='editLabelModal'>Название ({currentLang.toUpperCase()})</label>
              <input
                value={result.name[currentLang]}
                onChange={(e) => handleObtainedResultChange(e, index, currentLang, "name")}
                required
                className='input_modal'
              />
              <label className='editLabelModal'>Результат ({currentLang.toUpperCase()})</label>
              <textarea
                value={result.result[currentLang]}
                onChange={(e) => handleObtainedResultChange(e, index, currentLang, "result")}
                required
                className='input_modal'
              />
            </div>
          ))}
          <Button onClick={handleAddObtainedResult} className="mt-2">
            Добавить Результат
          </Button>
        </div>

        <div className="mt-4 flex flex-col">
          <label className='editLabelModal'>Описание Результата ({currentLang.toUpperCase()})</label>
          <textarea
            value={serviceData.resultDescription[currentLang]}
            onChange={(e) =>
              setServiceData((prevState) => ({
                ...prevState,
                resultDescription: {
                  ...prevState.resultDescription,
                  [currentLang]: e.target.value,
                },
              }))
            }
            required
            className='input_modal'
          />
        </div>

        {/* Type bo'limi */}
        <div className="mt-4">
          <h3 className="font-bold text-[18px]">Типы</h3>
          {serviceData.type.map((type, index) => (
            <div key={index} className="flex items-center gap-[10px] mt-4">
              <input
                placeholder="Введите ID типа"
                value={type.id}
                onChange={(e) => handleTypeChange(e, index)}
                required
                className='input_modal w-[95%]'
              />
              <Button type="danger" onClick={() => handleRemoveType(index)}>
                <MdDelete  size={30} className='text-red-500'/>
              </Button>
            </div>
          ))}
          <Button onClick={handleAddType} className="mt-2">
            Добавить Тип
          </Button>
        </div>

        {/* Fayl yuklash bo'limi */}
        <div className="flex flex-row gap-[10px] mt-4">
          {/* Banner Photo yuklash */}
          <div className="flex flex-col gap-[10px] relative">
            <label className="font-bold text-[18px]">Фото баннера</label>
            <Upload
              name="banner-photo"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={(info) => handleFileUpload(info, "bannerPhoto")}
              onRemove={() => handleFileRemove("bannerPhoto")}
            >
              {serviceData.bannerPhoto ? (
                <img src={URL.createObjectURL(serviceData.bannerPhoto)} alt="bannerPhoto" style={{ width: "100%" }} />
              ) : (
                <div className="w-[40px] h-[40px] flex items-center justify-center">
                  <IoIosAddCircleOutline className="text-violet100" size={50} />
                </div>
              )}
            </Upload>
            {serviceData.bannerPhoto && (
              <MdDeleteForever
                className="absolute top-[50px] right-[20px] text-red-600 cursor-pointer"
                size={24}
                onClick={() => handleFileRemove("bannerPhoto")}
              />
            )}
          </div>

          {/* Banner Background yuklash */}
          <div className="flex flex-col gap-[10px] relative">
            <label className="font-bold text-[18px]">Фон баннера</label>
            <Upload
              name="banner-background"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={(info) => handleFileUpload(info, "bannerBackground")}
              onRemove={() => handleFileRemove("bannerBackground")}
            >
              {serviceData.bannerBackground ? (
                <img src={URL.createObjectURL(serviceData.bannerBackground)} alt="bannerBackground" style={{ width: "100%" }} />
              ) : (
                <div className="w-[40px] h-[40px] flex items-center justify-center">
                   <IoIosAddCircleOutline className="text-violet100" size={50} />
                </div>
              )}
            </Upload>
            {serviceData.bannerBackground && (
              <MdDeleteForever
                className="absolute top-[50px] right-[20px] text-red-600 cursor-pointer"
                size={24}
                onClick={() => handleFileRemove("bannerBackground")}
              />
            )}
          </div>
        </div>

        {/* Slider uchun ko'p fayl yuklash */}
        <div className="flex flex-col gap-[10px] mt-4">
          <label className="font-bold text-[18px]">Слайдер (множество файлов)</label>
          <Upload
            multiple
            name="slider"
            listType="picture-card"
            beforeUpload={() => false}
            onChange={(info) => handleSliderUpload(info)}
            onRemove={handleSliderRemove}
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center">
              <IoIosAddCircleOutline className="text-violet100" size={50} />
            </div>
          </Upload>
        </div>

        {/* Sayt, Instagram va Telegram linklari */}
        <div className="mt-4 flex flex-col">
          <label className='editLabelModal'>Ссылка на сайт</label>
          <input
            value={serviceData.resultSiteLink}
            onChange={(e) => setServiceData((prevState) => ({ ...prevState, resultSiteLink: e.target.value }))}
            required
            className='mt-[10px] input_modal'
          />
        </div>

        <div className="mt-4 flex flex-col">
          <label className='editLabelModal'>Ссылка на Instagram</label>
          <input
            value={serviceData.resultInstagramLink}
            onChange={(e) => setServiceData((prevState) => ({ ...prevState, resultInstagramLink: e.target.value }))}
            required
            className='mt-[10px] input_modal'
          />
        </div>

        <div className="mt-4 flex flex-col">
          <label className='editLabelModal'>Ссылка на Telegram</label>
          <input
            value={serviceData.resultTelegramLink}
            onChange={(e) => setServiceData((prevState) => ({ ...prevState, resultTelegramLink: e.target.value }))}
            required
            className='mt-[10px]  input_modal'
          />
        </div>

        {/* Xatolikni ko'rsatish */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Yuborish tugmasi */}
        <div className="w-full flex justify-end">
          <Button
            htmlType="submit"
            loading={loading}
            onClick={handleSubmit}
            className="w-[30%] mt-[12px] py-[30px] px-[24px] rounded-full bg-violet100 text-white font-bold"
          >
            {loading ? "Сохраняется.." : "Сохранить"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

"use client";
import { useState } from "react";
import { Modal, Input, Button, Upload } from "antd";
import { FiPlus } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md"; // Icon for delete button
import { createCase } from "../../lib/api/create.api";
import toastr from "toastr";
import "toastr/build/toastr.min.css"; // Toastr CSS for notifications

export const CaseCreateModal = ({ isCloseCreateModal, visible }) => {
  const [currentLang, setCurrentLang] = useState("ru"); // State for the current selected language

  // Initial state for the service data
  const [serviceData, setServiceData] = useState({
    banner: {
      title: { uz: "", ru: "", en: "" },
      link: "",
      shortDescription: { uz: "", ru: "", en: "" },
    },
    query: [{ uz: "", ru: "", en: "" }], // Array for dynamic query inputs
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
    bannerBackground: null,
    bannerPhoto: null,
    bannerLogo: null,
    slider: [],
    orderNum: 1,
    active: true,
    main: true,
    type: [{ id: 3 }],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes for nested fields based on the current language
  const handleChange = (e, field) => {
    setServiceData((prevState) => ({
      ...prevState,
      banner: {
        ...prevState.banner,
        [field]: { ...prevState.banner[field], [currentLang]: e.target.value },
      },
    }));
  };

  // Handle link and shortDescription changes
  const handleBannerChange = (e, field) => {
    setServiceData((prevState) => ({
      ...prevState,
      banner: {
        ...prevState.banner,
        [field]: e.target.value,
      },
    }));
  };

  // Handle dynamic query input changes
  const handleQueryChange = (e, queryIndex, lang) => {
    const newQuery = [...serviceData.query];
    newQuery[queryIndex][lang] = e.target.value;
    setServiceData({ ...serviceData, query: newQuery });
  };

  // Add a new query block
  const handleAddQuery = () => {
    setServiceData((prevData) => ({
      ...prevData,
      query: [...prevData.query, { uz: "", ru: "", en: "" }],
    }));
  };

  // Remove a query block
  const handleRemoveQuery = (queryIndex) => {
    const newQuery = serviceData.query.filter((_, index) => index !== queryIndex);
    setServiceData({ ...serviceData, query: newQuery });
  };

  // Handle dynamic providedService input changes
  const handleProvidedServiceChange = (e, index, lang, field) => {
    const updatedServices = [...serviceData.providedService];
    updatedServices[index][field][lang] = e.target.value;
    setServiceData({ ...serviceData, providedService: updatedServices });
  };

  // Add a new providedService block
  const handleAddProvidedService = () => {
    setServiceData((prevData) => ({
      ...prevData,
      providedService: [
        ...prevData.providedService,
        { name: { uz: "", ru: "", en: "" }, description: { uz: "", ru: "", en: "" }, orderNum: 0, active: true },
      ],
    }));
  };

  // Handle dynamic obtainedResult input changes
  const handleObtainedResultChange = (e, index, lang, field) => {
    const updatedResults = [...serviceData.obtainedResult];
    updatedResults[index][field][lang] = e.target.value;
    setServiceData({ ...serviceData, obtainedResult: updatedResults });
  };

  // Add a new obtainedResult block
  const handleAddObtainedResult = () => {
    setServiceData((prevData) => ({
      ...prevData,
      obtainedResult: [
        ...prevData.obtainedResult,
        { name: { uz: "", ru: "", en: "" }, result: { uz: "", ru: "", en: "" }, orderNum: 0 },
      ],
    }));
  };

  // Handle file uploads for single files
  const handleFileUpload = ({ file }, field) => {
    setServiceData((prevData) => ({
      ...prevData,
      [field]: file,
    }));
  };

  // Handle removing uploaded files
  const handleFileRemove = (field) => {
    setServiceData((prevData) => ({
      ...prevData,
      [field]: null,
    }));
  };

  // Handle multiple file uploads for slider
  const handleSliderUpload = ({ fileList }) => {
    setServiceData((prevData) => ({
      ...prevData,
      slider: fileList,
    }));
  };

  // Handle removing files from the slider
  const handleSliderRemove = (file) => {
    const updatedSlider = serviceData.slider.filter(
      (item) => item.uid !== file.uid
    );
    setServiceData((prevData) => ({
      ...prevData,
      slider: updatedSlider,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const jsonData = {
      banner: {
        title: serviceData.banner.title,
        link: serviceData.banner.link,
        shortDescription: serviceData.banner.shortDescription,
      },
      query: serviceData.query,
      providedService: serviceData.providedService,
      obtainedResult: serviceData.obtainedResult,
      orderNum: serviceData.orderNum,
      active: serviceData.active,
      main: serviceData.main,
      type: serviceData.type,
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(jsonData));

    // Append files if available
    if (serviceData.bannerPhoto) {
      formData.append("banner-photo", serviceData.bannerPhoto);
    }
    if (serviceData.bannerLogo) {
      formData.append("banner-logo", serviceData.bannerLogo);
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
      await createCase(formData); // Assuming createCase is the API call function
      toastr.success("Сервис успешно создан!");
      isCloseCreateModal();
    } catch (error) {
      toastr.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<span className="text-[18px] font-bold">Создать Сервис</span>}
      visible={visible}
      onCancel={isCloseCreateModal}
      footer={null}
      width={800}
    >
      <form>
        {/* Custom Language Switcher */}
        <div className="flex gap-2 mb-4">
          {["ru", "uz", "en"].map((lang) => (
            <button
              key={lang}
              type="button"
              className={`px-4 py-2 rounded-lg ${currentLang === lang ? "bg-violet100 text-white" : "bg-gray-200"}`}
              onClick={() => setCurrentLang(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Banner Fields */}
        <div className="flex flex-col gap-[10px]">
          <label>Название баннера ({currentLang.toUpperCase()})</label>
          <Input
            value={serviceData.banner.title[currentLang]}
            onChange={(e) => handleChange(e, "title")}
            required
          />

          <label>Ссылка баннера</label>
          <Input
            value={serviceData.banner.link}
            onChange={(e) => handleBannerChange(e, "link")}
            required
          />

          <label>Краткое описание ({currentLang.toUpperCase()})</label>
          <Input
            value={serviceData.banner.shortDescription[currentLang]}
            onChange={(e) => handleChange(e, "shortDescription")}
            required
          />
        </div>

        {/* Dynamic Query Section */}
        <div className="mt-4">
          <h3 className="font-bold text-[18px]">Запросы</h3>
          {serviceData.query.map((query, index) => (
            <div key={index} className="flex flex-col gap-[10px] mt-4">
              <label>Запрос ({currentLang.toUpperCase()})</label>
              <Input
                value={query[currentLang]}
                onChange={(e) => handleQueryChange(e, index, currentLang)}
                required
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

        {/* Provided Services Section */}
        <div className="mt-4">
          <h3 className="font-bold text-[18px]">Предоставленные Услуги</h3>
          {serviceData.providedService.map((service, index) => (
            <div key={index} className="flex flex-col gap-[10px] mt-4">
              <label>Название ({currentLang.toUpperCase()})</label>
              <Input
                value={service.name[currentLang]}
                onChange={(e) => handleProvidedServiceChange(e, index, currentLang, "name")}
                required
              />
              <label>Описание ({currentLang.toUpperCase()})</label>
              <Input.TextArea
                value={service.description[currentLang]}
                onChange={(e) => handleProvidedServiceChange(e, index, currentLang, "description")}
                required
              />
            </div>
          ))}
          <Button onClick={handleAddProvidedService} className="mt-2">
            Добавить Услугу
          </Button>
        </div>

        {/* Obtained Result Section */}
        <div className="mt-4">
          <h3 className="font-bold text-[18px]">Полученные Результаты</h3>
          {serviceData.obtainedResult.map((result, index) => (
            <div key={index} className="flex flex-col gap-[10px] mt-4">
              <label>Название ({currentLang.toUpperCase()})</label>
              <Input
                value={result.name[currentLang]}
                onChange={(e) => handleObtainedResultChange(e, index, currentLang, "name")}
                required
              />
              <label>Результат ({currentLang.toUpperCase()})</label>
              <Input.TextArea
                value={result.result[currentLang]}
                onChange={(e) => handleObtainedResultChange(e, index, currentLang, "result")}
                required
              />
            </div>
          ))}
          <Button onClick={handleAddObtainedResult} className="mt-2">
            Добавить Результат
          </Button>
        </div>

        {/* File Upload Section */}
        <div className="flex flex-row gap-[10px] mt-4">
          {/* Banner Photo Upload */}
          <div className="flex flex-col gap-[10px] relative">
            <label className="font-bold text-[18px]">Фото баннера</label>
            <Upload
              name="banner-photo"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={(info) => handleFileUpload(info, "bannerPhoto")}
              onRemove={() => handleFileRemove("bannerPhoto")} // Add file removal functionality
            >
              {serviceData.bannerPhoto ? (
                <img src={URL.createObjectURL(serviceData.bannerPhoto)} alt="bannerPhoto" style={{ width: "100%" }} />
              ) : (
                <div className="w-[40px] h-[40px] flex items-center justify-center">
                  <FiPlus className="text-violet100 w-full h-full" />
                </div>
              )}
            </Upload>
            {serviceData.bannerPhoto && (
              <MdDeleteForever
                className="absolute top-1 right-1 text-violet100 cursor-pointer"
                size={24}
                onClick={() => handleFileRemove("bannerPhoto")}
              />
            )}
          </div>

          {/* Banner Logo Upload */}
          <div className="flex flex-col gap-[10px] relative">
            <label className="font-bold text-[18px]">Логотип баннера</label>
            <Upload
              name="banner-logo"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={(info) => handleFileUpload(info, "bannerLogo")}
              onRemove={() => handleFileRemove("bannerLogo")} // Add file removal functionality
            >
              {serviceData.bannerLogo ? (
                <img src={URL.createObjectURL(serviceData.bannerLogo)} alt="bannerLogo" style={{ width: "100%" }} />
              ) : (
                <div className="w-[40px] h-[40px] flex items-center justify-center">
                  <FiPlus className="text-violet100 w-full h-full" />
                </div>
              )}
            </Upload>
            {serviceData.bannerLogo && (
              <MdDeleteForever
                className="absolute top-1 right-1 text-violet100 cursor-pointer"
                size={24}
                onClick={() => handleFileRemove("bannerLogo")}
              />
            )}
          </div>

          {/* Banner Background Upload */}
          <div className="flex flex-col gap-[10px] relative">
            <label className="font-bold text-[18px]">Фон баннера</label>
            <Upload
              name="banner-background"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={(info) => handleFileUpload(info, "bannerBackground")}
              onRemove={() => handleFileRemove("bannerBackground")} // Add file removal functionality
            >
              {serviceData.bannerBackground ? (
                <img src={URL.createObjectURL(serviceData.bannerBackground)} alt="bannerBackground" style={{ width: "100%" }} />
              ) : (
                <div className="w-[40px] h-[40px] flex items-center justify-center">
                  <FiPlus className="text-violet100 w-full h-full" />
                </div>
              )}
            </Upload>
            {serviceData.bannerBackground && (
              <MdDeleteForever
                className="absolute top-1 right-1 text-violet100 cursor-pointer"
                size={24}
                onClick={() => handleFileRemove("bannerBackground")}
              />
            )}
          </div>
        </div>

        {/* Slider Multiple Upload */}
        <div className="flex flex-col gap-[10px] mt-4">
          <label className="font-bold text-[18px]">Слайдер (множество файлов)</label>
          <Upload
            multiple
            name="slider"
            listType="picture-card"
            beforeUpload={() => false}
            onChange={(info) => handleSliderUpload(info)}
            onRemove={handleSliderRemove} // Add file removal functionality
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center">
              <FiPlus className="text-violet100 w-full h-full" />
            </div>
          </Upload>
          {serviceData.slider.map((file, index) => (
            <div key={index} className="relative inline-block">
              <img
                src={URL.createObjectURL(file.originFileObj)}
                alt={`slider_${index}`}
                style={{ width: "100px", height: "100px" }}
              />
              <MdDeleteForever
                className="absolute top-1 right-1 text-violet100 cursor-pointer"
                size={24}
                onClick={() => handleSliderRemove(file)}
              />
            </div>
          ))}
        </div>

        {/* Error Handling */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
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




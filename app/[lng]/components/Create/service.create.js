"use client";
import { useState } from "react";
import { Modal, Input, Button, Upload } from "antd";
import { FiPlus } from "react-icons/fi";
import { createService } from "../../lib/api/create.api";
import toastr from "toastr";
import "toastr/build/toastr.min.css"; // Toastr CSS for notifications

export const ServiceCreateModal = ({ isCloseCreateModal, visible }) => {
  const [currentLang, setCurrentLang] = useState('ru'); // State for the current selected language

  const [serviceData, setServiceData] = useState({
    name: { uz: '', ru: '', en: '' },
    shortDescription: { uz: '', ru: '', en: '' },
    description: { uz: '', ru: '', en: '' },
    photo: null,
    icon: null,
    advantage: [
      {
        name: { uz: '', ru: '', en: '' },
        description: { uz: '', ru: '', en: '' },
        colorCode: null,
        // orderNum: 0,
        active: true
      }
    ],
    plan: [
      {
        name: { uz: '', ru: '', en: '' },
        shortDescription: { uz: '', ru: '', en: '' },
        option: [{ uz: '', ru: '', en: '' }],
        price: '',
        // orderNum: 0,
        active: true
      }
    ],
    // orderNum: 0,
    active: true,
    main: true,
    type: [{ id: '3' }]
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes for the fields based on the current language
  const handleChange = (e, field) => {
    setServiceData({
      ...serviceData,
      [field]: { ...serviceData[field], [currentLang]: e.target.value }
    });
  };

  // Handle plan input changes
  const handlePlanChange = (e, planIndex, field, lang) => {
    const newPlans = [...serviceData.plan];
    newPlans[planIndex][field][lang] = e.target.value;
    setServiceData({ ...serviceData, plan: newPlans });
  };

  // Handle option input changes
  const handleOptionChange = (e, planIndex, optionIndex, lang) => {
    const newPlans = [...serviceData.plan];
    newPlans[planIndex].option[optionIndex][lang] = e.target.value;
    setServiceData({ ...serviceData, plan: newPlans });
  };

  // Add new option to a specific plan
  const handleAddOption = (planIndex) => {
    const newPlans = [...serviceData.plan];
    newPlans[planIndex].option.push({ uz: '', ru: '', en: '' });
    setServiceData({ ...serviceData, plan: newPlans });
  };

  // Handle adding plans
  const handleAddPlan = () => {
    const newPlan = {
      name: { uz: '', ru: '', en: '' },
      shortDescription: { uz: '', ru: '', en: '' },
      option: [{ uz: '', ru: '', en: '' }],
      price: '',
      orderNum: 0,
      active: true
    };
    setServiceData(prevData => ({
      ...prevData,
      plan: [...prevData.plan, newPlan]
    }));
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true);

    const jsonData = {
      name: serviceData.name,
      shortDescription: serviceData.shortDescription,
      description: serviceData.description,
      advantage: serviceData.advantage,
      plan: serviceData.plan,
      orderNum: serviceData.orderNum,
      active: serviceData.active,
      main: serviceData.main,
      type: serviceData.type
    };

    const formData = new FormData();
    formData.append('json', JSON.stringify(jsonData));

    // Append files separately
    if (serviceData.photo) {
      formData.append('photo', serviceData.photo);
    }
    if (serviceData.icon) {
      formData.append('icon', serviceData.icon);
    }

    try {
      await createService(formData);
      toastr.success("Сервис успешно создан!");
      isCloseCreateModal();
    } catch (error) {
      toastr.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleFileUpload = ({ file }, field) => {
    setServiceData((prevData) => ({
      ...prevData,
      [field]: file // Either 'photo' or 'icon'
    }));
  };

  // Language switcher handler
  const handleLangSwitch = (lang) => {
    setCurrentLang(lang); // Update the current language selection
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

        {/* Name Fields */}
        <div className="flex flex-col gap-[10px]">
          <label>Название ({currentLang.toUpperCase()})</label>
          <Input
            value={serviceData.name[currentLang]}
            onChange={(e) => handleChange(e, 'name')}
            required
          />
        </div>

        {/* Short Description Fields */}
        <div className="flex flex-col gap-[10px] mt-4">
          <label>Краткое Описание ({currentLang.toUpperCase()})</label>
          <Input
            value={serviceData.shortDescription[currentLang]}
            onChange={(e) => handleChange(e, 'shortDescription')}
            required
          />
        </div>

        {/* Description Fields */}
        <div className="flex flex-col gap-[10px] mt-4">
          <label>Описание ({currentLang.toUpperCase()})</label>
          <Input.TextArea
            value={serviceData.description[currentLang]}
            onChange={(e) => handleChange(e, 'description')}
            required
          />
        </div>

        {/* Plan Section */}
        <div className="mt-4">
          <h3 className="font-bold text-[18px]">Планы</h3>
          {serviceData.plan.map((plan, planIndex) => (
            <div key={planIndex} className="flex flex-col gap-[10px] mt-4">
              <label>Название ({currentLang.toUpperCase()})</label>
              <Input
                value={plan.name[currentLang]}
                onChange={(e) => handlePlanChange(e, planIndex, 'name', currentLang)}
                required
              />
              <label>Краткое Описание ({currentLang.toUpperCase()})</label>
              <Input
                value={plan.shortDescription[currentLang]}
                onChange={(e) => handlePlanChange(e, planIndex, 'shortDescription', currentLang)}
                required
              />
              <label>Цена</label>
              <Input
                value={plan.price}
                onChange={(e) => {
                  const newPlans = [...serviceData.plan];
                  newPlans[planIndex].price = e.target.value.replace(/\D/g, ''); // Only allow numbers
                  setServiceData({ ...serviceData, plan: newPlans });
                }}
                required
              />

              {/* Option Section */}
              <h4 className='font-bold text-[18px]'>Опции</h4>
              {plan.option.map((option, optionIndex) => (
                <div key={optionIndex} className="flex flex-col gap-[10px] mt-2">
                  {['uz', 'ru', 'en'].map(lang => (
                    <div key={lang}>
                      <label>Опция ({lang.toUpperCase()})</label>
                      <Input
                        value={option[lang]}
                        onChange={(e) => handleOptionChange(e, planIndex, optionIndex, lang)}
                        required
                      />
                    </div>
                  ))}
                </div>
              ))}
              <Button onClick={() => handleAddOption(planIndex)} className="mt-2">
                Добавить Опцию
              </Button>
            </div>
          ))}
          <Button onClick={handleAddPlan} className="mt-2">
            Добавить План
          </Button>
        </div>

        {/* File Upload Section */}
        <div className="flex flex-row gap-[10px] mt-4">
          <div className="flex flex-col gap-[10px]">
            <label className="font-bold text-[18px]">Фото</label>
            <Upload
              name="photo"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={(info) => handleFileUpload(info, 'photo')}
            >
              {serviceData.photo ? (
                <img src={URL.createObjectURL(serviceData.photo)} alt="photo" style={{ width: '100%' }} />
              ) : (
                <div className="w-[40px] h-[40px] flex items-center justify-center">
                  <FiPlus className="text-violet100 w-full h-full" />
                </div>
              )}
            </Upload>
          </div>
          <div className="flex flex-col gap-[10px]">
            <label className="font-bold text-[18px]">Иконка</label>
            <Upload
              name="icon"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={(info) => handleFileUpload(info, 'icon')}
            >
              {serviceData.icon ? (
                <img src={URL.createObjectURL(serviceData.icon)} alt="icon" style={{ width: '100%' }} />
              ) : (
                <div className="w-[40px] h-[40px] flex items-center justify-center">
                  <FiPlus className="text-violet100 w-full h-full" />
                </div>
              )}
            </Upload>
          </div>
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
            {loading ? 'Сохраняется..' : 'Сохранить'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

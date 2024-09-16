"use client";
import { useState } from "react";
import { Modal, Input, Button, Upload } from "antd";
import { FiPlus } from "react-icons/fi";
import { createService } from "../../lib/api/create.api";
import toastr from "toastr";
import "toastr/build/toastr.min.css"; // Toastr CSSni import qilish

export const ServiceCreateModal = ({ isCloseCreateModal, visible }) => {
  const [serviceData, setServiceData] = useState({
    name: { uz: '', ru: '', en: '' },
    shortDescription: { uz: '', ru: '', en: '' },
    description: { uz: '', ru: '', en: '' },
    photo: null,  // New field for the photo upload
    icon: null,   // For the icon upload
    advantage: [
      {
        name: { uz: '', ru: '', en: '' },
        description: { uz: '', ru: '', en: '' },
        colorCode: null, // Set colorCode to null when submitting
        orderNum: 0,
        active: true
      }
    ],
    plan: [
      {
        name: { uz: '', ru: '', en: '' },
        shortDescription: { uz: '', ru: '', en: '' },
        option: [{ uz: '', ru: '', en: '' }],  // Multiple options
        price: '', // Will validate to accept only numbers
        orderNum: 0,
        active: true
      }
    ],
    orderNum: 0,
    active: true,
    main: true,
    type: [{ id: 1 }]
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e, field, lang) => {
    setServiceData((prevData) => ({
      ...prevData,
      [field]: { ...prevData[field], [lang]: e.target.value }
    }));
  };

  const handleAdvantageChange = (e, index, field, lang = null) => {
    const newAdvantages = [...serviceData.advantage];
    if (lang) {
      newAdvantages[index][field][lang] = e.target.value;
    } else {
      newAdvantages[index][field] = e.target.value; // For other fields like description
    }
    setServiceData({ ...serviceData, advantage: newAdvantages });
  };

  const handlePlanChange = (e, index, field, lang = null) => {
    const newPlans = [...serviceData.plan];
    if (lang) {
      newPlans[index][field][lang] = e.target.value;
    } else if (field === 'price') {
      const numericValue = e.target.value.replace(/\D/g, ''); // Allows only numbers for price
      newPlans[index][field] = numericValue;
    } else {
      newPlans[index][field] = e.target.value;
    }
    setServiceData({ ...serviceData, plan: newPlans });
  };

  const handleOptionChange = (e, planIndex, optionIndex, lang) => {
    const newPlans = [...serviceData.plan];
    newPlans[planIndex].option[optionIndex][lang] = e.target.value;
    setServiceData({ ...serviceData, plan: newPlans });
  };

  const handleAddOption = (planIndex) => {
    const newPlans = [...serviceData.plan];
    newPlans[planIndex].option.push({ uz: '', ru: '', en: '' });  // Adding a new empty option
    setServiceData({ ...serviceData, plan: newPlans });
  };

  const handleFileUpload = ({ file }, field) => {
    setServiceData((prevData) => ({
      ...prevData,
      [field]: file // Either 'photo' or 'icon'
    }));
  };

  const handleAddAdvantage = () => {
    const newAdvantage = {
      name: { uz: '', ru: '', en: '' },
      description: { uz: '', ru: '', en: '' },
      colorCode: null,
      orderNum: 0,
      active: true
    };
    setServiceData(prevData => ({
      ...prevData,
      advantage: [...prevData.advantage, newAdvantage]
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Set colorCode to null for all advantages before submission
    const updatedAdvantages = serviceData.advantage.map(advantage => ({
      ...advantage,
      colorCode: null  // Set to null
    }));

    const formData = new FormData();
    const jsonData = {
      name: serviceData.name,
      shortDescription: serviceData.shortDescription,
      description: serviceData.description,
      advantage: updatedAdvantages, // Updated advantages with colorCode null
      plan: serviceData.plan,
      orderNum: serviceData.orderNum,
      active: serviceData.active,
      main: serviceData.main,
      type: serviceData.type
    };

    formData.append('json', JSON.stringify(jsonData));
    if (serviceData.photo) {
      formData.append('photo', serviceData.photo); // Attach photo
    }
    if (serviceData.icon) {
      formData.append('icon', serviceData.icon); // Attach icon
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

  return (
    <Modal
      title="Создать Сервис"
      visible={visible}
      onCancel={isCloseCreateModal}
      footer={null}
      width={800}
    >
      <form onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div className="flex flex-col gap-[10px]">
          <label>Название (UZ)</label>
          <Input
            value={serviceData.name.uz}
            onChange={(e) => handleChange(e, 'name', 'uz')}
            required
          />
          <label>Название (RU)</label>
          <Input
            value={serviceData.name.ru}
            onChange={(e) => handleChange(e, 'name', 'ru')}
            required
          />
          <label>Название (EN)</label>
          <Input
            value={serviceData.name.en}
            onChange={(e) => handleChange(e, 'name', 'en')}
            required
          />
        </div>

        {/* Short Description Fields */}
        <div className="flex flex-col gap-[10px] mt-4">
          <label>Краткое Описание (UZ)</label>
          <Input
            value={serviceData.shortDescription.uz}
            onChange={(e) => handleChange(e, 'shortDescription', 'uz')}
            required
          />
          <label>Краткое Описание (RU)</label>
          <Input
            value={serviceData.shortDescription.ru}
            onChange={(e) => handleChange(e, 'shortDescription', 'ru')}
            required
          />
          <label>Краткое Описание (EN)</label>
          <Input
            value={serviceData.shortDescription.en}
            onChange={(e) => handleChange(e, 'shortDescription', 'en')}
            required
          />
        </div>

        {/* Description Fields */}
        <div className="flex flex-col gap-[10px] mt-4">
          <label>Описание (UZ)</label>
          <Input.TextArea
            value={serviceData.description.uz}
            onChange={(e) => handleChange(e, 'description', 'uz')}
            required
          />
          <label>Описание (RU)</label>
          <Input.TextArea
            value={serviceData.description.ru}
            onChange={(e) => handleChange(e, 'description', 'ru')}
            required
          />
          <label>Описание (EN)</label>
          <Input.TextArea
            value={serviceData.description.en}
            onChange={(e) => handleChange(e, 'description', 'en')}
            required
          />
        </div>

        {/* Advantage Section */}
        <div className="mt-4">
          <h3>Преимущества</h3>
          {serviceData.advantage.map((advantage, index) => (
            <div key={index} className="flex flex-col gap-[10px] mt-4">
              <label>Название (UZ)</label>
              <Input
                value={advantage.name.uz}
                onChange={(e) => handleAdvantageChange(e, index, 'name', 'uz')}
                required
              />
              <label>Описание (RU)</label>
              <Input
                value={advantage.description.ru}
                onChange={(e) => handleAdvantageChange(e, index, 'description', 'ru')}
                required
              />
              <label>Описание (EN)</label>
              <Input
                value={advantage.description.en}
                onChange={(e) => handleAdvantageChange(e, index, 'description', 'en')}
                required
              />
            </div>
          ))}
          <Button onClick={handleAddAdvantage} className="mt-2">
            Добавить Преимущество
          </Button>
        </div>

        {/* Plan Section */}
        <div className="mt-4">
          <h3>Планы</h3>
          {serviceData.plan.map((plan, planIndex) => (
            <div key={planIndex} className="flex flex-col gap-[10px] mt-4">
              <label>Название (UZ)</label>
              <Input
                value={plan.name.uz}
                onChange={(e) => handlePlanChange(e, planIndex, 'name', 'uz')}
                required
              />
              <label>Описание (RU)</label>
              <Input
                value={plan.shortDescription.ru}
                onChange={(e) => handlePlanChange(e, planIndex, 'shortDescription', 'ru')}
                required
              />
              <label>Описание (EN)</label>
              <Input
                value={plan.shortDescription.en}
                onChange={(e) => handlePlanChange(e, planIndex, 'shortDescription', 'en')}
                required
              />
              <label>Цена</label>
              <Input
                value={plan.price}
                onChange={(e) => handlePlanChange(e, planIndex, 'price')}
                required
              />

              {/* Option Section */}
              <h4>Опции</h4>
              {plan.option.map((option, optionIndex) => (
                <div key={optionIndex} className="flex flex-col gap-[10px] mt-2">
                  <label>Опция (UZ)</label>
                  <Input
                    value={option.uz}
                    onChange={(e) => handleOptionChange(e, planIndex, optionIndex, 'uz')}
                    required
                  />
                  <label>Опция (RU)</label>
                  <Input
                    value={option.ru}
                    onChange={(e) => handleOptionChange(e, planIndex, optionIndex, 'ru')}
                    required
                  />
                  <label>Опция (EN)</label>
                  <Input
                    value={option.en}
                    onChange={(e) => handleOptionChange(e, planIndex, optionIndex, 'en')}
                    required
                  />
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
        <div className='flex flex-row gap-[10px]'>
          {/* File Upload for Photo */}
          <div className="flex flex-col gap-[10px] mt-4">
            <label>Фото</label>
            <Upload
              name="photo"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false} // Prevent automatic upload
              onChange={(info) => handleFileUpload(info, 'photo')} // Handle photo upload
            >
              {serviceData.photo ? (
                <img src={URL.createObjectURL(serviceData.photo)} alt="photo" style={{ width: '100%' }} />
              ) : (
                <div className="w-[40px] h-[40px] flex items-center justify-center ">
                  <FiPlus className="text-violet100 w-full h-full" />
                </div>
              )}
            </Upload>
          </div>
          {/* File Upload for Icon */}
          <div className="flex flex-col gap-[10px] mt-4">
            <label>Иконка</label>
            <Upload
              name="icon"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false} // Prevent automatic upload
              onChange={(info) => handleFileUpload(info, 'icon')} // Handle icon upload
            >
              {serviceData.icon ? (
                <img src={URL.createObjectURL(serviceData.icon)} alt="icon" style={{ width: '100%' }} />
              ) : (
                <div className="w-[40px] h-[40px] flex items-center justify-center ">
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
            className="w-[30%] mt-[12px] py-[10px] px-[20px] rounded-full bg-violet100 text-white font-bold"
          >
            {loading ? 'Сохраняется..' : 'Сохранить'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

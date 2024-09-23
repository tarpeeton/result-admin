"use client";
import { useState } from "react";
import { Modal, Input, Button, Switch } from "antd";
import { createReview } from '../../lib/api/create.api';
import toastr from "toastr";
import "toastr/build/toastr.min.css"; // Import Toastr CSS

export const CreateReviews = ({ isCloseCreateModal, visible }) => {
  const [currentLang, setCurrentLang] = useState('ru'); // State for the current selected language

  // Initial state for the review object
  const [review, setReview] = useState({
    name: { uz: '', ru: '', en: '' },
    occupation: { uz: '', ru: '', en: '' },
    text: { uz: '', ru: '', en: '' },
    main: false, // Main review toggle
  });

  const [errors, setErrors] = useState({
    name: { uz: false, ru: false, en: false },
    occupation: { uz: false, ru: false, en: false },
    text: { uz: false, ru: false, en: false }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handles switching between languages in the UI
  const handleLangSwitch = (lang) => {
    setCurrentLang(lang); // Update the current language selection
  };

  // Handle input changes for the fields based on the current language
  const handleChange = (e, field) => {
    setReview({
      ...review,
      [field]: { ...review[field], [currentLang]: e.target.value }
    });

    // Validate input fields for errors
    if (e.target.value.trim() === '') {
      setErrors({
        ...errors,
        [field]: { ...errors[field], [currentLang]: true }
      });
    } else {
      setErrors({
        ...errors,
        [field]: { ...errors[field], [currentLang]: false }
      });
    }
  };

  // Handle the main switch toggle (whether to show the review on the main page)
  const handleMainChange = (checked) => {
    setReview({ ...review, main: checked });
  };

  // Submit the review data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createReview(review); // Send the review data to the server
      toastr.success("Отзыв успешно создан!"); // Show success notification in Russian
      isCloseCreateModal(); // Close modal after success
    } catch (error) {
      setError("Не удалось создать отзыв. Попробуйте еще раз."); // Show error notification in Russian
    } finally {
      setLoading(false);
    }
  };

  // Function to manage dynamic input class based on error state
  const inputClass = (field) => {
    return `${errors[field][currentLang] ? 'border-red-500' : ''}`;
  };

  return (
    <Modal
    title={<span className="text-[18px] font-bold">Добавить Отзыв</span>}
      visible={visible}
      onCancel={isCloseCreateModal}
      footer={null}
      width={600}
    >
      <form onSubmit={handleSubmit}>
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

        {/* Name Input Field */}
        <div className='flex flex-col gap-[10px]'>
          <label>Имя </label>
          <Input
            value={review.name[currentLang]}
            onChange={(e) => handleChange(e, 'name')}
            className={inputClass('name')}
            required
          />
        </div>

        {/* Occupation Input Field */}
        <div className='flex flex-col gap-[10px] mt-4'>
          <label>Профессия </label>
          <Input
            value={review.occupation[currentLang]}
            onChange={(e) => handleChange(e, 'occupation')}
            className={inputClass('occupation')}
            required
          />
        </div>

        {/* Review Text Input Field */}
        <div className='flex flex-col gap-[10px] mt-4'>
          <label>Текст отзыва </label>
          <Input.TextArea
            value={review.text[currentLang]}
            onChange={(e) => handleChange(e, 'text')}
            className={inputClass('text')}
            required
          />
        </div>

        {/* Main Toggle Field */}
        <div className="mt-4">
          <label className='text-[18px] text-titleDark font-bold'>Отображать на главной странице?</label>
          <Switch
            checked={review.main}
            onChange={handleMainChange}
            className="ml-2"
          />
        </div>

        {/* Error Handling */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <div className='w-full flex flex-row justify-end'>
          <Button
            htmlType="submit"
            loading={loading}
            className='w-[30%] mt-[12px] flex py-[20px] px-[25px] rounded-full bg-violet100 text-white font-bold'
          >
            {loading ? 'сохраняется..' : 'Сохранить'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

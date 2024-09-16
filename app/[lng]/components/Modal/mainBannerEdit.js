"use client";
import { useState } from "react";
import { Modal, Input, Button } from "antd";
import { createReview } from '../../lib/api/create.api';

export const CreateReviews = ({ isCloseCreateModal, visible }) => {
  const [review, setReview] = useState({
    name: { uz: '', ru: '', en: '' },
    occupation: { uz: '', ru: '', en: '' },
    text: { uz: '', ru: '', en: '' }
  });

  const [errors, setErrors] = useState({
    name: { uz: false, ru: false, en: false },
    occupation: { uz: false, ru: false, en: false },
    text: { uz: false, ru: false, en: false }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e, field, lang) => {
    setReview({
      ...review,
      [field]: { ...review[field], [lang]: e.target.value }
    });

    if (e.target.value.trim() === '') {
      setErrors({
        ...errors,
        [field]: { ...errors[field], [lang]: true }
      });
    } else {
      setErrors({
        ...errors,
        [field]: { ...errors[field], [lang]: false }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createReview(review);
      alert("Review created successfully!");
      isCloseCreateModal(); // Close modal after success
    } catch (error) {
      setError("Failed to create review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field, lang) => {
    return `${errors[field][lang] ? 'border-red-500' : ''}`;
  };

  return (
    <Modal
      title="Добавить Отзыв"
      visible={visible}
      onCancel={isCloseCreateModal}
      footer={null}
      width={600}
    >
      <form onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div className='flex flex-col gap-[10px]'>
          <label>Имя (UZ)</label>
          <Input
            value={review.name.uz}
            onChange={(e) => handleChange(e, 'name', 'uz')}
            className={inputClass('name', 'uz')}
            required
          />
          <label>Имя (RU)</label>
          <Input
            value={review.name.ru}
            onChange={(e) => handleChange(e, 'name', 'ru')}
            className={inputClass('name', 'ru')}
            required
          />
          <label>Имя (EN)</label>
          <Input
            value={review.name.en}
            onChange={(e) => handleChange(e, 'name', 'en')}
            className={inputClass('name', 'en')}
            required
          />
        </div>

        {/* Occupation Fields */}
        <div className='flex flex-col gap-[10px] mt-4'>
          <label>Профессия (UZ)</label>
          <Input
            value={review.occupation.uz}
            onChange={(e) => handleChange(e, 'occupation', 'uz')}
            className={inputClass('occupation', 'uz')}
            required
          />
          <label>Профессия (RU)</label>
          <Input
            value={review.occupation.ru}
            onChange={(e) => handleChange(e, 'occupation', 'ru')}
            className={inputClass('occupation', 'ru')}
            required
          />
          <label>Профессия (EN)</label>
          <Input
            value={review.occupation.en}
            onChange={(e) => handleChange(e, 'occupation', 'en')}
            className={inputClass('occupation', 'en')}
            required
          />
        </div>

        {/* Text Fields */}
        <div className='flex flex-col gap-[10px] mt-4'>
          <label>Текст отзыва (UZ)</label>
          <Input.TextArea
            value={review.text.uz}
            onChange={(e) => handleChange(e, 'text', 'uz')}
            className={inputClass('text', 'uz')}
            required
          />
          <label>Текст отзыва (RU)</label>
          <Input.TextArea
            value={review.text.ru}
            onChange={(e) => handleChange(e, 'text', 'ru')}
            className={inputClass('text', 'ru')}
            required
          />
          <label>Текст отзыва (EN)</label>
          <Input.TextArea
            value={review.text.en}
            onChange={(e) => handleChange(e, 'text', 'en')}
            className={inputClass('text', 'en')}
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <div className='w-full flex  flex-row justify-end'>
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

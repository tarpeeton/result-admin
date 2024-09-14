"use client";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { createReview } from '../../lib/api/create.api';

export const CreateReviews = ({ isCloseCreateModal }) => {
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
      // Pass review data to the API function
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
    return `border-[2px] rounded-[8px] px-[8px] py-[8px] ${errors[field][lang] ? 'border-red-500' : 'border-violet100'}`;
  };

  return (
    // Fullscreen modal with backdrop blur
    <div className='fixed inset-0 z-[99999999999999] flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50'>
      <div className='relative w-[45%] h-full bg-white rounded-[20px] py-[25px] px-[30px] overflow-y-auto'>
        <div className='flex flex-row justify-between border-b border-titleDark20 py-[20px] px-[30px]'>
          <div className='text-titleDark text-[18px]'>Добавить Отзыв</div>
          <button onClick={isCloseCreateModal} className='flex items-center justify-center'>	
            <IoMdClose className='text-[25px] text-titleDark'/>
          </button>
        </div>
        <div className='flex flex-col gap-[20px] py-[20px] px-[30px]'>
          <form onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className='flex flex-col gap-[10px]'>
              <label className='text-titleDark40 text-[15px]'>Имя (UZ)</label>
              <input
                type='text'
                value={review.name.uz}
                onChange={(e) => handleChange(e, 'name', 'uz')}
                className={inputClass('name', 'uz')}
                required
              />
              <label className='text-titleDark40 text-[15px]'>Имя (RU)</label>
              <input
                type='text'
                value={review.name.ru}
                onChange={(e) => handleChange(e, 'name', 'ru')}
                className={inputClass('name', 'ru')}
                required
              />
              <label className='text-titleDark40 text-[15px]'>Имя (EN)</label>
              <input
                type='text'
                value={review.name.en}
                onChange={(e) => handleChange(e, 'name', 'en')}
                className={inputClass('name', 'en')}
                required
              />
            </div>

            {/* Occupation Fields */}
            <div className='flex flex-col gap-[10px]'>
              <label className='text-titleDark40 text-[15px]'>Профессия (UZ)</label>
              <input
                type='text'
                value={review.occupation.uz}
                onChange={(e) => handleChange(e, 'occupation', 'uz')}
                className={inputClass('occupation', 'uz')}
                required
              />
              <label className='text-titleDark40 text-[15px]'>Профессия (RU)</label>
              <input
                type='text'
                value={review.occupation.ru}
                onChange={(e) => handleChange(e, 'occupation', 'ru')}
                className={inputClass('occupation', 'ru')}
                required
              />
              <label className='text-titleDark40 text-[15px]'>Профессия (EN)</label>
              <input
                type='text'
                value={review.occupation.en}
                onChange={(e) => handleChange(e, 'occupation', 'en')}
                className={inputClass('occupation', 'en')}
                required
              />
            </div>

            {/* Text Fields */}
            <div className='flex flex-col gap-[10px]'>
              <label className='text-titleDark40 text-[15px]'>Текст отзыва (UZ)</label>
              <textarea
                value={review.text.uz}
                onChange={(e) => handleChange(e, 'text', 'uz')}
                className={inputClass('text', 'uz')}
                required
              />
              <label className='text-titleDark40 text-[15px]'>Текст отзыва (RU)</label>
              <textarea
                value={review.text.ru}
                onChange={(e) => handleChange(e, 'text', 'ru')}
                className={inputClass('text', 'ru')}
                required
              />
              <label className='text-titleDark40 text-[15px]'>Текст отзыва (EN)</label>
              <textarea
                value={review.text.en}
                onChange={(e) => handleChange(e, 'text', 'en')}
                className={inputClass('text', 'en')}
                required
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 text-white px-[15px] py-[10px] rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Saving...' : 'Save Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

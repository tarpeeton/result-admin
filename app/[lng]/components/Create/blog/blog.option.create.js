import { useState } from 'react'
import { Modal, Upload } from 'antd'
import { MdDeleteForever } from 'react-icons/md'
import { updateBlog } from '@/app/[lng]/lib/api/edit.api'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { createImage } from '@/app/[lng]/lib/api/create.api'
import { IoClose } from 'react-icons/io5'
import { IoIosAddCircleOutline } from 'react-icons/io'

export const BlogOptionCreate = ({ close, open, blogID }) => {
  const [currentLang, setCurrentLang] = useState('ru')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [blogData, setBlogData] = useState({
    option: [
      {
        title: { uz: '', ru: '', en: '' },
        description: { uz: '', ru: '', en: '' },
        orderNum: 0,
      },
    ],
  })

  const handleInputChange = (e, index, field) => {
    const updatedOption = [...blogData.option]
    updatedOption[index][field][currentLang] = e.target.value
    setBlogData({ ...blogData, option: updatedOption })
  }

  const handlePhotoUpload = async (info, index) => {
    const updatedOption = [...blogData.option]
    if (info.file) {
      try {
        const formData = new FormData()
        formData.append('photo', info.file.originFileObj || info.file)

        const response = await createImage(formData)

        updatedOption[index].photo = {
          id: response.data[0].id,
          url: response.data[0].url,
        }

        setBlogData({ ...blogData, option: updatedOption })
        toastr.success('Image uploaded successfully')
      } catch (error) {
        toastr.error('Error uploading image')
        console.error('Image upload error:', error)
      }
    }
  }

  const handleAddOption = () => {
    setBlogData((prevData) => ({
      ...prevData,
      option: [
        ...prevData.option,
        {
          title: { uz: '', ru: '', en: '' },
          description: { uz: '', ru: '', en: '' },
          orderNum: prevData.option.length,
        },
      ],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!blogID) {
      setError('Blog ID is required.')
      toastr.error('Blog ID is missing.')
      setLoading(false)
      return
    }

    try {
      const jsonData = {
        id: blogID,
        option: blogData.option.map((option, index) => ({
          title: option.title,
          description: option.description,
          orderNum: index,
          ...(option.photo ? { photo: option.photo } : {}),
        })),
      }

      await updateBlog(jsonData)
      toastr.success('Blog created successfully')
      close()
    } catch (error) {
      toastr.error('Error creating blog')
      setError(error.message)
      console.error('Submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={<span className="text-[30px] font-bold">Создать новую опцию</span>}
      open={open}
      onCancel={close}
      footer={null}
      width={1200}
      closeIcon={<IoClose size={30} />}
    >
      <form onSubmit={handleSubmit}>
        <div className='language-switcher flex gap-2 mb-4 mt-[30px]'>
          {['ru', 'uz', 'en'].map((lang) => (
            <button
              key={lang}
              type='button'
              className={`px-4 py-2 rounded-lg ${
                currentLang === lang ? 'bg-violet100 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setCurrentLang(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {blogData.option.map((option, index) => (
          <div key={index} className='option-block mb-4 p-4 rounded-lg'>
            <div className='flex flex-col gap-4 mb-2'>
              <div className='flex flex-col'>
                <label className='text-[#A6A6A6] text-[15px] font-medium'>
                  Заголовок статьи ({currentLang.toUpperCase()})
                </label>
                <input
                  value={option.title[currentLang]}
                  onChange={(e) => handleInputChange(e, index, 'title')}
                  required
                  className='mt-[10px] font-robotoFlex text-titleDark text-[18px] font-medium rounded-[10px] border border-[#F0F0F0]'
                />
              </div>

              <div className='flex flex-col'>
                <label className='text-[#A6A6A6] text-[15px] font-medium'>
                  Текст ({currentLang.toUpperCase()})
                </label>
                <textarea
                  value={option.description[currentLang]}
                  onChange={(e) => handleInputChange(e, index, 'description')}
                  required
                  className='p-[20px] text-titleDark font-robotoFlex font-medium text-[18px] border border-[#F0F0F0] outline-violet100 min-h-[150px] mt-[10px]'
                />
              </div>
            </div>

            <div className='flex flex-col border border-[#F0F0F0] rounded-[20px] gap-2 p-[20px] w-[50%] mt-[30px]'>
              <label htmlFor='photo' className='text-[18px] font-montserrat font-semibold text-[#000]'>Изображение</label>
              <div className='relative mt-[20px]'>
                <Upload
                  name='photo'
                  listType='picture-card'
                  beforeUpload={() => false}
                  onChange={(info) => handlePhotoUpload(info, index)}
                  showUploadList={false}
                >
                  {option.photo && option.photo.url ? (
                    <img
                      src={option.photo.url}
                      alt='option'
                      style={{ width: '100px' }}
                    />
                  ) : (
                    <div className='w-[40px] h-[40px] flex items-center justify-center'>
                      <IoIosAddCircleOutline className='text-violet100 ' size={60} />
                    </div>
                  )}
                </Upload>
                {option.photo && option.photo.url && (
                  <MdDeleteForever
                    size={24}
                    className='text-red-600 cursor-pointer absolute top-[20px] left-[25px]'
                    onClick={() => {
                      const updatedOption = [...blogData.option]
                      delete updatedOption[index].photo
                      setBlogData({ ...blogData, option: updatedOption })
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}

        {error && <p className='text-red-500'>{error}</p>}

        <div className='flex justify-end items-center'>
          <button
            type='submit'
            disabled={loading}
            className='w-[20%] mt-4 py-[15px] rounded-full px-[20px] bg-violet100 text-white font-bold'
          >
            {loading ? 'Сохраняется' : 'Сохранить'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

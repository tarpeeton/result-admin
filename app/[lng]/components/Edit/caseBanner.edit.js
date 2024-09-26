'use client';
import { useState, useEffect } from "react";
import { Modal, Button, Upload } from "antd";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { updateBannerImage, updateBannerInfo } from '../../lib/api/update.api';
import { UploadOutlined } from "@ant-design/icons";
import { MdDelete } from 'react-icons/md';

const EditCase = ({ isCloseCreateModal, visible, bannerID, bgPhotoId, photoID, title, description, bgPhotoSrc, photoSrc, Data_ID }) => {
  const [currentLang, setCurrentLang] = useState("ru");
  const [editCaseBanner, setEditCaseBanner] = useState({
    id: bannerID || 0,
    title: { uz: title, ru: title, en: title },
    shortDescription: { uz: description, ru: description, en: description },
    bgphoto: bgPhotoSrc || null,
    photo: photoSrc || null,
    bgphotoID: bgPhotoId || 0,
    photoID: photoID || 0
  });

  const [fileList, setFileList] = useState([]);
  const [bgFileList, setBgFileList] = useState([]);

  useEffect(() => {
    if (bannerID) {
      setEditCaseBanner({
        id: bannerID,
        title: { uz: title, ru: title, en: title },
        shortDescription: { uz: description, ru: description, en: description },
        bgphoto: bgPhotoSrc || null,
        photo: photoSrc || null,
        bgphotoID: bgPhotoId || 0,
        photoID: photoID || 0
      });

      if (photoSrc) {
        setFileList([{
          uid: "-1",
          name: "new-photo",
          status: "done",
          url: photoSrc
        }]);
      }

      if (bgPhotoSrc) {
        setBgFileList([{
          uid: "-2",
          name: "new-photo",
          status: "done",
          url: bgPhotoSrc
        }]);
      }
    }
  }, [bannerID, bgPhotoSrc, photoSrc, title, description, bgPhotoId, photoID]);

  const handleLangSwitch = (lang) => {
    setCurrentLang(lang);
  };

  const handleChange = (e, field) => {
    setEditCaseBanner({
      ...editCaseBanner,
      [field]: { ...editCaseBanner[field], [currentLang]: e.target.value },
    });
  };

  const handleBgFileUpload = ({ file, fileList }) => {
    setBgFileList(fileList);
    setEditCaseBanner({ ...editCaseBanner, bgphoto: file });
  };

  const handleFileUpload = ({ file, fileList }) => {
    setFileList(fileList);
    setEditCaseBanner({ ...editCaseBanner, photo: file });
  };

  const handleRemoveBgFile = () => {
    setBgFileList([]);
    setEditCaseBanner({ ...editCaseBanner, bgphoto: null, bgphotoID: 0 });
  };

  const handleRemoveFile = () => {
    setFileList([]);
    setEditCaseBanner({ ...editCaseBanner, photo: null, photoID: 0 });
  };

  const handleUpdateBannerInfo = async () => {
    // Constructing jsonData according to the specified format
    const jsonData = {
      id: Data_ID, // Outer id
      banner: {
        id: editCaseBanner.id, // Inner banner id
        title: {
          uz: editCaseBanner.title.uz,
          ru: editCaseBanner.title.ru,
          en: editCaseBanner.title.en
        },
        shortDescription: {
          uz: editCaseBanner.shortDescription.uz,
          ru: editCaseBanner.shortDescription.ru,
          en: editCaseBanner.shortDescription.en
        }
      }
    };

    try {
      await updateBannerInfo(jsonData);
      toastr.success("Информация о баннере успешно обновлена!");
    } catch (error) {
      toastr.error("Не удалось обновить информацию о баннере.");
    }
  };

  const handleUpdateImages = async () => {
    try {
      if (fileList.length > 0 && fileList[0].originFileObj) {
        await updateBannerImage(editCaseBanner.photoID, fileList[0].originFileObj);
      }

      if (bgFileList.length > 0 && bgFileList[0].originFileObj) {
        await updateBannerImage(editCaseBanner.bgphotoID, bgFileList[0].originFileObj);
      }

      toastr.success("Изображения успешно обновлены!");
    } catch (error) {
      toastr.error("Не удалось обновить изображения.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleUpdateBannerInfo();
    await handleUpdateImages();
    isCloseCreateModal();
  };

  return (
    <Modal
      title="Редактировать Баннер"
      open={visible}
      onCancel={isCloseCreateModal}
      footer={null}
      width={600}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-4">
          {["ru", "uz", "en"].map((lang) => (
            <button
              key={lang}
              type="button"
              className={`px-4 py-2 ${currentLang === lang ? "bg-violet100 text-white" : "bg-gray-200"}`}
              onClick={() => handleLangSwitch(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label className='text-[16px] font-medium text-[#A6A6A6]'>Заголовок</label>
          <input
            value={editCaseBanner.title[currentLang]}
            onChange={(e) => handleChange(e, "title")}
            required
            className='p-[20px]'
          />
        </div>

        <div className="flex flex-col gap-[10px] mt-4">
          <label className='text-[16px] font-medium text-[#A6A6A6]'>Краткое Описание</label>
          <input
            value={editCaseBanner.shortDescription[currentLang]} 
            onChange={(e) => handleChange(e, "shortDescription")} 
            required 
            className='p-[20px]' 
          />
        </div>

        <div className="flex flex-col gap-[10px] mt-4 relative">
          <label className='text-[16px] font-medium text-[#A6A6A6]'>Фоновое фото</label>
          <Upload
            name="bgphoto"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleBgFileUpload}
          >
            {bgFileList.length > 0 ? (
              <div>
                <img
                  src={bgFileList[0].url || URL.createObjectURL(bgFileList[0].originFileObj)}
                  alt="bgphoto"
                  className="w-full h-full object-cover"
                />
                <Button
                  danger
                  onClick={handleRemoveBgFile}
                  className="absolute right-[10px] top-[10px] rounded-full py-[15px] px-[10px]"
                >
                  <MdDelete className="text-red-500" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[100px]">
                <UploadOutlined className="text-violet100 text-[40px]" />
              </div>
            )}
          </Upload>
        </div>

        <div className="flex flex-col gap-[10px] mt-4 relative">
          <label className='text-[16px] font-medium text-[#A6A6A6]'>Фото</label>
          <Upload
            name="photo"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleFileUpload}
          >
            {fileList.length > 0 ? (
              <div>
                <img
                  src={fileList[0].url || URL.createObjectURL(fileList[0].originFileObj)}
                  alt="photo"
                  className="w-full h-full object-cover"
                />
                <Button
                  danger
                  onClick={handleRemoveFile}
                  className="absolute right-[10px] top-[10px] rounded-full py-[15px] px-[10px]"
                >
                  <MdDelete className="text-red-500" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[100px]">
                <UploadOutlined className="text-violet100 text-[40px]" />
              </div>
            )}
          </Upload>
        </div>

        <Button type="primary" htmlType="submit" className="mt-4">Обновить</Button>
      </form>
    </Modal>
  );
};

export default EditCase;

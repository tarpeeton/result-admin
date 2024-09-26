"use client";
import { useState, useEffect } from "react";
import { Modal, Button, Switch, Upload } from "antd";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { editMember, editImage } from "./../../lib/api/edit.api";
import { UploadOutlined, MdDelete } from "@ant-design/icons";
import { getSingleMember } from '../../lib/api/get.api';
export const EditMemberInfo = ({ isCloseCreateModal, visible, memberID }) => {

  const [currentLang, setCurrentLang] = useState("ru");
  const [editMemberData, setEditMemberData] = useState({
    id: 0,
    fullName: { uz: "", ru: "", en: "" },
    position: { uz: "", ru: "", en: "" },
    active: true,
    orderNum: 0,
    photo: null,
    photoID: 0,
  });
  const [fileList, setFileList] = useState([]);

  // When the modal is opened, populate the form with the current member's data
  useEffect(() => {
    if (memberID) {
      const fetchMemberData = async () => {
        try {
          const data = await getSingleMember(memberID);
          if (data) {
            setEditMemberData({
              id: data.id,
              fullName: {
                uz: data.fullName.uz || "",
                ru: data.fullName.ru || "",
                en: data.fullName.en || "",
              },
              position: {
                uz: data.position.uz || "",
                ru: data.position.ru || "",
                en: data.position.en || "",
              },
              photo: data.photo?.url || null,
              photoID: data.photo?.id || 0,
              active: data.active,
              orderNum: data.orderNum || 0,
            });

            // Set the current photo into fileList if it exists
            if (data.photo?.url) {
              setFileList([
                {
                  uid: "-1",
                  name: "photo.png",
                  status: "done",
                  url: data.photo.url,
                },
              ]);
            }
          }
        } catch (error) {
          toastr.error("Не удалось загрузить данные участника.");
        }
      };

      fetchMemberData();
    }
  }, [memberID]);

  // Switch between different languages
  const handleLangSwitch = (lang) => {
    setCurrentLang(lang);
  };

  // Handle input changes dynamically based on the current language
  const handleChange = (e, field) => {
    setEditMemberData({
      ...editMemberData,
      [field]: { ...editMemberData[field], [currentLang]: e.target.value },
    });
  };

  // Handle the switch toggle for active status
  const handleActiveChange = (checked) => {
    setEditMemberData({ ...editMemberData, active: checked });
  };

  // Handle photo upload
  const handleFileUpload = ({ file }) => {
    setFileList([file]); // Replace the fileList with the new photo
  };

  // Remove current photo
  const handleRemoveFile = () => {
    setFileList([]);
    setEditMemberData({ ...editMemberData, photo: null, photoID: 0 }); // Clear the current photo
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const jsonData = {
      id: editMemberData.id,
      fullName: editMemberData.fullName,
      position: editMemberData.position,
      active: editMemberData.active,
      orderNum: editMemberData.orderNum || 0,
    };

    try {
      // Call the editMember function to update the member details
      await editMember(jsonData);

      // If a new file was uploaded, handle the photo update
      if (fileList.length > 0 && fileList[0].originFileObj) {
        const photoData = new FormData();
        photoData.append("file", fileList[0].originFileObj);
        await editImage(editMemberData.photoID, photoData); // Update the photo
      }

      toastr.success("Член успешно обновлен!");
      isCloseCreateModal();
    } catch (error) {
      toastr.error("Не удалось обновить члена.");
    }
  };

  return (
    <Modal
      title="Редактировать Члена"
      visible={visible}
      onCancel={isCloseCreateModal}
      footer={null}
      width={600}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            className={`px-4 py-2 ${currentLang === "ru" ? "bg-violet100 text-white" : "bg-gray-200"}`}
            onClick={() => handleLangSwitch("ru")}
          >
            RU
          </button>
          <button
            type="button"
            className={`px-4 py-2 ${currentLang === "uz" ? "bg-violet100 text-white" : "bg-gray-200"}`}
            onClick={() => handleLangSwitch("uz")}
          >
            UZ
          </button>
          <button
            type="button"
            className={`px-4 py-2 ${currentLang === "en" ? "bg-violet100 text-white" : "bg-gray-200"}`}
            onClick={() => handleLangSwitch("en")}
          >
            EN
          </button>
        </div>

        <div className="flex flex-col gap-[10px]">
          <label className='text-[16px] font-medium text-[#A6A6A6]'>Полное имя</label>
          <input
            value={editMemberData.fullName[currentLang]}
            onChange={(e) => handleChange(e, "fullName")}
            required
            className='p-[20px]'
          />
        </div>

        <div className="flex flex-col gap-[10px] mt-4">
          <label className='text-[16px] font-medium text-[#A6A6A6]'>Должность</label>
          <input
            value={editMemberData.position[currentLang]}
            onChange={(e) => handleChange(e, "position")}
            required
            className='p-[20px]'
          />
        </div>

        <div className="mt-4">
          <label>Активен?</label>
          <Switch
            checked={editMemberData.active}
            onChange={handleActiveChange}
          />
        </div>

        <div className="flex flex-col gap-[10px] mt-4 relative">
          <label className='text-[16px] font-medium text-[#A6A6A6]'>Фото</label>
          <Upload
            name="photo"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={() => false} // Disable automatic upload
            onChange={handleFileUpload}
            className="relative overflow-hidden"
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

        <div className="w-full flex flex-row justify-end">
          <Button htmlType="submit" className="w-[30%] mt-[12px] bg-violet100 text-white">
            Сохранить
          </Button>
        </div>
      </form>
    </Modal>
  );
};

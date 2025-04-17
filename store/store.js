import { defineStore } from "pinia";
export const useStore = defineStore("store", () => {
  const showLoader = ref(true);
  const Overlay = ref(false);
  const openCamera = ref(false);
  const uploadImg = ref(false);
  const cameraImg = ref(false);

  const imageData = ref(null);

  function setImage(data) {
    imageData.value = data;
  }

  function closeModal() {
    Overlay.value = false;
    openCamera.value = false;
    uploadImg.value = false;
    cameraImg.value = false;
  }

  return {
    showLoader,
    Overlay,
    openCamera,
    closeModal,
    imageData,
    setImage,
    uploadImg,
    cameraImg
  };
});

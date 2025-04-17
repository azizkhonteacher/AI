<template>
  <div
    class="camera-wrapper"
    @dblclick="width = !width"
    :style="{ width: width ? '100%' : '750px' }"
  >
    <video ref="video" autoplay playsinline />
    <button @click="takePhoto"></button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "~/store/store";
import { useRouter } from 'vue-router'
const router = useRouter()

const store = useStore();
const video = ref(null);
let stream = null;
const width = ref(false);

//  Kamerani ishga tushirish
const startCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.value.srcObject = stream;
  } catch (err) {
    console.error("Kamera xatosi:", err);
  }
};

// 📸 Rasmga olish va store'ga saqlash
const takePhoto = () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.value.videoWidth;
  canvas.height = video.value.videoHeight;
  canvas.getContext("2d").drawImage(video.value, 0, 0);

  const imageBase64 = canvas.toDataURL("image/png");
  store.setImage(imageBase64);

  store.closeModal();
  router.push("/diagnosis");
};

// 🧼 Tozalash
onBeforeUnmount(() => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
});

onMounted(() => {
  startCamera();
});
</script>

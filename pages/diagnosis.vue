<template>
  <div class="diagnosis-wrap">
    <div class="container">
      <div class="diagnosis-image">
        <div class="image-wrap">
          <img :src="store.imageData" v-if="store.imageData" />
        </div>

        <!-- <p>{{ resultText }}</p> -->
        <div v-if="!resultText?.result" class="btns">
          <!-- cancel -->
          <button class="btn" @click="(store.Overlay = true), openModal()">
            Orqaga
          </button>
          <!-- submit -->
          <button @click="submitImage" class="btn">Yuborish</button>
        </div>

        <div v-if="resultText?.result" class="result-wrap">
          <div class="text">
            <p>{{ resultText?.result }}</p>
          </div>

          <div class="return-btn">
            <button @click="toHome()">Qayta tekshirish</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "~/store/store";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();

const resultText = ref({});
const submitImage = async () => {
  if (!store.imageData) {
    alert("Iltimos, rasmga oling yoki yuklang");
    return;
  }

  // base64 formatdagi rasmni blob-ga aylantiramiz
  const blob = await (await fetch(store.imageData)).blob();
  const formData = new FormData();
  formData.append("image", blob, "photo.png"); // 👈 'image' API kutilayotgan nom

  try {
  const res = await fetch("/api/v1/diagnose/", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Xatolik: ${res.status} - ${errorText}`);
  }

  const responseData = await res.json(); // <<=== Javobni shu o'zgaruvchiga tayinladik

  resultText.value = responseData.result || JSON.stringify(responseData); // Kerakli joyda foydalaniladi
} catch (error) {
  console.error("Xatolik:", error);
  resultText.value = `Xatolik yuz berdi: ${error.message}`;
}
};

function toHome() {
  router.push("/");
}

function openModal() {
  if (store.uploadImg) {
    router.push("/");
    store.closeModal();
  } else if (store.cameraImg) {
    store.openCamera = true;
  }
}
</script>

<style lang="scss" scoped></style>

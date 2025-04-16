<!-- <template>
  <div class="max-w-xl mx-auto p-4">
    <h2 class="text-xl font-bold mb-4">Chat Ilova</h2>

    <input
      type="file"
      accept="image/*"
      @change="handleImageUpload"
      class="mb-2 w-full"
    />
    <input
      type="text"
      v-model="textMessage"
      placeholder="Xabar yozing"
      class="mb-2 w-full p-2 border rounded"
    />
    <button
      @click="submitForm"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Yuborish
    </button>

    <div class="mt-6">
      <h3 class="text-lg font-semibold mb-2">Yozishmalar:</h3>
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="mb-4 p-3 border rounded bg-white shadow-sm"
      >
        <div class="mb-1 font-medium text-blue-600">Siz:</div>
        <div v-if="msg.image">
          <img :src="msg.image" class="max-h-48 rounded border mb-2" />
        </div>
        <div>{{ msg.message }}</div>
        <div class="mt-2 font-medium text-green-600">AI:</div>
        <div>{{ msg.reply }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 150px;
  height: 150px;
}
</style>

<script setup>
import { ref, onMounted } from "vue";

const baseURL = "http://localhost:3001/";
const imagePreview = ref("");
const textMessage = ref("");
const imageBase64 = ref("");
const messages = ref([]);

const loadMessages = async () => {
  const res = await fetch(baseURL + "messages");
  messages.value = await res.json();
};

onMounted(loadMessages);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    imageBase64.value = reader.result;
    imagePreview.value = reader.result;
  };
};

const submitForm = async () => {
  if (!textMessage.value) {
    alert("Iltimos, xabar yozing.");
    return;
  }

  const keyword = textMessage.value.toLowerCase();
  const res = await fetch(baseURL + "answers?keyword=" + keyword);
  const data = await res.json();
  const reply =
    data.length > 0 ? data[0].reply : "Kechirasiz, javob topilmadi.";

  // Saqlash
  await fetch(baseURL + "messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image: imageBase64.value,
      message: textMessage.value,
      reply: reply,
    }),
  });

  // Tozalash
  textMessage.value = "";
  imageBase64.value = "";
  imagePreview.value = "";

  // Yozishmalarni yangilash
  await loadMessages();
};
</script> -->

<template>
  <NuxtPage />
</template>

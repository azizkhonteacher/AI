<template>
  <div>
    <input type="file" @change="handleFileUpload" accept="image/*" />
    <button @click="submitImage">Yuborish</button>

    <div v-if="result">
      <h3>Natija:</h3>
      <pre>{{ result }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedFile = ref(null);
const result = ref(null);

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

const submitImage = async () => {
  if (!selectedFile.value) {
    alert("Iltimos, rasm tanlang");
    return;
  }

  const formData = new FormData();
  formData.append("image", selectedFile.value); // 👈 API 'image' ni kutyapti!

  try {
    const res = await fetch("/api/v1/diagnose/", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Xatolik: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    result.value = data;
  } catch (error) {
    console.error("Xatolik:", error);
    result.value = `Xatolik yuz berdi: ${error.message}`;
  }
};
</script>

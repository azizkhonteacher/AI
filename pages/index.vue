<template>
  <div class="home-wrap">
    <div class="container">
      <div class="info">
        <h2 class="title">Welcome</h2>
        <p class="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus, deserunt.
        </p>
      </div>

      <div class="buttons-wrap">
        <div class="btn">
          <button
            class="takePhoto"
            @click="
              (store.Overlay = true),
                (store.openCamera = true),
                (store.cameraImg = true)
            "
          >
            <svg
              enable-background="new 0 0 32 32"
              height="32px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 32 32"
              width="32px"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g id="camera">
                <path
                  clip-rule="evenodd"
                  d="M16,10.001c-4.419,0-8,3.581-8,8c0,4.418,3.581,8,8,8   c4.418,0,8-3.582,8-8C24,13.583,20.418,10.001,16,10.001z M20.555,21.906c-2.156,2.516-5.943,2.807-8.459,0.65   c-2.517-2.156-2.807-5.944-0.65-8.459c2.155-2.517,5.943-2.807,8.459-0.65C22.42,15.602,22.711,19.391,20.555,21.906z"
                  fill="#333333"
                  fill-rule="evenodd"
                />
                <path
                  clip-rule="evenodd"
                  d="M16,14.001c-2.209,0-3.999,1.791-4,3.999v0.002   c0,0.275,0.224,0.5,0.5,0.5s0.5-0.225,0.5-0.5V18c0.001-1.656,1.343-2.999,3-2.999c0.276,0,0.5-0.224,0.5-0.5   S16.276,14.001,16,14.001z"
                  fill="#333333"
                  fill-rule="evenodd"
                />
                <path
                  clip-rule="evenodd"
                  d="M29.492,9.042l-4.334-0.723l-1.373-3.434   C23.326,3.74,22.232,3,21,3H11C9.768,3,8.674,3.74,8.214,4.886L6.842,8.319L2.509,9.042C1.055,9.283,0,10.527,0,12v15   c0,1.654,1.346,3,3,3h26c1.654,0,3-1.346,3-3V12C32,10.527,30.945,9.283,29.492,9.042z M30,27c0,0.553-0.447,1-1,1H3   c-0.553,0-1-0.447-1-1V12c0-0.489,0.354-0.906,0.836-0.986l5.444-0.907l1.791-4.478C10.224,5.25,10.591,5,11,5h10   c0.408,0,0.775,0.249,0.928,0.629l1.791,4.478l5.445,0.907C29.646,11.094,30,11.511,30,12V27z"
                  fill="#333333"
                  fill-rule="evenodd"
                />
              </g>
            </svg>
            <p>Take Photo</p>
          </button>
        </div>
        <div class="btn">
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileChange"
            style="display: none"
          />
          <button
            class="uploadImg"
            @click="
              triggerFileInput(),
                (store.Overlay = true),
                (store.uploadImg = true)
            "
          >
            <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
              <rect fill="none" height="32px" width="32px" />
              <path
                d="M176,128h48a8,8,0,0,1,8,8v64a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H80"
                fill="none"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              />
              <line
                fill="none"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
                x1="128"
                x2="128"
                y1="128"
                y2="24"
              />
              <polyline
                fill="none"
                points="80 72 128 24 176 72"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              />
              <circle cx="188" cy="168" r="10" />
            </svg>
            <p>Upload Image</p>
          </button>
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
const fileInput = ref(null);
const router = useRouter();

// 👇 Choose File bosilganda inputni ishga tushirish
const triggerFileInput = () => {
  fileInput.value.click();
};

// 👇 Fayl tanlanganda — choose file hodisasi
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result;
    store.setImage(base64); // Pinia store ga yozamiz
    router.push("/diagnosis"); // Keyingi sahifaga o‘tish
    store.closeModal();
  };
  reader.readAsDataURL(file);
};
</script>

<style lang="scss" scoped></style>

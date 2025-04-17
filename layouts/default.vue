<template>
  <div>
    <header>
      <div class="container">
        <div class="logo">
          <NuxtLink to="/">
            <img src="~/assets/logo.png" alt="logo" />
          </NuxtLink>
        </div>
      </div>
    </header>

    <NuxtPage />

    <loader v-if="store.showLoader" />
    <camera v-if="store.openCamera" />

    <div
      class="overlay"
      v-show="store.Overlay"
      @click="store.closeModal()"
    ></div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/store";
const store = useStore();
</script>

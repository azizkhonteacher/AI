<template>
  <div>
    <NuxtLayout />
  </div>
</template>

<script setup>
import { watch, onMounted } from "vue";
import { useStore } from "~/store/store";
const store = useStore();

onMounted(() => {
  setTimeout(() => {
    store.showLoader = false;
  }, 2500); // 2.5 soniya
});
</script>

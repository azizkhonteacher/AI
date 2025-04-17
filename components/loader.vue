<template>
  <div class="image-body">
    <div class="image-wrapper">
      <img src="~/assets/logo.png" alt="sayt logo loader" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.image-body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f7fa;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
.img-wrapper {
  width: 350px;
  height: 350px;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    z-index: 1;
    position: absolute;
    background: #404040;
    display: block;
    width: 100%;
    height: 100%;
    transform-origin: 100% 50%;
    transform: scaleX(0) translateX(0);
    animation: 1s overlay ease-in-out forwards;
  }
}
img {
  width: 350px;
  height: 350px;
  object-fit: contain;
  animation: 1s 0.5s loaded cubic-bezier(0.49, 0, 0.5, 1) forwards;
  transform: scale(0.8);
  opacity: 0;
  display: block;
}

@keyframes loaded {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes overlay {
  0% {
    transform: scaleX(0);
  }
  55% {
    transform: scaleX(1);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>

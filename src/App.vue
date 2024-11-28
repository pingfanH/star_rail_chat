<script setup>
import dialogs from './components/dialogs.vue';
</script>

<template>
  <div class="background">
    <dialogs />
  </div>
</template>

<style scoped>
  .background{
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -2;
  }
  dialog{
    width: 50%;
  }
</style>

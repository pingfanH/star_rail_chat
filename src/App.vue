<script setup>
import dialogs from './components/dialogs.vue';

import {dialog_group_data,dialog_data} from "@/assets/dialog_data";
</script>

<template>
  <div class="background">
<!--    <dialogs :data="dialog_data"></dialogs>-->
    <div class="box">
      <dialogs :data="dialog_group_data"></dialogs>
    </div>
    <div  class="box">
      <dialogs :data="dialog_data"></dialogs>
    </div>
  </div>
</template>

<style scoped>
  .box{
    height: 50vh;
    width: 100%;
  }
  .background{
    display: flex;
    align-items: center;
    flex-direction: row;
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

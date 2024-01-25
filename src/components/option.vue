<script setup lang="ts">

</script>

<template>
  <div class="option">
    <div class="answer">
    怎么了吗？
    </div>
    <div class="answer">
      遇到危险了吗？
    </div>
  </div>
</template>

<style scoped>
.option{
  padding-top: 20px;
  background-color: aqua;
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .answer {
    display: flex;
    justify-content: center;
    font-weight: 550;
    margin: 5px;
    background-color: #f1f1f1;
    align-items: center;
    border: darkgrey 1px solid;
    box-shadow: rgba(105, 105, 105, 0.29) 1px 1px 1px;
    text-align: center;
    width: 80%;
    height: 30px;
    /*hover*/

    &:hover {
      background-color: #ffffff;
    }
    &:active {
      background-color: #e6e6e6;
    }
  }
}
</style>
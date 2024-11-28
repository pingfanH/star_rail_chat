<script setup>
import "@/assets/index.css"
import gsap  from "gsap"
import {ref, onMounted, watch} from "vue";
const Props = defineProps(['avatar','name','content','self'])
let avatar=ref(Props.avatar)
let name=ref(Props.name)
let content=ref(Props.content)
let self=ref(Props.self===true)
let is_played=ref(false);
const avatarElement = ref(null); // 创建 avatar 元素的引用
const MainBodyElement = ref(null); // 创建 main-body 元素的引用

function animate(){
  let tl = gsap.timeline({defaults: {duration: 1}});
  tl.to(avatarElement.value, {opacity:0.5,y:-35,duration:0.25})
  tl.to(avatarElement.value, {opacity:1,y:-30,duration:0.2})
  tl.to(MainBodyElement.value,{opacity:1,y:0,duration:0.07},"<")
}
watch(() => [avatarElement.value, MainBodyElement.value], ([newAvatar, newMainBody]) => {
  if (newAvatar && newMainBody) {
    animate()
  }
})
</script>

<template>
  <div v-if="!self" class="out">
    <div class="message">
        <div class="avatar" ref="avatarElement">
          <img :src="avatar">
        </div>
      <div class="main_body" ref="MainBodyElement">
        <div class="name">
          {{ name }}
        </div>
        <div class="body">
        {{content}}
        </div>
      </div>
    </div>
  </div>
  <div v-if="self || self == 'true'" class="out">
    <div class="self">
      <div class="avatar" ref="avatarElement">
        <img :src="avatar">
      </div>
      <div class="main_body" ref="MainBodyElement">
        <div class="name">
          {{ name }}
        </div>

        <div class="body">
          {{content}}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.out{
  width: 100%;
}
.message{
  display: flex;
  width: 100%;
  margin: 0 0 0px 0;
    .avatar{
      /*头像向下移动*/
      opacity: 0;
      margin: 30px 0 0 0;
      width: 60px;
      img{
        width: 60px;
        border-radius: 50%;
      }
    }
  .main_body {
    opacity: 0;
    max-width: 85%;
    .name {
      width: 100%;
      max-height: 20px;
      margin: 3px 0 0 15px;
      font-size: 14px;
      font-weight: 600;
      color: #808080;
    }
    .body {
      /*文字自动换行*/
      font-weight: 550;
      word-wrap: break-word;
      max-width: 85%;
      height: auto;
      background-color: #f5f5f5;
      border-radius: 10px;
      padding: 10px 15px 10px 15px;
      margin: 10px 0 0 15px;
      font-size: 14px;
    }
  }
}
.self{
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin: 0 0 40px 0;
  .main_body {
    opacity: 0;
    max-width: 85%;
    .name {
      display: flex;
      flex-direction: row-reverse;
      width: 100%;
      max-height: 20px;
      margin: 3px 0 0 -15px;
      font-size: 14px;
      font-weight: 600;
      color: #808080;
    }

    .body {
      /*文字自动换行*/
      font-weight: 550;
      word-wrap: break-word;
      max-width: 85%;
      height: auto;
      background-color: #f5f5f5;
      border-radius: 10px;
      padding: 10px 15px 10px 15px;
      margin: 10px 15px 0 0;
      font-size: 14px;
    }
  }
  .avatar{
    /*头像向下移动*/
    opacity: 0;
    margin: 30px 0 0 0;
    width: 60px;
    img{
      width: 60px;
      border-radius: 50%;
    }
  }
}
</style>
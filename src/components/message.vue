<script setup>
import "@/assets/index.css"
import gsap  from "gsap"
import {ref, watch, nextTick} from "vue";
import {scroll_to_end} from "@/api/ultis";

const Props = defineProps(['avatar','name','content','self','emote','dialog'])
let avatar=ref(Props.avatar)
let name=ref(Props.name)
let content=ref(Props.content)
let emote=ref(Props.emote)
let self=ref(Props.self===true)
let dialog=ref(Props.dialog)
const avatarElement = ref(null);
const MainBodyElement = ref(null);

let isLoading = ref(true);
let dotsAnimation = null;

function animateDots() {
  if (!MainBodyElement.value) return;
  const dots = MainBodyElement.value.querySelectorAll('.dot');
  if (dots.length > 0) {
    dotsAnimation = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });
    dotsAnimation.fromTo(dots,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        ease: "power1.inOut",
        stagger: {
          each: 0.2,
          from: "start"
        }
      }
    ).to(dots, {
        opacity: 0,
        duration: 0.4,
        ease: "power1.inOut",
        stagger: {
          each: 0.2,
          from: "start"
        }
    }, ">0.1");
  }
}

async function showContent() {
  if (dotsAnimation) {
    dotsAnimation.kill();
  }
  isLoading.value = false;

  await nextTick(); // Wait for the DOM to update

  const contentElement = MainBodyElement.value.querySelector('.body, .body_img');
  if (contentElement) {
    // Use clip-path to reveal the content without causing reflow
    gsap.from(contentElement, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 0.2,
      ease: "power2.out",
    }).then(() => {
      scroll_to_end(dialog.value.meta.id)
      if (self.value){
        gsap.delayedCall(1, () => {
          dialog.value.run = true;
        });
      }else{
        dialog.value.run = true;
      }
    });
  }
}

function animate(){
  let tl = gsap.timeline({defaults: {duration: 1}});
  tl.to(avatarElement.value, {opacity:0.5,y:-35,duration:0.25})
  tl.to(avatarElement.value, {opacity:1,y:-30,duration:0.2})
  tl.to(MainBodyElement.value,{opacity:1,y:0,duration:0.07},"<")

  if (isLoading.value) {
    if (!self.value){
      animateDots();
    }
    // Simulate loading for 1.5s
    gsap.delayedCall(self.value?0:1.5, showContent);

  }
}

watch(() => [avatarElement.value, MainBodyElement.value], ([newAvatar, newMainBody]) => {
  if (newAvatar && newMainBody) {
    dialog.value.run=false;
    animate()
  }
}, { once: true })
</script>

<template>
  <div class="out">
    <div :class="['bubble', { self, message: !self }]">
      <div class="avatar" ref="avatarElement">
        <img :src="avatar">
      </div>
      <div class="main_body" ref="MainBodyElement">
        <div class="name">{{ name }}</div>

        <div v-if="isLoading" class="dots">
          <div class="dot" v-for="i in 3"></div>
        </div>

        <div v-else class="content-wrapper">
          <div v-if="!emote" class="body">
            {{ content }}
          </div>
          <div v-if="emote" class="body_img">
            <img :src="emote">
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.bubble{
  display: flex;
}
.dots{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  min-height: 20px; /* give some space */
  .dot{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: black;
    margin: 0 3px;
    opacity: 0; /* Start with opacity 0 */
  }
}
.out{
  width: 100%;
}

.content-wrapper {
  /* This wrapper helps contain the animation */
  display: inline-block;
  max-width: 85%;
  margin: 10px 0 0 15px;
}

.self .content-wrapper {
    margin: 10px 15px 0 0;
}

.message{
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
    width: 100%;

    .name {
      width: 100%;
      max-height: 20px;
      margin: 3px 0 0 15px;
      font-size: 14px;
      font-weight: 600;
      color: #808080;
    }
    .body {
      font-weight: 550;
      word-break: break-all;
      overflow: hidden; /* Hide overflowing content */
      height: auto;
      background-color: #f5f5f5;
      border-radius: 10px;
      padding: 10px 15px;
      font-size: 14px;
      display: inline-block;
    }
    .body_img {
      font-weight: 550;
      overflow: hidden; /* Hide overflowing content */
      max-width: 100%;
      height: auto;
      padding: 10px;
      font-size: 14px;
      line-height: 0; /* Remove extra space below image */
      img{
        width: 100%;
      }
    }
  }
}
.self{
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin: 0 0 0px 0;
  .main_body {
    opacity: 0;
    width: 100%;
    text-align: right;
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
      font-weight: 550;
      word-break: break-all;
      overflow: hidden; /* Hide overflowing content */
      height: auto;

      background-color: #f5f5f5;
      border-radius: 10px;
      padding: 10px 15px;
      margin: 0;
      font-size: 14px;
      display: inline-block;
      text-align: left;
    }
    .body_img {
      font-weight: 550;
      overflow: hidden; /* Hide overflowing content */
      max-width: 100%;
      height: auto;
      margin: 0;
      font-size: 14px;
      line-height: 0; /* Remove extra space below image */
      img{
        width: 100%;
      }
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
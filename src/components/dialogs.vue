<script setup>
import message from "./message.vue"
import dialog_option from "./option.vue"
import {onMounted, ref} from "vue";
import gsap from "gsap";

import t_dialog from "@/api/dialog";
import dialog_data from "@/assets/dialog_data";
import {dialog_callback, scroll_to_end, show_option} from "@/api/ultis";
import {
  other_name,
  other_avatar,
  other_intro,
  message_list,
  options,
  dialog_data_main,
  self_name,
  self_avatar,
  destiny
} from "@/api/data";

dialog_data_main.value=new t_dialog(dialog_data);
let dialog=dialog_data_main.value;
other_avatar.value=dialog.all_data.other_avatar;
other_intro.value=dialog.all_data.other_intro;
other_name.value=dialog.all_data.other_name;
self_name.value=dialog.all_data.self_name;
self_avatar.value=dialog.all_data.self_avatar;
console.log(dialog.data)
dialog.start((data)=>{

  console.log(data)
  let message={
    avatar:other_avatar,
    name:other_name,
  };
  if(typeof data =="string"){
    message.content=data;
    message_list.value.push(message);
    return;
  }
  if(data.hasOwnProperty("options")){
    options.value=data.options;
    //destiny.value=data.options.destiny;
    show_option();
    dialog.run=false;
    return;
  }
  if(data.hasOwnProperty("destiny")){
    dialog.run=false;
    let index=0;
    let destiny_data=data.destiny[destiny.value];
    console.log("destiny",destiny.value)
    console.log("destiny_data",data.destiny[destiny.value]);
    let MessageInterval=setInterval(() => {
      if(index>=destiny_data.length){
        clearInterval(MessageInterval);
        dialog.run=true;
        return;
      }
      dialog_callback(destiny_data[index])
      index+=1;
    }, 1500);
    return;
  }

});

onMounted(()=>{
  // 目标元素
  var cbody = document.getElementsByClassName("cbody")[0];
// 创建一个 MutationObserver 实例
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      scroll_to_end()
    });
  });
// 配置观察选项
  var config = { childList: true, subtree: true };
  observer.observe(cbody, config);
})
//创建定时任务
// let MessageInterval=setInterval(() => {
// }, 1000);
</script>

<template>
  <div class="bg">
    <div class="headers">
      <div class="text">
        <div class="name">{{ other_name }}</div>
        <div class="intro">{{ other_intro }}</div>
      </div>
      <div class="close">
        <img src="@/assets/close.svg">
      </div>

    </div>
    <div class="main_cbody">
      <div class="cbody">
        <div  v-for="msg in message_list">
          <message :self="msg.self==true" :avatar="msg.avatar" :name="msg.name" :content="msg.content"/>
        </div>
        <!--      <div id="test"  style="width: 100px;height: 100px;background-color: aqua">-->

        <!--      </div>-->
        <!--      <message self="true" :avatar="'/src/assets/xing_avatar.png'" :name="'平凡H'" :content="'藿藿怎么了吗?'"/>-->
        <!--      <message :avatar="'/src/assets/huohuo_avatar.png'" :name="'藿藿'" content="其实是件小事"/>-->
        <!--      <message :avatar="'/src/assets/huohuo_avatar.png'" :name="'藿藿'" content="刚才在群聊里，我说了一句话之后，就没有人回复我了"/>-->
        <!--      <message :avatar="'/src/assets/huohuo_avatar.png'" :name="'藿藿'" content="等了很久，还没有人回复我"/>-->
        <!--      <message :avatar="'/src/assets/huohuo_avatar.png'" :name="'藿藿'" content="是不是冷场了？"/>-->
      </div>
    </div>
    <div class="option_main">
      <dialog_option/>
    </div>
  </div>
  <div class="bg-shadow">

  </div>
</template>

<style scoped>
@font-face {
  font-family: 'GenShin';
  src: url('src/assets/GenJyuuGothic-Bold.ttf');
  font-display: swap;
}
/*改变滑块的最大高度*/
.main_cbody::-webkit-scrollbar {
  width: 3px;
}
.main_cbody::-webkit-scrollbar-button{
  /*height: 10px;*/
}
.main_cbody::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,.2);
  background: rgba(0, 0, 0, 0.53);
}
.main_cbody::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
.bg{
  font-family: GenShin;
  position: absolute;
  width: 480px;
  height: 500px;
  background: #e7e5e1;
  border-top-right-radius: 6%;
  overflow: hidden;
  .headers{
    display: flex;
    align-items: center;
    height: 70px;
    width: 100%;
    border-top-right-radius: 100%;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
    .text{
      width: 90%;
      .name{
        margin: 10px 0 0px 30px;
        font-size: 20px;
        font-weight: 600;
      }
      .intro{
        margin: 3px 0 0 30px;
        font-size: 14px;
        font-weight: 600;
        color: #808080;
      }
    }
    .close{
      margin: 25px 0 0 0px;
      width: 25px;
      img{
        width: 25px;
      }
    }
  }
  .main_cbody{
    height: 430px;
    max-height: 430px;
    overflow: auto;
    margin: 0px 30px 0 0px;
    .cbody{
      max-width: 100%;
      height: auto;
      padding: 20px 40px 10px 40px;
      margin: 0px 0 30px 0px;
      /*    max-height: 440px;*/
     /* max-height: 400px;*/
      /*overflow: auto;*/
    }
  }
  .option_main{
    opacity: 0;
    display: none;
  }
}
.bg-shadow{
  opacity: 0.4;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 4px 0px;
  position: absolute;
  width: 477px;
  height: 497px;
  background-color: rgba(0, 0, 0, 0.45);
  border: rgba(255, 255, 255, 0.44) solid 2px;
  z-index: -1;
  transform: translate(-7px,7px);
}
</style>
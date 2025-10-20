<script setup>
import message from "./message.vue";
import dialog_option from "./option.vue";
import { onMounted, ref } from "vue";
import gsap from "gsap";

import t_dialog from "@/api/dialog";
import { dialog_data, dialog_group_data,dialog_data1 } from "@/assets/dialog_data";
import {scroll_to_end, show_option } from "@/api/ultis";
//import dialog from "@/api/dialog";
// import {
//   other_name,
//   other_avatar,
//   other_intro,
//   message_list,
//   options,
//   dialog_data_main,
//   self_name,
//   self_avatar,
//   destiny,
//   avatar_map, group_name, group_intro
// } from "@/api/data";

let dialog = new t_dialog(dialog_data1);


// avatar_map.value=dialog.all_data.avatar_map;
// group_name.value=dialog.all_data.group_name;
// group_intro.value=dialog.all_data.group_intro;
// other_avatar.value = dialog.all_data.other_avatar;
// other_intro.value = dialog.all_data.other_intro;
// other_name.value = dialog.all_data.other_name;
// self_name.value = dialog.all_data.self_name;
// self_avatar.value = dialog.all_data.self_avatar;
console.log(dialog.data);
dialog.start((data,self) => {
  console.log(data);
  let message;
  if (data.hasOwnProperty("options")) {
    self.options.value = data.options;
    //destiny.value=data.options.destiny;
    show_option();
    dialog.run = false;
    return;
  }
  if (data.hasOwnProperty("destiny")) {
    dialog.run = false;
    let index = 0;
    let destiny_data = data.destiny[self.destiny.value];
    console.log("destiny", self.destiny.value);
    console.log("destiny_data", data.destiny[dialog.destiny.value]);
    let MessageInterval = setInterval(() => {
      if (index >= destiny_data.length) {
        clearInterval(MessageInterval);
        dialog.run = true;
        return;
      }
      self.callback(destiny_data[index]);
      index += 1;
    }, 1000);
    return;
  }
  if (data.name==="self"){
    message = {
      avatar: self.meta.self_avatar,
      name: self.meta.self_name,
      emote:data.emote,
      content: data.content,
      self:true
    };
  }else
  if (dialog.meta.dialog_type==="group") {
    message= {
      avatar: self.meta.avatar_map[data.name].avatar,
      name:  self.meta.avatar_map[data.name].name,
      content: data.content,
      emote:data.emote,
      self:false
    };
  }else if (dialog.meta.dialog_type==="dm"){
    message = {
      avatar: self.meta.other_avatar,
      name: self.meta.other_name,
      content: data.content,
      emote:data.emote,
      self:false
    };
  }

  if (typeof data == "string") {
    message.content = data;
    self.message_list.value.push(message);
    return;
  }else{
    self.message_list.value.push(message);
    return;
  };
});

onMounted(() => {
  // 目标元素
  var cbody = document.getElementsByClassName("cbody")[0];
  // 创建一个 MutationObserver 实例
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      scroll_to_end();
    });
  });
  // 配置观察选项
  var config = { childList: true, subtree: true };
  observer.observe(cbody, config);
});
//创建定时任务
// let MessageInterval=setInterval(() => {
// }, 1000);
</script>

<template>
  <div class="bg">
    <div class="headers">
      <div class="text" v-if="dialog.meta.dialog_type==='dm'">
        <div class="name">{{ dialog.meta.other_name }}</div>
        <div class="intro">{{ dialog.meta.other_intro }}</div>
      </div>
      <div class="text" v-if="dialog.meta.dialog_type==='group'">
        <div class="name">{{ dialog.meta.group_name }}</div>
        <div class="intro">{{ dialog.meta.group_intro }}</div>
      </div>
      <div class="close">
        <img src="@/assets/close.svg" />
      </div>
    </div>
    <div class="main_cbody">
      <div class="cbody">
        <div v-for="msg in dialog.message_list.value">
          <message
            :self="msg.self"
            :avatar="msg.avatar"
            :name="msg.name"
            :content="msg.content"
            :emote="msg.emote"
          />
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
      <dialog_option :dialog="dialog" />
    </div>
  </div>
  <div class="bg-shadow"></div>
</template>

<style scoped>
@font-face {
  font-family: "GenShin";
  src: url("src/assets/GenJyuuGothic-Bold.ttf");
  font-display: swap;
}
/*改变滑块的最大高度*/
.main_cbody::-webkit-scrollbar {
  width: 3px;
}
.main_cbody::-webkit-scrollbar-button {
  /*height: 10px;*/
}
.main_cbody::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.53);
}
.main_cbody::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.bg {
  font-family: GenShin;
  position: absolute;
  width: 480px;
  height: 500px;
  background: #e7e5e1;
  border-top-right-radius: 6%;
  overflow: hidden;
  .headers {
    display: flex;
    align-items: center;
    height: 70px;
    width: 100%;
    border-top-right-radius: 100%;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
    .text {
      width: 90%;
      .name {
        margin: 10px 0 0px 30px;
        font-size: 20px;
        font-weight: 600;
      }
      .intro {
        margin: 3px 0 0 30px;
        font-size: 14px;
        font-weight: 600;
        color: #808080;
      }
    }
    .close {
      margin: 25px 0 0 0px;
      width: 25px;
      img {
        width: 25px;
      }
    }
  }
  .main_cbody {
    height: 430px;
    max-height: 430px;
    overflow: auto;
    margin: 0px 30px 0 0px;
    .cbody {
      max-width: 100%;
      height: auto;
      padding: 20px 40px 10px 40px;
      margin: 0px 0 30px 0px;
      /*    max-height: 440px;*/
      /* max-height: 400px;*/
      /*overflow: auto;*/
    }
  }
  .option_main {
    opacity: 0;
    display: none;
  }
}
.bg-shadow {
  opacity: 0.4;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 4px 0px;
  position: absolute;
  width: 477px;
  height: 497px;
  background-color: rgba(0, 0, 0, 0.45);
  border: rgba(255, 255, 255, 0.44) solid 2px;
  z-index: -1;
  transform: translate(-7px, 7px);
}
</style>

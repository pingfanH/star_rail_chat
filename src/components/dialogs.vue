<script setup>
import message from "./message.vue"
import dialog_option from "./option.vue"
import {ref} from "vue";
let message_list=ref([{
  avatar:'/src/assets/huohuo_avatar.png',
  name:'藿藿',
  content:'救、救命...'
}])
//创建定时任务
let MessageInterval=setInterval(() => {
  let message={
    avatar:'/src/assets/huohuo_avatar.png',
    name:'藿藿',
    content:'救命!!!!'
  };
  message_list.value.push(message)
  if(message_list.value.length>3){
    //删除定时

    clearInterval(MessageInterval);
  }
}, 1000);
</script>

<template>
  <div class="bg">
    <div class="headers">
      <div class="text">
        <div class="name">藿藿</div>
        <div class="intro">尾巴大爷的小跟班</div>
      </div>
      <div class="close">
        <img src="@/assets/close.svg">
      </div>

    </div>
    <div class="main_cbody">
      <div class="cbody">
        <div  v-for="msg in message_list">
          <message :avatar="msg.avatar" :name="msg.name" :content="msg.content"/>
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
/*改变滑块的最大高度*/
.main_cbody::-webkit-scrollbar {
  width: 5px;
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
  position: absolute;
  width: 540px;
  height: 550px;
  background: #e7e5e1;
  border-top-right-radius: 6%;
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
    height: 300px;
    overflow: auto;
    .cbody{
      max-width: 100%;
      height: auto;
      /*    max-height: 440px;*/
      max-height: 400px;
      padding: 20px 40px 20px 40px;
      margin: 0px 40px 0px 0px;
      overflow: auto;
    }
  }
  .option_main{

  }
}
.bg-shadow{
  opacity: 0.4;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 4px 0px;
  position: absolute;
  width: 537px;
  height: 547px;
  background-color: rgba(0, 0, 0, 0.45);
  border: rgba(255, 255, 255, 0.44) solid 2px;
  z-index: -1;
  transform: translate(-7px,7px);
}
</style>
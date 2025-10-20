<script setup>
import {scroll_to_end,show_option,hide_option} from "@/api/ultis";
import {ref} from "vue";
//let answer_list=ref([" 怎么了吗？","遇到危险了吗？"]);
let props = defineProps(["dialog"]);
function on_decision(item){
  hide_option();
  let index=0;
  let message=item.answer;
  let dialog = props.dialog;


  let MessageInterval=setInterval(() => {

      let _message={
        avatar:dialog.meta.self_avatar,
        name:dialog.meta.self_name,
        content:message[index].content,
        emote:message[index].emote,
        self:true,
      };
    console.log(_message)
      props.dialog.message_list.value.push(
          _message
      )
      index+=1;
      if(index>=message.length){
        clearInterval(MessageInterval);
        props.dialog.destiny.value=item.destiny
        setTimeout(() => {
          props.dialog.run=true;
        }, 1000);

      }
}, 1000);
}
</script>

<template>
  <div class="option">
    <div class="answer" @click="on_decision(item)" v-for="item in props.dialog.options.value">
      {{ item.display }}
    </div>
  </div>
</template>

<style scoped>
.option{
  box-shadow: inset -1px 6px 3px -6px rgba(0, 0, 0, 0.56);
  padding-top: 16px;
  background-color: #d3d3d3;
  width: 100%;
  height: 190px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .answer {
    user-select: none;
    display: flex;
    justify-content: center;
    font-weight: 550;
    margin: 5px;
    background-color: #f1f1f1;
    align-items: center;
    border: darkgrey 1px solid;
    box-shadow: rgba(105, 105, 105, 0.18) 1px 1px 3px;
    text-align: center;
    width: 87%;
    height: 33px;
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
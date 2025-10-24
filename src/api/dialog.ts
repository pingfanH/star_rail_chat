import {scroll_to_end, show_option} from "@/api/ultis";
import {type Ref, ref, type UnwrapRef} from "vue";

type Message={
    avatar: string;
    name: string;
    content:string|null;
    self:boolean;
    emote:string|null;
}
type DiaLogMeta = {
    id:number;
    dialog_type:string;
    self_avatar:string;
    self_name:string;
    other_avatar:string;
    other_name:string;
    other_intro:string;
    group_name:string;
    group_intro:string;
    avatar_map: Record<string, { avatar:string,name:string }>;
    dialog_datas:Array<any>;
}

export default class dialog{
    all_data:Array<any> = [];
    data:any;
    meta:DiaLogMeta;
    offset:number;
    run:boolean;
    type:String;
    options:Ref = ref();
    destiny:Ref=ref();
    destiny_index:Ref=ref(0);
    option_flag:Ref=ref(false);
    option_index:Ref=ref(0);
    message_list:Ref<UnwrapRef<any[]>> = ref([]);
    constructor(tdata:any) {
        this.meta=JSON.parse(JSON.stringify(tdata));
        this.all_data = tdata;
        this.type=tdata.type;
        this.data=tdata.dialog_datas;
        this.offset=0;
        this.run=true;
    }
    start(fn:(data:any,self:this)=>{}){
        let MessageInterval=setInterval(() => {
            console.log("run",this.run)
            if(!this.run){return}
           if (this.msg_run(this.data[this.offset])){
               this.offset++;
           }
            if(this.offset==this.data.length){
                clearInterval(MessageInterval);
            }
        }, 1000);
    }
    msg_run(data:any):boolean{
        console.log(data);
        let message:Message;
        if (data.hasOwnProperty("options")) {
            if (this.option_flag.value){
                let answer = data.options[this.destiny.value].answer;
                if (this.option_index.value>answer.length-1){
                    this.option_index.value=0;
                    this.option_flag.value=false;
                    return true;
                }
                message = {
                    avatar: this.meta.self_avatar,
                    name: this.meta.self_name,
                    content:answer[this.option_index.value].content,
                    emote:data.emote,
                    self:true
                };
                this.message_list.value.push(
                          message
                )
                this.option_index.value+=1;
                return false;
            }else{
                this.options.value = data.options;
                this.option_flag.value=true;
                //this.destiny.value=data.options.destiny;
                show_option(this.meta.id);
                console.log(this.options.value)
                this.run = false;
                return false;
            }
        }
        if (data.hasOwnProperty("destiny")) {
            let destiny_data = data.destiny[this.destiny.value];
            console.log("destiny", this.destiny.value);
            console.log("destiny_data", data.destiny[this.destiny.value]);
            if (this.destiny_index.value >= destiny_data.length) {
                this.destiny_index.value = 0;
                return true;
            }
            this.callback(destiny_data[this.destiny_index.value]);
            this.destiny_index.value += 1;
            return false;
        }
        if (data.name==="this"){
            message = {
                avatar: this.meta.self_avatar,
                name: this.meta.self_name,
                emote:data.emote,
                content: data.content,
                self:true
            };
        }else
        if (this.meta.dialog_type==="group") {
            message= {
                avatar: this.meta.avatar_map[data.name].avatar,
                name:  this.meta.avatar_map[data.name].name,
                content: data.content,
                emote:data.emote,
                self:false
            };
        }else{
            message = {
                avatar: this.meta.other_avatar,
                name: this.meta.other_name,
                content: data.content,
                emote:data.emote,
                self:false
            };
        }
        scroll_to_end(this.meta.id);
        if (typeof data == "string") {
            message.content = data;
            this.message_list.value.push(message);
            return true;
        }else{
            this.message_list.value.push(message);
            return true;
        };
    }
    next():any{
        this.data[this.offset]=this.all_data[this.offset];
        this.offset++;
        return this.data[this.offset]
    }
    callback(data:any){
        console.log(data)
        let message:Message={
            avatar:this.meta.other_avatar,
            name:this.meta.other_name,
            content:"",
            emote:null,
            self:false
        };
        if(typeof data =="string"){
            message.content=data;
            this.message_list.value.push(message);
            return
        }else{
            message.content=data.content;
            message.emote=data.emote;
            this.message_list.value.push(message);
            return
        }
    }
}
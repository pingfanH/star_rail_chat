import {show_option} from "@/api/ultis";
import {type Ref, ref, type UnwrapRef} from "vue";

type Message={
    avatar: string;
    name: string;
    content:string|null;
    self:boolean;
    emote:string|null;
}
type DiaLogMeta = {
    dialog_type:string;
    self_avatar:string;
    self_name:string;
    other_avatar:string;
    other_name:string;
    other_intro:string;
    group_name:string;
    group_intro:string;
    avatar_map:object;
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
            fn(this.data[this.offset],this);
            this.offset++;
            if(this.offset==this.data.length){
                clearInterval(MessageInterval);
            }
        }, 1000);
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
        }else{
            message.content=data.content;
            message.emote=data.emote;
            this.message_list.value.push(message);
            return
        }
        if(data.hasOwnProperty("options")){
            this.options.value=data.options;
            //destiny.value=data.options.destiny;
            show_option();
            this.run=false;
            return;
        }
        if(data.hasOwnProperty("destiny")){
            this.run=false;
            let index=0;
            let destiny_data=data.destiny[this.destiny.value];
            console.log("destiny",this.destiny)
            console.log("destiny_data",data.destiny[this.destiny.value]);
            let MessageInterval=setInterval(() => {
                if(index>=destiny_data.length){
                    clearInterval(MessageInterval);
                    this.run=true;
                    return;
                }
                this.callback(destiny_data[index])
                index+=1;
            }, 1000);
            return;
        }

    }
}
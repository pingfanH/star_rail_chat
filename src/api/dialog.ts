export default class dialog{
    all_data:object;
    data:any;
    offset:number;
    run:boolean;
    type:String
    constructor(tdata:any) {
        this.all_data = tdata;
        this.type=tdata.type;
        this.data=tdata.dialog_datas;
        this.offset=0;
        this.run=true;
    }
    start(fn:(data)=>{}){
        let MessageInterval=setInterval(() => {
            console.log("run",this.run)
            if(!this.run){return}
            fn(this.data[this.offset]);
            this.offset++;
            if(this.offset==this.data.length){
                clearInterval(MessageInterval);
            }
        }, 1500);
    }
    next():any{
        this.data[this.offset]=this.all_data[this.offset];
        this.offset++;
        return this.data[this.offset]
    }
}
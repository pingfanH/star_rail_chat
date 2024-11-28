export class dialog{
    all_data:any[];
    data:any[];
    offset:number;
    run:boolean;
    constructor(data:any[]) {
        this.all_data  = data;
        for(var i=0;i<data.length;i++){
            this.data.push(undefined);
        }
    }
    start(){
        // setTimeout(()=>{
        //
        // },1000);
    }
    next(){
        this.data[this.offset]=this.all_data[this.offset];
        this.offset++;
    }

}
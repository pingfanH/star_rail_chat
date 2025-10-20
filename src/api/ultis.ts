import gsap from "gsap";
export function scroll_to_end(){
    // 目标元素
    var main_cbody = document.getElementsByClassName("main_cbody")[0];
    // 执行某些操作，针对每个变化
    // console.log("元素内容有更新！");
    // console.log(cbody.scrollHeight);
    // console.log(cbody.scrollTop);
    let tl = gsap.timeline({defaults: {duration: 1}});
    tl
        .to(main_cbody, {scrollTop:main_cbody.scrollHeight,duration:1})
    // main_cbody.lastElementChild.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'end',
    // });
}
export function show_option(){
    var main_cbody = document.getElementsByClassName("main_cbody")[0];
    var option_main=document.getElementsByClassName("option_main")[0];
    var cbody = document.getElementsByClassName("cbody")[0];

    let tl = gsap.timeline({defaults: {duration: 1}});
    tl
        .to(main_cbody, {height:270,duration:0.4})
        .to(cbody,{scroll_to_end},">")
        .to(option_main,{display:"flex",duration:0.2},"<")
        .to(option_main, {opacity:1,duration:0.3},">")
}
export function hide_option(){
    var main_cbody = document.getElementsByClassName("main_cbody")[0];
    var option_main=document.getElementsByClassName("option_main")[0];
    var cbody = document.getElementsByClassName("cbody")[0];

    let tl = gsap.timeline({defaults: {duration: 1}});
    tl
        .to(main_cbody, {height:480,duration:0.4})
        // .to(cbody,{scroll_to_end},">")
        .to(option_main, {opacity:0,duration:0.3},"<")
        .to(option_main,{display:"none",duration:0.2})
}
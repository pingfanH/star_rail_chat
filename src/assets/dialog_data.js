import {other_intro} from "@/api/data";

const dialog_data={
    type:"dm",
    self_avatar:"/src/assets/xing_avatar.png",
    self_name:"平凡H",
    other_avatar:"/src/assets/huohuo_avatar.png",
    other_name:"藿藿",
    other_intro:"尾巴大爷的小跟班",
    dialog_datas:[
        "救、救命...",
        {
            options:[
                {
                    display:"怎么了吗？",
                    answer:["怎么了吗？"],
                    destiny:0
                },
                {
                    display:"遇到危险了吗？",
                    answer:["遇到什么危险了吗? 在哪里，我马上过来"],
                    destiny:1
                }
            ],
        },
        {
            destiny:{
                0:[
                    "啊啊啊",
                    "刚才在群聊里，我说了一句话之后，就没有人回复我了",
                    "等了很久，还是没有人回复我",
                    "是不是冷场了？",
                    "怎么办",
                ],
                1:[
                    "啊啊啊",
                    "不是，我没有遇到危险",
                    "刚才在群聊里，我说了一句话之后，就没有人回复我了",
                    "等了很久，还是没有人回复我",
                    "是不是冷场了？",
                    "怎么办",
                ]
            }
        },
        {
            options:[
                {
                    display:"原来就这啊",
                    answer:["原来就这啊"],
                    destiny:0
                },
                {
                    display:"已经开始尴尬了",
                    answer:["已经开始尴尬了"],
                    destiny:1
                },
                {
                    display:"我来救场好了",
                    answer:["在哪个群，我去给你回复一个表情包"],
                    destiny:2
                }
            ]
        },
        {
            destiny:{
                0:[
                    "刚才在群聊里，我说了一句话之后，就没有人回复我了",
                    "等了很久，还是没有人回复我",
                    "是不是冷场了？",
                    "怎么办",
                ],
                1:[
                    "啊啊啊",
                    "不是，我没有遇到危险",
                    "刚才在群聊里，我说了一句话之后，就没有人回复我了",
                    "等了很久，还是没有人回复我",
                    "是不是冷场了？",
                    "怎么办",
                ],
                2:[
                    "判官工作群...",
                    "呜呜呜",
                    "心领了",
                    "！",
                    "太好了！",
                    "雪衣大人在群里回复我了",
                    "得救了",
                    "雪衣大人，我永远的恩人",
                ]
            }
        },
        {
            options:[
                {
                    display:"真是太好了呢",
                    answer:["真是太好了呢"],
                    destiny:0
                },
                {
                    display:"真是太可惜了",
                    answer:["真是太可惜了，如果一直冷场下去就好了","或许你会踏出那一步，有所成长了"],
                    destiny:1
                }
            ]
        },
        {
            destiny:{
                0:[
                    "[表情包]",
                ],
                1:[
                    "呜呜呜",
                    "那也太可怕了"
                ]
            }
        }

    ]
}
export default dialog_data;
// import { other_intro } from "@/api/data";

const dialog_data = {
  dialog_type: "dm",
  self_avatar: "/src/assets/xing_avatar.png",
  self_name: "平凡H",
  other_avatar: "/src/assets/huohuo_avatar.png",
  other_name: "藿藿",
  other_intro: "尾巴大爷的小跟班",
  dialog_datas: [
    "救、救命...",
    {
      options: [
        {
          display: "怎么了吗？",
          answer: [{
              content:"怎么了吗？"
          }],
          destiny: 0,
        },
        {
          display: "遇到危险了吗？",
          answer: [{
              content:"遇到什么危险了吗? 在哪里，我马上过来"
          }],
          destiny: 1,
        },
      ],
    },
    {
      destiny: {
        0: [
          "啊啊啊",
          "刚才在群聊里，我说了一句话之后，就没有人回复我了",
          "等了很久，还是没有人回复我",
          "是不是冷场了？",
          "怎么办",
        ],
        1: [
          "啊啊啊",
          "不是，我没有遇到危险",
          "刚才在群聊里，我说了一句话之后，就没有人回复我了",
          "等了很久，还是没有人回复我",
          "是不是冷场了？",
          "怎么办",
        ],
      },
    },
    {
      options: [
        {
          display: "原来就这啊",
          answer: [{
              content:"原来就这啊"
          }],
          destiny: 0,
        },
        {
          display: "已经开始尴尬了",
          answer: [{
              content:"已经开始尴尬了"
          }],
          destiny: 1,
        },
        {
          display: "我来救场好了",
          answer: [{
              content:"在哪个群，我去给你回复一个表情包"
          }],
          destiny: 2,
        },
      ],
    },
    {
      destiny: {
        0: [
          "刚才在群聊里，我说了一句话之后，就没有人回复我了",
          "等了很久，还是没有人回复我",
          "是不是冷场了？",
          "怎么办",
        ],
        1: [
          "啊啊啊",
          "不是，我没有遇到危险",
          "刚才在群聊里，我说了一句话之后，就没有人回复我了",
          "等了很久，还是没有人回复我",
          "是不是冷场了？",
          "怎么办",
        ],
        2: [
          "判官工作群...",
          "呜呜呜",
          "心领了",
          "！",
          "太好了！",
          "雪衣大人在群里回复我了",
          "得救了",
          "雪衣大人，我永远的恩人",
        ],
      },
    },
    {
      options: [
        {
          display: "真是太好了呢",
          answer: [{
              content:"真是太好了呢"
          }],
          destiny: 0,
        },
        {
          display: "真是太可惜了",
          answer: [{
              content:"真是太可惜了，如果一直冷场下去就好了"
          },{
              content: "或许你会踏出那一步，有所成长了"
          }
          ],
          destiny: 1,
        },
      ],
    },
    {
      destiny: {
        0: [{
            emote:"/src/assets/d6899fd8d4054000b6de7169622f4de6.jpg"
        }],
        1: ["呜呜呜", "那也太可怕了"],
      },
    },
  ],
};

const dialog_group_data = {

  dialog_type: "group",

  self_avatar: "/src/assets/xing_avatar.png",
  self_name: "平凡H",
  group_name: "分裂星",
  group_intro: "???",
  avatar_map: {
    xing1: {
      avatar: "/src/assets/xing_avatar.png",
      name: "洛叶归秋",
    },
    xing2: {
      avatar: "/src/assets/xing_avatar.png",
      name: "星4",
    },
    xing3: {
      avatar: "/src/assets/xing_avatar.png",
      name: "星3",
    },
  },

  dialog_datas: [
      {
         name:"xing1",
         content:"??",
      },
      {
          name:"xing2",
          content:"???"
      },
      {
          name:"xing3",
          content:"?????"
      },
      {
          options: [
              {
                  display: "????????",
                  answer: [ {
                      content:"????????"
                  },],
                  destiny: 0,
              },
          ],
      },
      {
          name:"xing1",
          content:"什么鬼...."
      },
      {
          options: [
              {
                  display: "什么鬼....",
                  answer: [
                      {
                          content:"什么鬼...."
                      },
                      {
                          emote:"/src/assets/d6899fd8d4054000b6de7169622f4de6.jpg"
                      }


                  ],
                  destiny: 0,
              },
          ],
      },

  ],
};

const dialog_data1 = {
    dialog_type: "dm",
    self_avatar: "/src/assets/xing_avatar.png",
    self_name: "平凡H",
    other_avatar: "/src/assets/huohuo_avatar.png",
    other_name: "藿藿",
    other_intro: "尾巴大爷的小跟班",
    dialog_datas: [
        "救、救命...",
        {
            options: [
                {
                    display: "真是太好了呢",
                    answer: [{
                        content:"真是太好了呢"
                    }],
                    destiny: 0,
                },
                {
                    display: "真是太可惜了",
                    answer: [{
                        content:"真是太可惜了，如果一直冷场下去就好了"
                    },{
                        content: "或许你会踏出那一步，有所成长了"
                    }
                    ],
                    destiny: 1,
                },
            ],
        },
        {
            destiny: {
                0: [{
                    emote:"/src/assets/d6899fd8d4054000b6de7169622f4de6.jpg"
                }],
                1: ["呜呜呜", "那也太可怕了"],
            },
        },
    ],
};


export { dialog_data, dialog_group_data,dialog_data1 };

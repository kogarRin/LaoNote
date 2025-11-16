const toolsIndex = [
    {
        className: "教学网站",
        partName: 'edu',
        tools: [
            {
                name: "学校官网",
                url: "https://www.gxu.edu.cn/",
                cardColorRgba: "135,206,250",
                get description() {
                    return `前往${this.name}官网`;
                }
            },
            {
                name: "教务系统",
                url: "https://jwxt2018.gxu.edu.cn/jwglxt/xtgl/login_slogin.html",
                cardColorRgba: "240,128,128",
                get description() {
                    return `前往${this.name}官网`;
                }
            }
        ]
    },
    {
        className: "开发网站",
        partName: 'dev',
        tools: [
            {
                name: "Vue",
                url: "https://cn.vuejs.org/",
                cardColorRgba: "34,139,34",
                get description() {
                    return `前往${this.name}官网`;
                }
            },
            {
                name: "Element Plus",
                url: "https://element-plus.org/",
                cardColorRgba: "100,149,237",
                get description() {
                    return `前往${this.name}官网`;
                }
            },
            {
                name: "MDN",
                url: "https://developer.mozilla.org/zh-CN/",
                cardColorRgba: "default",
                get description() {
                    return `前往${this.name}官网`;
                }
            },
            {
                name: "Electron",
                url: "https://www.electronjs.org/",
                cardColorRgba: "112,128,144",
                get description() {
                    return `前往${this.name}官网`;
                }
            },
        ]
    },
    {
        className: "其他网站",
        partName: 'other',
        tools: [
            {
                name: "Bilibili",
                url: "https://www.bilibili.com/",
                cardColorRgba: "238,175,175,0.8",
                get description() {
                    return `前往${this.name}官网`;
                },
            },
            {
                name: "GitHub",
                url: "https://github.com/",
                cardColorRgba: "166,162,162,0.91",
                get description() {
                    return `前往${this.name}官网`;
                },
            },
        ]
    }
]
export default toolsIndex;


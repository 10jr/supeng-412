/* ============================================
   影视剧榜单交互脚本
   作者：苏鹏
   所有变量与函数均以 SP_ 前缀开头
   ============================================ */

/* 苏鹏：榜单数据集合（从参考图 4 张截图提取） */
const SP_rankingData = {
    // 苏鹏：每日榜（图1）
    daily: [
        "最美的时光", "咱们结婚吧", "渗透", "继承者们", "烽火佳人",
        "极品女士第2季", "爱闪亮", "狼烟", "钱多多炼爱记", "苍狼"
    ],
    // 苏鹏：每周榜（图2）
    weekly: [
        "咱们结婚吧", "继承者们", "最美的时光", "爱闪亮", "渗透",
        "狼烟（2013）", "三十岁，你好", "钱多多炼爱记", "特种兵之火凤凰", "极品女士第2季"
    ],
    // 苏鹏：每月榜（图3）
    monthly: [
        "特种兵之火凤凰", "咱们结婚吧", "继承者们", "金玉满堂", "王的女人",
        "爱闪亮", "爱情面前谁怕谁", "英雄联盟", "小爸爸", "我们这拨人"
    ],
    // 苏鹏：全部榜（图4）
    all: [
        "永不磨灭的番号", "特种兵之火凤凰", "新还珠格格", "咱们结婚吧", "小爸爸",
        "心术", "乡村爱情5", "天天有喜", "一不小心爱上你", "夏日甜心"
    ]
};

/* 苏鹏：获取 DOM 元素 */
const SP_tabsEl = document.getElementById("SP_tabs");
const SP_rankListEl = document.getElementById("SP_rank-list");

/* 苏鹏：渲染榜单列表 */
function SP_renderList(type) {
    const list = SP_rankingData[type];
    if (!list) return;

    // 苏鹏：清空旧内容
    SP_rankListEl.innerHTML = "";

    // 苏鹏：生成每个列表项
    list.forEach(function (name, index) {
        const rank = index + 1;

        // 苏鹏：创建 li 元素
        const li = document.createElement("li");
        li.className = "SP_rank-item SP_rank-" + rank;

        // 苏鹏：创建序号方块
        const numSpan = document.createElement("span");
        numSpan.className = "SP_rank-num";
        numSpan.textContent = rank;

        // 苏鹏：创建剧本文本
        const nameSpan = document.createElement("span");
        nameSpan.className = "SP_rank-name";
        nameSpan.textContent = name;

        // 苏鹏：组合到 li 中
        li.appendChild(numSpan);
        li.appendChild(nameSpan);

        // 苏鹏：点击交互提示
        li.addEventListener("click", function () {
            alert("苏鹏：你点击了第 " + rank + " 名 - 《" + name + "》");
        });

        SP_rankListEl.appendChild(li);
    });
}

/* 苏鹏：Tab 切换事件绑定 */
function SP_bindTabs() {
    const tabs = SP_tabsEl.querySelectorAll(".SP_tab-item");
    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            // 苏鹏：移除所有 active 状态
            tabs.forEach(function (t) {
                t.classList.remove("SP_active");
            });

            // 苏鹏：给当前点击的 tab 加 active
            tab.classList.add("SP_active");

            // 苏鹏：获取数据类型并重新渲染
            const type = tab.getAttribute("data-type");
            SP_renderList(type);
        });
    });
}

/* 苏鹏：页面初始化入口 */
function SP_init() {
    SP_bindTabs();
    SP_renderList("daily"); // 默认渲染每日榜
}

// 苏鹏：DOM 就绪后启动
document.addEventListener("DOMContentLoaded", SP_init);

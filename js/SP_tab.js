/*
 * 作者: 苏鹏
 * 功能: 可复用的 Tab 选项卡切换逻辑
 * 使用方式: SP_initTabs('#容器选择器', '默认选中的 data-tab 值');
 */

/**
 * 函数功能说明：初始化指定容器内的 Tab 选项卡组件
 * 遍历容器内所有 .SP-tab-btn 按钮，统一绑定点击事件；
 * 支持多容器独立实例，互不干扰。
 * @param {string} containerSelector - Tab 容器的 CSS 选择器
 * @param {string} defaultTabKey     - 默认激活的选项卡 data-tab 值
 */
function SP_initTabs(containerSelector, defaultTabKey) {
  var container = document.querySelector(containerSelector);
  if (!container) {
    console.warn('[SP_Tab] 容器未找到: ' + containerSelector);
    return;
  }
  var buttons = container.querySelectorAll('.SP-tab-btn');
  var panels  = container.querySelectorAll('.SP-tab-panel');
  if (buttons.length === 0 || panels.length === 0) {
    console.warn('[SP_Tab] 按钮或面板数量为 0，请检查 HTML 结构');
    return;
  }
  // 苏鹏：为每个 Tab 按钮绑定点击事件监听
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetKey = btn.getAttribute('data-tab');
      SP_switchTab(buttons, panels, targetKey);
    });
  });
  // 苏鹏：页面初始化时根据传入的默认 key 激活初始选项卡
  SP_switchTab(buttons, panels, defaultTabKey);
}

/**
 * 函数功能说明：执行 Tab 切换的核心逻辑
 * 第一步：先清除所有选项卡按钮和面板的选中状态
 * 第二步：再为目标按钮与对应面板加上选中类
 * @param {NodeList} buttons   - 所有 Tab 按钮的集合
 * @param {NodeList} panels    - 所有内容面板的集合
 * @param {string}   targetKey - 目标选项卡的 data-tab / data-panel 值
 */
function SP_switchTab(buttons, panels, targetKey) {
  // 苏鹏：第一步——清除所有按钮和面板的选中状态
  buttons.forEach(function (btn) {
    btn.classList.remove('SP-tab-active');
  });
  panels.forEach(function (panel) {
    panel.classList.remove('SP-tab-active');
  });
  // 苏鹏：第二步——设置当前元素的选中状态
  var activeBtn   = document.querySelector('.SP-tab-btn[data-tab="' + targetKey + '"]');
  var activePanel = document.querySelector('.SP-tab-panel[data-panel="' + targetKey + '"]');
  if (activeBtn)   activeBtn.classList.add('SP-tab-active');
  if (activePanel) activePanel.classList.add('SP-tab-active');
}

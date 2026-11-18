# 项目代码规范（苏鹏）

## 一、HTML 文件头部注释规则

每次新建 HTML 文件时，必须在 `<!DOCTYPE html>` 之前添加头部注释，注释包含：**作者（苏鹏）、建立时间、使用大模型、功能名称**。

格式：

```html
<!--
作者: 苏鹏
建立时间: YYYY-MM-DD HH:mm
使用大模型: <模型名称>
功能名称: <该文件实现的功能简述>
-->
<!DOCTYPE html>
```

示例：

```html
<!--
作者: 苏鹏
建立时间: 2026-11-11 13:46
使用大模型: GLM-5.3-Flash (Trae)
功能名称: Swiper 配置验证页面（#wySw4）
-->
```

## 二、JavaScript 函数注释规则

在 HTML 内嵌 `<script>` 块或独立 `.js` 文件中，每一个自定义函数前必须添加注释，说明该函数**主要实现的功能**。

简单函数用单行注释：

```javascript
// 苏鹏：函数功能说明——在游戏区域随机位置生成一个小球
function sp_createBall() {
  // ...
}
```

复杂函数用 JSDoc：

```javascript
/**
 * 函数功能说明：初始化指定容器内的 Tab 选项卡组件
 * @param {string} containerSelector - 容器的 CSS 选择器
 * @param {string} defaultTabKey     - 默认激活的 data-tab 值
 */
function sp_initTabs(containerSelector, defaultTabKey) {
  // ...
}
```

## 三、命名规范（强制）

- CSS 类名必须以 `SP_` 开头（修饰状态类可用 `SP-` 前缀，如 `SP-tab-active`）
- HTML id 属性必须以 `SP_` 开头（题目指定 id 除外，如 `wySw4`）
- JavaScript 变量、函数、对象必须以 `SP_` 开头
- **例外**：第三方库的固定类名不可改名（如 Swiper 的 `swiper` / `swiper-wrapper` / `swiper-slide` / `swiper-pagination`），否则库初始化失效

## 四、首页入口规则

每次新建 HTML 文件时，必须在项目根目录的 `index.html` 首页中添加指向该新文件的超链接入口。

## 五、提示词追踪规则

每次执行任务前，将完整提示词以**追加**方式写入工作目录下的 `sp_prompt.md`，格式：

```
---
**时间**: YYYY-MM-DD HH:mm
**模型**: <模型名>
**提示词内容**:
> <原始提示词>
---
```

不得覆盖已有内容。

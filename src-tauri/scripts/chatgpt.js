// 等待页面加载完成后执行的函数
const css=/* css */`
    .bg-token-main-surface-primary {
        background-color: #21212140 !important;
    }
    body, html {
        background-color: #88888800 !important;
    }
`
document.addEventListener("DOMContentLoaded", function() {
    // 创建一个按钮元素
    const button = document.createElement("button");
    button.innerHTML = "Reset";
    button.style.position = "fixed";
    button.style.top = "5px";
    button.style.right = "12vw";
    button.style.zIndex = "9999";
    button.style.cursor = "pointer";
    button.style.padding = "5px";
    button.style.border = "1px";
    button.style.borderRadius="2px";
    button.style.backgroundColor = "rgba(204,204,204,0.34)";
    button.style.color = "#ffffff";

    // 将按钮添加到页面的body元素中
    document.body.appendChild(button);

    // 绑定按钮的点击事件，当点击按钮时，重定向到 https://chat.openai.com/
    button.addEventListener("click", function() {
        window.location.href = "https://chat.openai.com/";
    });


    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
});

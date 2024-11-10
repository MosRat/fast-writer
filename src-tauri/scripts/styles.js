const css = /* css */ `
  /*透明设置*/
  /*html,body {*/
  /*  !*background-color: rgba(211, 211, 211, 0.05) !important; !* 几乎透明的浅灰色 *!*!*/
  /*  */
  /*  background: linear-gradient(rgba(252, 248, 235, 0.1), rgba(255, 250, 230, 0.1));*/
  /*  -webkit-backdrop-filter: blur(5px);*/
  /*  backdrop-filter: blur(5px);*/
  /*  */
  /*  border-radius: 10px; !* 圆角边框 *!*/
  /*  !*padding: 10px; !* 增加内边距以防止内容贴近边框 *!*!*/
  /*  !*margin: 10px; !* 添加外边距以提供边框周围的空间 *!*!*/
  /*}*/
  /*.ide-react-main, .ide-react-main *:not(i):not(span):not(header):not(button) {*/
  /*  !*background-color: rgba(136,134,134,0.05) !important; !* 几乎透明的浅灰色 *!*!*/
  /*  background: linear-gradient(rgba(252, 248, 235, 0.1), rgba(255, 250, 230, 0.1));*/
  /*  -webkit-backdrop-filter: blur(5px);*/
  /*  backdrop-filter: blur(5px);*/
  /*}*/
  
  
  
  /*.ide-react-main header{*/
  /*      !*background-color: rgba(200,190,200,0.15)!important;*!*/
  /*  background: linear-gradient(rgba(252, 248, 235, 0.1), rgba(255, 250, 230, 0.1));*/
  /*  -webkit-backdrop-filter: blur(5px);*/
  /*  backdrop-filter: blur(5px);    */
  /*      */
  /*}*/
  
  /*.ide-react-main [role] > *{*/
  /*  !*background-color: rgba(200,200,200,0.15)!important;*!*/
  /*  background: linear-gradient(rgba(252, 248, 235, 0.1), rgba(255, 250, 230, 0.1));*/
  /*  -webkit-backdrop-filter: blur(5px);*/
  /*  backdrop-filter: blur(5px);*/
  /*}*/
  
  /*.ide-react-main [role='tree']  * {*/
  /*      !*background-color: rgba(136,134,134,0.05) !important; !* 几乎透明的浅灰色 *!*!*/
  /*  background: linear-gradient(rgba(252, 248, 235, 0.1), rgba(255, 250, 230, 0.1));*/
  /*  -webkit-backdrop-filter: blur(5px);*/
  /*  backdrop-filter: blur(5px);*/
  /*}*/
  
  /*尝试注入*/
  html,body {
        background-color: transparent !important; /* 设置背景透明 */
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        border-radius: 15px; /* 圆角 */
    }

    #rounded-container {
        background-color: rgba(255, 255, 255, 0.1); /* 半透明白色背景 */
        border-radius: 15px; /* 圆角 */
        padding: 1vh 1vw;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* 阴影效果 */
        width: 100%; /* 宽度减去左右内边距 */
        height: 100%; /* 高度减去上下内边距 */
        margin: 5px auto; /* 居中 */
        box-sizing: border-box;
        overflow: auto; /* 启用滚动 */
    }
    
    #rounded-container::-webkit-scrollbar {
        display: none; /* 对 WebKit 浏览器隐藏滚动条 */
    }
    
    .navbar-default {
        position: static !important;
    }
    
    .content-alt{
        background-color: rgba(255, 255, 255, 0.1)!important; /* 半透明白色背景 */
        border-radius: 5px !important;
        margin-top: 20px !important;
        padding-top: 0 !important;
    }
   
    /*导航栏和背景透明*/
    nav.navbar-default , .project-list-sidebar-wrapper-react, .form-control, .table-container, .project-list-sidebar{
        
        background-color: rgba(255, 255, 255, 0) !important; /* 半透明白色背景 */
        border: none !important;
        
    }
    /*项目item透明*/
    .card{
        background: linear-gradient(rgba(252, 248, 235, 0.25), rgba(255, 250, 230, 0.25)) !important;
        -webkit-backdrop-filter: blur(15px) !important;
        backdrop-filter: blur(15px) !important;
    }
    /*项目悬停透明*/
    .project-list-table-row:hover{
        background-color: rgba(255, 255, 255, 0.25) !important; /* 半透明白色背景 */
    }
    /*编辑器容器圆角*/
    #chat-wrapper{
        border-radius: 15px;
    }
    /*加载画面透明*/
    .loading-screen
    {
        background-color: rgba(255, 255, 255, 0.25) !important; /* 半透明白色背景 */
        margin: 0 !important;
    }
    :root{
    --bg-light-secondary : rgba(255, 255, 255, 0.1) !important;
    --bg-light-tertiary:rgba(255, 255, 255, 0.1) !important;
    --bg-light-disabled:rgba(255, 255, 255, 0.1) !important;
    --bg-light-primary:rgba(255, 255, 255, 0.1) !important;
    }
    
    .form-check-input{
        --bs-form-check-bg:rgba(255, 255, 255, 0.1) !important;
    }
    
   
    
    /*滚动条设置*/
    /* 隐藏整个滚动条 */
    ::-webkit-scrollbar {
    width: 6px; /* 可以调整滚动条的宽度 */
    height: 6px; /* 对于水平滚动条的高度也可以调整 */
    }
    
    /* 隐藏滚动条按钮（上下箭头） */
    ::-webkit-scrollbar-button {
    display: none;
    }
    
    /* 设置滚动条滑块（滑动部分）的样式 */
    ::-webkit-scrollbar-thumb {
        background-color: rgba(214,214,214,0.75); /* 设置一个半透明的滑块 */
        border-radius: 4px;
    }
    
    /* 设置滚动条轨道透明 */
    ::-webkit-scrollbar-track {
        background-color: rgba(107,107,107,0.25)
    }
    
    @media (prefers-color-scheme: light) {
    :root{
            --white : #232323 !important;
            --neutral-90:rgba(255, 255, 255, 0.5) !important;
            --content-primary: #232323 !important;
        }
        .navbar-brand{
            filter: invert(1) !important;
        }
    }
    
    /*光标*/
    @media (prefers-color-scheme: dark)  {
        * {
            caret-color: #ffffff !important;
        }
        :root{
            --blue-50:rgb(91,127,218) !important;
            --blue-60:rgb(91,127,218) !important;
            --blue-70:rgb(91,127,218) !important;
            --neutral-70:rgb(91,127,218) !important;
        }
        
    }
    
    /*自定义配色方案*/
    
    /*编辑器背景颜色*/
    .cm-content.cm-lineWrapping {
        background-color: rgb(0 0 0 / 25%) !important;
        font-family: 'JetBrains Mono', monospace !important;
    }
    
    .ͼe {
        color:  rgba(194,166,76,0.74) !important;
    }
    .ͼf .tok-keyword {
        color: #F35D6F;
    }
    .ͼf .tok-punctuation {
        color: #8F93D2;
    }
    .ͼf .tok-typeName {
        color: #A9DC76;
    }
    .ͼf .tok-comment {
        color: #898989;
    }
    .ͼf .tok-attributeValue {
        color: #AB9DF2;
    }
    .ͼ1 .ol-cm-spelling-error {
        text-decoration-color: #f86ed0 !important;
        text-decoration-style: dashed !important;
        text-decoration-thickness: 0.5px !important;
    }
    .ͼ1 .tok-literal {
        color: #f47730;
        font-weight: bold;
    }
    .ͼf .tok-string {
        color: #F59762;
    }
  
  
`;

function injectCSS(cssString) {

    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@3.1.5/css/latin.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);


    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(cssString));
    document.head.appendChild(style);


    // 创建一个容器div
    const container = document.createElement('div');
    container.id = 'rounded-container';

// 将body的所有子元素移动到新的容器中
    while (document.body.firstChild) {
        container.appendChild(document.body.firstChild);
    }

// 将容器添加到body中
    document.body.appendChild(container);

}

document.addEventListener('DOMContentLoaded', () => {
        console.log(window.location.href, "load scripts")
        const footers = document.querySelectorAll('.site-footer');
        footers.forEach(footer => footer.remove());
        const navbarBrand = document.querySelector('.navbar-brand');
        if (navbarBrand) {
            navbarBrand.style.backgroundImage = 'url("https://cdn.overleaf.com/images/overleaf-white-65b70e33f35fccdf6f8d.svg")';
            navbarBrand.style.height = '80px';
        }
        injectCSS(css)

    }
)

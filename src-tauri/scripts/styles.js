const css = /* css */ `
  /*透明设置*/
  html,body {
    background-color: rgba(211, 211, 211, 0.05) !important; /* 几乎透明的浅灰色 */
    border-radius: 10px; /* 圆角边框 */
    /*padding: 10px; !* 增加内边距以防止内容贴近边框 *!*/
    /*margin: 10px; !* 添加外边距以提供边框周围的空间 *!*/
  }
  .ide-react-main, .ide-react-main *:not(i):not(span):not(header):not(button) {
    background-color: rgba(136,134,134,0.05) !important; /* 几乎透明的浅灰色 */
  }
  

  
  .ide-react-main header{
        background-color: rgba(200,190,200,0.15)!important;
  }
  
  .ide-react-main [role] > *{
        background-color: rgba(200,200,200,0.15)!important;
  }
  
  .ide-react-main [role='tree']  * {
        background-color: rgba(136,134,134,0.05) !important; /* 几乎透明的浅灰色 */
  }
  
  
  
    /*滚动条设置*/
    /* 隐藏整个滚动条 */
    ::-webkit-scrollbar {
    width: 8px; /* 可以调整滚动条的宽度 */
    height: 8px; /* 对于水平滚动条的高度也可以调整 */
    }
    
    /* 隐藏滚动条按钮（上下箭头） */
    ::-webkit-scrollbar-button {
    display: none;
    }
    
    /* 设置滚动条滑块（滑动部分）的样式 */
    ::-webkit-scrollbar-thumb {
        background-color: rgba(93,92,92,0.45); /* 设置一个半透明的滑块 */
        border-radius: 4px;
    }
    
    /* 设置滚动条轨道透明 */
    ::-webkit-scrollbar-track {
        background-color: rgba(24,24,24,0.65)
    }
    
    /*光标*/
    @media (prefers-color-scheme: dark)  {
        * {
            caret-color: #ffffff !important;
        }
    }
    
    /*自定义配色方案*/
    
    /*编辑器背景颜色*/
    .cm-content.cm-lineWrapping {
        background-color: rgb(0 0 0 / 25%) !important;
        font-family: 'JetBrains Mono', monospace !important;
    }
    
    .ͼe {
        color:  #f5d15ebd !important;
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
}

document.addEventListener('DOMContentLoaded', () => {
        console.log(window.location.href, "load scripts")
        injectCSS(css)
    }
)

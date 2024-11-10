/*
 * Copyright (c) 2024. MosRat
 * All rights reserved.
 *
 * Project: fast-writer
 * File Name: formula_editor.js
 * Author: MosRat (work@whl.moe)
 * Description:
 */

const css = /* css */ `
    /*尝试注入*/
     html,body {
            background-color: rgba(255, 255, 255, 0.1) !important; /* 设置背景透明 */
            margin: 0;
            height: initial !important;
            padding: 0;
     }
     body{
        padding-bottom: 20vh !important;
     }
     
     #txta_input, #div_copy{
            background-color: rgba(255, 255, 255, 0.5) !important; /* 设置背景透明 */
     }
     
     .card,.card-body,.card-header{
        background: linear-gradient(rgba(252, 248, 235, 0.1), rgba(255, 250, 230, 0.1)) !important;
        -webkit-backdrop-filter: blur(5px) !important;
        backdrop-filter: blur(5px) !important;
     }
     
     .card{
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
     }
     
     .btn-outline-primary{
        color: inherit !important;
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
        background-color: rgba(191,191,191,0.75); /* 设置一个半透明的滑块 */
        border-radius: 4px;
    }
    
    /* 设置滚动条轨道透明 */
    ::-webkit-scrollbar-track {
        background-color: rgba(100,100,100,0.4)
    }

`

const injectCSS = (cssString) => {

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

const onLoad = async () => {
    console.log(window.location.href, "load scripts")
    document.getElementById("navbar-header")?.remove()
    document.getElementById("footer")?.remove()
    document.getElementById("btn_setting")?.remove()
    document.querySelector("html").style.backgroundColor = "rgba(255, 255, 255, 0.1) !important"
    document.querySelectorAll(".card-body").forEach(
        ele => ele.style.backgroundColor = "rgba(255, 255, 255, 0.1) !important"
    )

    injectCSS(css)
    await initTauri()
}

const initTauri = async () => {
    const tauri = window.__TAURI__
    const {listen, emit} = tauri.event
    const {invoke} = tauri.core
    const {getCurrentWindow} = tauri.window
    console.log(tauri)

    // fix tauri bug https://github.com/tauri-apps/tauri/issues/8632#issuecomment-975607891
    await getCurrentWindow().show();
    await getCurrentWindow().setDecorations(true);


    const textArea = document.getElementById("txta_input")

    function simulateUserInput(textarea, text) {
        if (textarea) {
            // 设置文本
            textarea.value += text;

            // 创建并触发输入事件
            const event = new Event('input', {
                bubbles: true,
                cancelable: true,
            });
            textarea.dispatchEvent(event);
        } else {
            console.error(`Element with id ${textarea} not found.`);
        }
    }

    // 假设显示尺寸固定为 200x200
    const displayWidth = 300;
    const displayHeight = 100;

    // 创建 canvas 元素
    const canvas = document.createElement('canvas');
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const context = canvas.getContext('2d');

    await listen('latex_arrive', async event => {
        const {latex, w, h} = event.payload
        console.log("latex_arrive", latex, w, h)
        const f = Math.max(w / displayWidth, h / displayHeight)


        const fw = w / f
        const fh = h / f


        simulateUserInput(textArea, latex)

        const imgBuffer = await invoke("get_screenshot")
        const imageData = new ImageData(new Uint8ClampedArray(imgBuffer), w, h);

        // 将原始图像缩放到固定尺寸并绘制到 canvas 上
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = w;
        tempCanvas.height = h;
        const tempContext = tempCanvas.getContext('2d');
        tempContext.putImageData(imageData, 0, 0);

        // 缩放并绘制到目标 canvas
        context.clearRect(0, 0, displayWidth, displayHeight);
        context.drawImage(tempCanvas, 0, 0, fw, fh);

        tempCanvas.remove()
    })

    await emit("init")

}


document.addEventListener('DOMContentLoaded', onLoad)
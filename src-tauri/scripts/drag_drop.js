/*
 * Copyright (c) 2024. MosRat
 * All rights reserved.
 *
 * Project: fast-writer
 * File Name: drag_drop.js
 * Author: MosRat (work@whl.moe)
 * Description:
 */

function simulateFileDrop(x, y, filePath, type = 'drop') {
    // 获取指定坐标位置的元素
    const element = document.elementFromPoint(x, y);
    if (!element) {
        console.error("No element found at the specified coordinates.");
        return;
    }

    // 创建一个 DataTransfer 对象
    const dataTransfer = new DataTransfer();
    dataTransfer?.setData('text/plain', filePath);

    // 创建一个自定义的 drop 事件
    const dropEvent = new DragEvent(type, {
        bubbles: true,
        cancelable: true,
        dataTransfer: dataTransfer
    });

    // 触发 drop 事件
    element.dispatchEvent(dropEvent);
    console.log(`drop trigger at ${x} ${y}`)
    console.log(element)
}

function createDebugFileDropper() {
    // 创建并插入一个固定在左上角的 div 元素
    const dropZone = document.createElement('div');
    dropZone.id = 'dropZone';
    dropZone.style.position = 'fixed';
    dropZone.style.top = '0';
    dropZone.style.left = '0';
    dropZone.style.width = '200px';
    dropZone.style.height = '200px';
    dropZone.style.backgroundColor = 'lightgray';
    dropZone.style.border = '2px dashed #000';
    dropZone.style.display = 'flex';
    dropZone.style.alignItems = 'center';
    dropZone.style.justifyContent = 'center';
    dropZone.style.fontFamily = 'Arial, sans-serif';
    dropZone.style.color = '#333';
    dropZone.textContent = 'Drop files here';
    document.body.appendChild(dropZone);

// 添加拖放事件监听器
    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault(); // 防止默认行为以允许放置
    });

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();

        const dataTransfer = event.dataTransfer;

        // 打印数据类型
        console.log('Data types:', dataTransfer.types);

        // 遍历项目并打印属性
        for (let i = 0; i < dataTransfer.items.length; i++) {
            const item = dataTransfer.items[i];
            console.log(`Item ${i}:`);
            console.log('  kind:', item.kind);
            console.log('  type:', item.type);
        }
    });
}


const onLoad = async () => {
    createDebugFileDropper()
    const tauri = window.__TAURI__
    const {getCurrentWebview} = tauri.webview
    const {getCurrentWindow} = tauri.window
    const scaleFactor = await getCurrentWindow().scaleFactor()
    console.log(scaleFactor)
    const webview = getCurrentWebview()
    // await webview.onDragDropEvent((event) => {
    //     if (event.payload.type === 'drop') {
    //         console.log('User dropped', event.payload.paths, event.payload.position);
    //         const logicalPosition = event.payload.position.toLogical(scaleFactor);
    //         console.log(event.payload.paths)
    //         console.log(logicalPosition)
    //         console.log(simulateFileDrop)
    //         simulateFileDrop(logicalPosition.x, logicalPosition.y, event.payload.paths)
    //     } else if (event.payload.type === 'enter') {
    //         const logicalPosition = event.payload.position.toLogical(scaleFactor);
    //         simulateFileDrop(logicalPosition.x, logicalPosition.y, event.payload.paths, 'dragenter')
    //     } else if (event.payload.type === 'over') {
    //         const logicalPosition = event.payload.position.toLogical(scaleFactor);
    //         simulateFileDrop(logicalPosition.x, logicalPosition.y, "", 'dragover')
    //     } else if (event.payload.type === 'leave') {
    //         simulateFileDrop(0, 0, "", 'dragleave')
    //     }
    // });

}


document.addEventListener('DOMContentLoaded', onLoad)


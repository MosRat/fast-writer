import {invoke} from "@tauri-apps/api/core";

export async function navigate_webview(label: string, url: string) {
    await invoke("navigate_webview", {
        label,
        url
    })
}

export async function open_devtools(label?:string) {
    await invoke("open_devtool", {
        label,
    })
}
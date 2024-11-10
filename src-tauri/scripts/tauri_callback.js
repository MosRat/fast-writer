

document.addEventListener('DOMContentLoaded',async ()=>{
    const { invoke } = window.__TAURI__.core
    const {emit} = window.__TAURI__.event
    await invoke('set_complete', {task: 'frontend'})
    await emit("loaded")
})
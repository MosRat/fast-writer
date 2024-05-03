// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use tauri::{
    LogicalPosition,
    LogicalSize,
    WebviewUrl,
};
use tauri::utils::config::WindowEffectsConfig;
use tauri::utils::WindowEffect;


#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let width = 1600.;
            let height = 1000.;
            let header_h =40.;
            let window = tauri::window
            ::WindowBuilder::new(app, "main")
                .inner_size(width, height)
                .decorations(false)
                .transparent(true)
                .shadow(true)
                .effects(WindowEffectsConfig {
                    effects: vec![WindowEffect::Acrylic, WindowEffect::Mica],
                    state: None,
                    radius: None,
                    color: None,
                })
                .title("fast-writer")
                .build()?;
            let _header = window.add_child(
                tauri::webview::WebviewBuilder::new("h", WebviewUrl::App("/header".parse().unwrap()))
                    .auto_resize()
                    .transparent(true)
                ,
                LogicalPosition::new(0., 0.),
                LogicalSize::new(width, header_h),
            )?;

            let _webview1 = window.add_child(
                tauri::webview::WebviewBuilder::new("w1", WebviewUrl::App(Default::default()))
                    .auto_resize()
                    .transparent(true)
                ,
                LogicalPosition::new(0., header_h),
                LogicalSize::new(width / 4., height - header_h),
            )?;
            let _webview2 = window.add_child(
                tauri::webview::WebviewBuilder::new(
                    "w2",
                    WebviewUrl::External("https://www.overleaf.com/project".parse().unwrap()),
                )
                    .auto_resize()
                    .transparent(true)
                    .initialization_script(include_str!("../scripts/styles.js"))
                ,
                LogicalPosition::new(width / 4. , header_h),
                LogicalSize::new(width / 4. *3., height - header_h),
            )?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

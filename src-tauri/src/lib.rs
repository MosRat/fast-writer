// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod wv;

use tauri::{
    LogicalPosition,
    LogicalSize,
    WebviewUrl,
    Manager,
};
use tauri::utils::config::WindowEffectsConfig;
use tauri::utils::WindowEffect;
use wv::*;


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
            let header_h = 40.;
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
                LogicalSize::new(width / 4., (height - header_h) / 4f64),
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
                LogicalPosition::new(width / 4., header_h),
                LogicalSize::new(width / 4. * 3., height - header_h),
            )?;

            let _webview3 = window.add_child(
                tauri::webview::WebviewBuilder::new("w3", WebviewUrl::External("https://chat.openai.com/".parse().unwrap()))
                    .auto_resize()
                    .transparent(true)
                    .data_directory(app.path().app_data_dir().unwrap())
                    .user_agent(r#"Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"#)
                    .initialization_script(include_str!("../scripts/chatgpt.js"))
                ,
                LogicalPosition::new(0., header_h + (height - header_h) / 4f64),
                LogicalSize::new(width / 4., 3. * (height - header_h) / 4f64),
            )?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet,navigate_webview,open_devtool])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

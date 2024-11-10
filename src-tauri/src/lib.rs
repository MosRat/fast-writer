// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod config;
mod hotkeys;
mod screenshot;
mod setup;
mod tray;
mod window;
mod wv;
mod api;

use log::info;
use setup::{build_main_window, setup};
use std::sync::{Mutex, OnceLock};
use tauri::{AppHandle, Manager, Theme};
use wv::*;

use crate::config::reload_config;
use crate::screenshot::{screenshot, ScreenshotWrapper, get_screenshot};
use crate::setup::set_complete;
use crate::tray::create_tray;
use crate::window::formula_window;
use tauri_plugin_log::{Target, TargetKind};
use tauri_plugin_notification::NotificationExt;

pub static APP: OnceLock<AppHandle> = OnceLock::new();

pub struct SetupState {
    frontend_task: bool,
    backend_task: bool,
}


#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_upload::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_single_instance::init(|app, _, cwd| {
            app.notification()
                .builder()
                .title("The program is already running. Please do not start it again!")
                .body(cwd)
                .icon("fast writer")
                .show()
                .unwrap();
        }))
        .plugin(
            tauri_plugin_log::Builder::new()
                .targets([
                    Target::new(TargetKind::LogDir { file_name: None }),
                    Target::new(TargetKind::Stdout),
                    // Target::new(TargetKind::Webview),
                ])
                .level(log::LevelFilter::Warn)
                .build(),
        )
        .plugin(tauri_plugin_shell::init())
        .manage(Mutex::new(SetupState {
            frontend_task: false,
            backend_task: false,
        }))
        .manage(ScreenshotWrapper::new())
        .setup(|app| {
            // app.set_theme(Some(Theme::Light));
            APP.get_or_init(|| app.handle().clone());
            build_main_window(app.handle().clone())?;
            create_tray(app.handle())?;
            tauri::async_runtime::spawn(setup(app.handle().clone()));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            navigate_webview,
            open_devtool,
            set_complete,
            screenshot,
            get_screenshot,
            formula_window,
            reload_config
        ])
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, code, .. } => {
                info!("App requested exit");
                match code {
                    None => api.prevent_exit(),
                    Some(_) => {}
                }
            }
            tauri::RunEvent::Exit => {
                info!("App exit");
            }
            _ => {}
        });
}

use crate::hotkeys::register_hotkey;
use crate::window::{build_screenshot_window, screenshot_window};
use crate::SetupState;
use anyhow::Result;
use log::{info, warn};
use std::sync::Mutex;
use tauri::utils::config::WindowEffectsConfig;
use tauri::utils::WindowEffect;
use tauri::{AppHandle, LogicalPosition, LogicalSize, Manager, Monitor, Rect, State, WebviewUrl};

pub(crate) fn build_main_window(app: AppHandle) -> Result<()> {
    let width = 1400;
    let height = 900;
    let header_h = 40;
    let window = tauri::window::WindowBuilder::new(&app, "main")
        .inner_size(width as f64, height as f64)
        .decorations(false)
        .transparent(true)
        .resizable(true)
        .drag_and_drop(false)
        .effects(WindowEffectsConfig {
            effects: vec![
                #[cfg(target_os = "windows")]
                WindowEffect::Tabbed,
            ],
            state: None,
            radius: None,
            color: None,
        })
        .title("fast-writer")
        .visible(false)
        .build()?;

    #[cfg(target_os = "windows")]
    window.set_shadow(true)?;

    window.set_size(LogicalSize::new(width, height))?;
    info!("scale_factor:{:}",app.primary_monitor()?.unwrap().scale_factor());
    info!("main window size: Logic {:?} Physical {:?}",window.inner_size(),window.inner_size().map(|p|p.to_logical::<f64>(app.primary_monitor().unwrap().unwrap().scale_factor())));

    let _header = window.add_child(
        tauri::webview::WebviewBuilder::new("h", WebviewUrl::App("/header".parse().unwrap()))
            .auto_resize()
            .transparent(true),
        LogicalPosition::new(0, 0),
        LogicalSize::new(width, header_h),
    )?;

    _header.set_size(LogicalSize::new(width, header_h))?;
    _header.set_position(LogicalPosition::new(0, 0))?;
    // _header.set_bounds(Rect { position: LogicalPosition::new(0, 0).into(), size: LogicalSize::new(width as i32, header_h as i32).into() })?;

    // let _webview1 = window.add_child(
    //     tauri::webview::WebviewBuilder::new("w1", WebviewUrl::App(Default::default()))
    //         .auto_resize()
    //         .transparent(true)
    //         .enable_clipboard_access(),
    //     LogicalPosition::new(0, 0),
    //     LogicalSize::new(0, 0),
    // )?;
    // _webview1.set_bounds(Rect {
    //     position: LogicalPosition::new(0, 0).into(),
    //     size: LogicalSize::new(0, 0).into(),
    // })?;

    let _webview2 = window.add_child(
        tauri::webview::WebviewBuilder::new(
            "w2",
            // WebviewUrl::External("https://www.overleaf.com/project".parse().unwrap()),
            WebviewUrl::External("https://overleaf.whl.moe/project".parse().unwrap()),
        )
            .auto_resize()
            .transparent(true)
            .enable_clipboard_access()
            .disable_drag_drop_handler() // enable file drop on frontend
            .initialization_script(include_str!("../scripts/styles.js"))
            .initialization_script(include_str!("../scripts/tauri_callback.js")),
            // .initialization_script(include_str!("../scripts/drag_drop.js")),
        LogicalPosition::new(20, header_h),
        LogicalSize::new(width - 40, height - header_h),
    )?;
    _webview2.set_bounds(Rect {
        position: LogicalPosition::new(20, header_h).into(),
        size: LogicalSize::new(width - 40, height - header_h).into(),
    })?;

    // let _webview3 = window.add_child(
    //     tauri::webview::WebviewBuilder::new("w3", WebviewUrl::External("https://chat.openai.com/".parse().unwrap()))
    //         .auto_resize()
    //         .transparent(true)
    //         .data_directory(app.path().app_data_dir().unwrap())
    //         .user_agent(r#"Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"#)
    //         .initialization_script(include_str!("../scripts/chatgpt.js"))
    //     ,
    //     LogicalPosition::new(0, 0),
    //     LogicalSize::new(0, 0),
    // )?;
    //
    // _webview3.set_bounds(Rect {
    //     position: LogicalPosition::new(0, 0).into(),
    //     size: LogicalSize::new(0, 0).into(),
    // })?;

    Ok(())
}

pub(crate) async fn setup(app: AppHandle) -> Result<()> {
    // create_tray(&app)?;

    let _ = register_hotkey(
        &app,
        move |_app_handle, _key, event| {
            use tauri_plugin_global_shortcut::ShortcutState;
            match event.state() {
                ShortcutState::Pressed => {
                    tauri::async_runtime::spawn(async {
                        let s = std::time::Instant::now();
                        info!(">>>>>>>>>>>>>>>>>>>>>>>>>>ShortCur Received!>>>>>>>>>>>>>>>>>>>>>>>");
                        screenshot_window();
                        info!("create window time cost:{:?}", s.elapsed());
                    });
                }
                _ => {}
            }
        },
        "Ctrl+Shift+Q",
    )
        .inspect_err(|e| warn!("{e}"));

    let _ = build_screenshot_window();

    let _ = set_complete(
        app.clone(),
        app.state::<Mutex<SetupState>>(),
        "backend".to_string(),
    )
        .await;
    Ok(())
}

// A custom task for setting the state of a setup task
#[tauri::command]
pub async fn set_complete(
    app: AppHandle,
    state: State<'_, Mutex<SetupState>>,
    task: String,
) -> Result<(), ()> {
    // Lock the state without write access
    let mut state_lock = state.lock().unwrap();
    match task.as_str() {
        "frontend" => state_lock.frontend_task = true,
        "backend" => state_lock.backend_task = true,
        _ => panic!("invalid task completed!"),
    }
    // Check if both tasks are completed
    if state_lock.backend_task && state_lock.frontend_task {
        // Setup is complete, we can close the splashscreen
        // and unhide the main window!
        if let Some(splash_window) = app.get_webview_window("splashscreen") {
            let main_window = app.get_window("main").unwrap();
            splash_window.close().unwrap();
            main_window.show().unwrap();
        }
    }
    Ok(())
}

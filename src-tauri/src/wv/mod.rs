use tauri::{Manager, Url};

#[tauri::command]
pub fn navigate_webview(
    app_handle: tauri::AppHandle,
    label: &str,
    url: &str,
) -> Result<(), String> {
    let mut webview = app_handle
        .get_webview(label)
        .ok_or(&format!("No such webview :{label}"))?;
    webview
        .navigate(Url::parse(url).unwrap())
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn open_devtool(app_handle: tauri::AppHandle, label: Option<String>) -> Result<(), String> {
    let webview = (if let Some(l) = label {
        app_handle.get_webview(&l)
    } else {
        app_handle.get_webview("main")
    })
    .ok_or("No such webview")?;
    webview.open_devtools();
    Ok(())
}

// #[tauri::command]
// pub async fn open()

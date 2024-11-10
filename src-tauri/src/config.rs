/*
 * Copyright (c) 2024. MosRat
 * All rights reserved.
 *
 * Project: fast-writer
 * File Name: config.rs
 * Author: MosRat (work@whl.moe)
 * Description:
 */

use crate::APP;
use anyhow::Result;
use log::{info, warn};
use serde_json::{json, Value};
use std::sync::{Arc, Mutex};
use tauri::{AppHandle, Manager, Wry};
use tauri_plugin_store::{Store, StoreExt};

pub fn init_config(app: &AppHandle) -> Result<()> {
    let config_path = app.path().app_config_dir()?.join("config.json");
    info!("Load config from: {:?}", config_path);
    let _store = match app.store(config_path) {
        Ok(s) => {
            info!("Success load config");
            s
        }
        Err(e) => {
            warn!("Fail load config {e:?}");
            return Ok(());
        }
    };

    Ok(())
}

pub fn get(key: &str) -> Option<Value> {
    let app = APP.get().unwrap();
    let config_path = app.path().app_config_dir().unwrap().join("config.json");

    let store = app.store(&config_path).unwrap();
    match store.get(key) {
        Some(value) => {
            info!("Get config {key:?}={value:?} from: {:?}", config_path);
            Some(value.clone())
        }
        None => None,
    }
}

pub fn set<T: serde::ser::Serialize>(key: &str, value: T) {
    let app = APP.get().unwrap();
    let config_path = app.path().app_config_dir().unwrap().join("config.json");

    let store = app.store(&config_path).unwrap();
    store.set(key, json!(value));
    store.save().unwrap();
}

pub fn is_first_run() -> bool {
    let app = APP.get().unwrap();
    let config_path = app.path().app_config_dir().unwrap().join("config.json");

    let store = app.store(&config_path).unwrap();
    store.is_empty()
}

#[tauri::command]
pub async fn reload_config(app_handle: AppHandle) -> Result<(), String> {
    let config_path = app_handle
        .path()
        .app_config_dir()
        .unwrap()
        .join("config.json");
    app_handle
        .store(&config_path)
        .map_err(|e| e.to_string())?
        .reload()
        .map_err(|e| e.to_string())?;
    Ok(())
}

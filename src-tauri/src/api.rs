/*
 * Copyright (c) 2024. MosRat
 * All rights reserved.
 *
 * Project: fast-writer
 * File Name: api.rs
 * Author: MosRat (work@whl.moe)
 * Description:
 */
use serde_json::Value;
use tauri_plugin_http::reqwest::{Client, multipart, header::HeaderMap};

pub async fn simple_latex(img: Vec<u8>) -> Result<String, String> {
    let client = Client::builder()
        .no_proxy()
        .build().map_err(|e| e.to_string())?;

    let mut headers = HeaderMap::new();
    headers.insert("token", "j1edciUjALCrBzmDoeyLrMYNPeCh6kZIdYRlaXqpAFCteLL7RaJCWR7qHSb9B04K".parse().unwrap());

    let part = multipart::Part::bytes(img)
        .file_name("file.png");
    let form = multipart::Form::new()
        .part("file", part)
        ;

    let res: Value = client
        .post("https://server.simpletex.cn/api/latex_ocr/v2")
        .headers(headers)
        .multipart(form)
        .send()
        .await.map_err(|e| e.to_string())?
        .json()
        .await.map_err(|e| e.to_string())?;
    if res.get("status")
        .ok_or("cant get json value!")?
        .as_bool()
        .ok_or("cant get json value!")? == true {
        Ok(
            res.get("res")
                .ok_or("cant get json value!")?
                .get("latex")
                .ok_or("cant get json value!")?
                .as_str()
                .ok_or("cant get json value!")?
                .to_string()
        )
    } else {
        Err(format!("Fail to {:}", res))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use tokio;
    #[tokio::test]
    async fn test_simple_tex() {
        let mut img = std::fs::read(r#"E:\WorkSpace\RustProjects\fast-writer\img.png"#).unwrap();
        println!("{:}", simple_latex(img).await.unwrap());
    }
}


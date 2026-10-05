# MORI — Brand Website Showcase

Public showcase of the MORI brand site, published as a portfolio piece.

## Try it

https://apchen1978.github.io/mori-soft-furnishing-demo/

## About this showcase

- Premium residential editorial direction for a home-interiors brand
- Sections: hero → services → selected spaces → process → trade intelligence → consultation
- Built with plain HTML/CSS/JavaScript — no framework, no build step

## Notes on this demo

- **LINE 連結是佔位符**：`href="#line-notice"`，帳號設定後才會換成真實連結
- **表單為展示用途**：不會傳送任何資料，送出後只顯示流程說明
- **貿易觀點區為架構展示**：demo preview，不提供線上報價、下單、付款、物流或外部資料傳送
- 不含客戶案例、成交數字、流量或轉換成果

## Run locally

Serve this folder with any static server, e.g.:

```sh
python -m http.server 8000
# open http://localhost:8000
```

## Verification

- No horizontal overflow at 390px / 768px / desktop
- All images load with descriptive alt text
- WCAG AA contrast on all measured text pairs
- LINE links point to `#line-notice` only; form never claims data was sent

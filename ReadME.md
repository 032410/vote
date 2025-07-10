# 這是一個 Twitch投票系統Demo
這是一個基礎的聊天室投票系統，目前可以連接.env裡檔中所寫的使用者Twitch聊天室，在聊天室打!投票A(A可以替換、選項目前沒有限制)，並在另一個網頁上即時以長條圖更新票數

## 功能簡介
- 連接自己(.env檔)的 Twitch 聊天室
- 支援 `!投票 A / B / C` 等指令
- Web 前端即時顯示投票結果（長條圖動畫）
- 可嵌入 OBS 畫面

## 使用方式
### 1. 安裝
```bash
git clone https://github.com/你的帳號/twitch-vote
cd twitch-vote
npm install
```
### 2.設定.env變數
TWITCH_USERNAME=你的 Twitch 帳號（小寫）
TWITCH_TOKEN=oauth:xxxxxxxxxxxxxxxxxxx
TWITCH_CHANNEL=你的頻道名稱（不含 #）

### 3.啟動伺服器
node server.js

### OBS 嵌入方式
http://localhost:3000/obs.html


## 待辦功能（進行中）
 - 多使用者登入並連接各自聊天室
 - 投票倒數計時與自動結束
 - 資料庫記錄每次投票
 - 手機板介面優化
 - OBS 視覺效果更流暢與主題化

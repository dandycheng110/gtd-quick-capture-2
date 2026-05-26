# GTD Quick Capture

> 給行動派的腦袋清空工作台。React 期末專題。

把腦中雜事「快速倒出 → 快速分類」的單頁 Web 應用程式，專注在 GTD 方法論的 **Capture** 與 **Clarify** 兩個關鍵環節。

---

## 為什麼做這個

我自己每天有大量散落的想法 — 論文片段、YouTube 靈感、學習筆記、雜事提醒。Notion 太重、Apple Notes 太散、Todoist 跳過了「分類決策」這一步。

這個工具的核心信念：**捕捉要無摩擦，分類要結構化**。

---

## 目前進度

**v0.1**
- [x] CaptureBar：頂部輸入框，Enter 送出
- [x] 全域快捷鍵 N → focus 輸入框
- [x] localStorage 自動同步
- [x] 空狀態提示

**v0.2（目前）**
- [x] ItemCard 抽出獨立元件
- [x] Inline 編輯（雙擊或按鉛筆，Enter 存、Esc 取消）
- [x] 完成勾選（圈圈打勾）
- [x] 五大分類視圖 + Inbox（共用 CategoryView 元件）
- [x] 側邊分類導覽 CategoryNav（含數量徽章）
- [x] 跨分類移動項目

**v0.3（規劃中）**
- [ ] Clarify Wizard：五題決策流程
- [ ] 移動分類改為漂亮的下拉選單（取代目前的 prompt）

**v1.0（最終）**
- [ ] 鍵盤導覽（J/K/E/D/Space）
- [ ] Two-Minute Timer
- [ ] Context Tags
- [ ] Claude API 智能分類建議
- [ ] Stats Dashboard
- [ ] Vercel 部署

---

## 技術棧

| 類別 | 選擇 |
|---|---|
| 建置工具 | Vite 6 |
| UI 框架 | React 18 |
| 樣式 | Tailwind CSS 3 |
| 狀態管理 | useReducer + Context API |
| 持久化 | localStorage |
| 圖示 | Lucide React |

刻意不引入 Redux／Zustand — 這個專題的規模 useReducer + Context 完全夠，引入大型狀態管理會讓程式碼變複雜，與「展示 React Hooks 熟練度」的目標違背。

---

## 專案結構

```
src/
├── main.jsx              # 進入點
├── App.jsx               # 頂層元件
├── index.css             # Tailwind 引入 + 全域樣式
├── context/
│   ├── AppContext.jsx    # Provider + useApp hook + localStorage 整合
│   └── reducer.js        # 所有狀態變更邏輯 (純函式)
├── hooks/
│   └── useLocalStorage.js
├── components/
│   ├── CaptureBar.jsx
│   └── InboxView.jsx
└── utils/                # (後續會放純函式工具)
```

---

## 本地開發

需求：Node.js 18+

```bash
# 安裝依賴
pnpm install

# 啟動開發伺服器（自動開瀏覽器）
pnpm dev

# 建置正式版
pnpm build

# 預覽正式版
pnpm preview
```

---

## 設計決策摘要

**為什麼用 useReducer 而不是 useState？**
全域狀態需要 8+ 種操作（CAPTURE、CLARIFY、MOVE、DELETE...），散在元件裡會難以維護。Reducer 集中所有邏輯，方便除錯與測試。

**為什麼用 Context 而不是 props drilling？**
ItemCard 在元件樹的第 5 層，每一層手動傳 `dispatch` 過於繁瑣，且中間層元件根本不需要這個 prop。

**為什麼新項目放最前面？**
最新捕捉的東西通常是腦袋最熱的，要立刻看到才不會「啊我剛剛打了什麼來著」。

**為什麼 Capture 與 Clarify 分開兩個流程？**
GTD 核心原則：捕捉時不做決策，避免打斷思考流。決策集中在 Clarify 模式做，一次做完。

---

## 作者

成育典 (成claw, 不是成課)
- 國立陽明交通大學 資訊管理研究所 資安管理組
- YouTube: AI 工具實戰應用

---

## 授權

MIT

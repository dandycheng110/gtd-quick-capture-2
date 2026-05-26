// =============================================================================
// App.jsx — 頂層元件（v0.2 更新）
// =============================================================================
// v0.2 架構：
//   AppProvider
//     └─ AppLayout（新增，因為要用 useState 記住目前分類）
//          ├─ CaptureBar
//          └─ 主內容區
//               ├─ CategoryNav（側邊導覽）
//               └─ CategoryView（依 activeCategory 顯示對應分類）
//
// 為什麼多一個 AppLayout？
//   因為 activeCategory 這個 state 需要用 useApp()（要在 Provider 內），
//   而 App 本身是放 Provider 的地方（在 Provider 外）。
//   所以把「需要 state 的部分」抽到 AppLayout，它在 Provider 內部。
// =============================================================================

import { useState } from 'react';
import { AppProvider } from './context/AppContext.jsx';
import { CATEGORIES } from './context/reducer.js';
import CaptureBar from './components/CaptureBar.jsx';
import CategoryNav from './components/CategoryNav.jsx';
import CategoryView from './components/CategoryView.jsx';

// 內層 Layout：在 Provider 內部，可以用 useState 管理「目前看哪個分類」
function AppLayout() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.INBOX);

  return (
    <div className="min-h-screen flex flex-col">
      <CaptureBar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <CategoryNav
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
          <CategoryView category={activeCategory} />
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-slate/60">
        GTD Quick Capture v0.2 · 成育典 · React 期末專題
      </footer>
    </div>
  );
}

// 外層：只負責放 Provider
export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}

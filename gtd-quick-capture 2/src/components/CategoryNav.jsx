// =============================================================================
// CategoryNav.jsx — 側邊分類導覽（v0.2 新增）
// =============================================================================
// 顯示六個分類的清單，點擊切換目前檢視的分類，並顯示每個分類的項目數量。
//
// 學習重點：
// 1. 用 CATEGORY_ORDER + CATEGORY_META 動態產生導覽，不寫死六個按鈕
//    （資料驅動 UI，這是 React 的核心精神）
// 2. 動態對應 Lucide 圖示：用一個 map 把名稱字串轉成元件
// =============================================================================

import {
  Inbox, Zap, Clock, Cloud, BookMarked, CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { CATEGORY_ORDER, CATEGORY_META } from '../utils/categories.js';

// 把 categories.js 裡的「圖示名稱字串」對應到實際的 Lucide 元件
const ICON_MAP = {
  Inbox, Zap, Clock, Cloud, BookMarked, CheckCircle2,
};

// props:
//   activeCategory — 目前選中的分類
//   onSelect       — 點擊某分類時呼叫
export default function CategoryNav({ activeCategory, onSelect }) {
  const { state } = useApp();

  // 計算每個分類有幾個項目（給徽章用）
  function countOf(cat) {
    return state.items.filter(it => it.category === cat).length;
  }

  return (
    <nav className="w-full sm:w-56 flex-shrink-0">
      <ul className="flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
        {CATEGORY_ORDER.map(cat => {
          const meta = CATEGORY_META[cat];
          const Icon = ICON_MAP[meta.icon];
          const count = countOf(cat);
          const isActive = cat === activeCategory;

          return (
            <li key={cat} className="flex-shrink-0">
              <button
                onClick={() => onSelect(cat)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left
                            transition-colors whitespace-nowrap
                            ${isActive
                              ? 'bg-moss text-paper'
                              : 'text-ink hover:bg-moss/10'}`}
              >
                <Icon
                  size={18}
                  className={isActive ? 'text-paper' : 'text-moss'}
                  strokeWidth={2}
                />
                <span className="flex-1 text-sm font-medium">{meta.label}</span>
                {count > 0 && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-medium
                                ${isActive
                                  ? 'bg-paper/20 text-paper'
                                  : 'bg-slate/15 text-slate'}`}
                  >
                    {count}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

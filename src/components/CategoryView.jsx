// =============================================================================
// CategoryView.jsx — 共用分類視圖（v0.2 新增）
// =============================================================================
// 一個元件，靠 props（category）變化就能顯示任何分類的內容。
// 這就是「共用元件」的威力：不用為六個分類各寫一個 component。
//
// 學習重點：
// 1. 同一個元件 + 不同 props = 不同畫面（React 的核心：UI = f(props, state)）
// 2. 在這裡把 dispatch 包成具名函式，當作 props 傳給 ItemCard
//    （事件處理的「往上報」由這層轉接到 reducer）
// 3. 簡單的「移動分類」實作：用 prompt 選下一個分類（v0.2 先簡單做，
//    v0.3 之後可以改成漂亮的選單）
// =============================================================================

import {
  Inbox, Zap, Clock, Cloud, BookMarked, CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { ACTIONS, CATEGORIES } from '../context/reducer.js';
import { CATEGORY_META, CATEGORY_ORDER } from '../utils/categories.js';
import ItemCard from './ItemCard.jsx';

const ICON_MAP = {
  Inbox, Zap, Clock, Cloud, BookMarked, CheckCircle2,
};

// props:
//   category — 要顯示哪個分類
export default function CategoryView({ category }) {
  const { state, dispatch } = useApp();
  const meta = CATEGORY_META[category];
  const Icon = ICON_MAP[meta.icon];

  // 篩出這個分類的項目，新的在上
  const items = state.items
    .filter(it => it.category === category)
    .sort((a, b) => b.createdAt - a.createdAt);

  // === 把 dispatch 包成具名函式，傳給 ItemCard ===
  // ItemCard 不知道 dispatch 的存在，它只會呼叫這些函式「通知父層」
  function handleEdit(id, content) {
    dispatch({ type: ACTIONS.UPDATE_CONTENT, payload: { id, content } });
  }

  function handleDelete(id) {
    if (confirm('確定刪除這個項目？')) {
      dispatch({ type: ACTIONS.DELETE, payload: id });
    }
  }

  function handleToggleDone(id) {
    dispatch({ type: ACTIONS.TOGGLE_DONE, payload: id });
  }

  // 簡易移動：用 prompt 讓使用者輸入目標分類編號
  // （v0.2 先求功能可用，UX 之後再優化）
  function handleMove(id) {
    const options = CATEGORY_ORDER
      .filter(c => c !== category)
      .map((c, i) => `${i + 1}. ${CATEGORY_META[c].label}`)
      .join('\n');
    const targets = CATEGORY_ORDER.filter(c => c !== category);
    const choice = prompt(`移動到哪個分類？輸入編號：\n${options}`);
    const idx = parseInt(choice, 10) - 1;
    if (idx >= 0 && idx < targets.length) {
      dispatch({ type: ACTIONS.MOVE, payload: { id, category: targets[idx] } });
    }
  }

  return (
    <div className="flex-1 min-w-0">
      {/* 標題列 */}
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
          <Icon size={20} className="text-moss" />
          {meta.label}
          <span className="text-sm font-normal text-slate">{meta.zh}</span>
        </h2>
        <span className="text-sm text-slate">{items.length} 項</span>
      </div>

      {/* 空狀態 */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate">
          <Icon size={44} strokeWidth={1.5} className="mb-3 opacity-30" />
          <p className="text-base mb-1">{meta.label} 沒有項目</p>
          <p className="text-xs opacity-60">{meta.desc}</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleDone={handleToggleDone}
              onMove={handleMove}
              showMoveButton={category !== CATEGORIES.DONE}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

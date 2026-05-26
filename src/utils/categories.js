// =============================================================================
// categories.js — 分類的顯示設定
// =============================================================================
// 把「每個分類的中文名、說明、Lucide 圖示名稱」集中在這裡。
// 為什麼要這樣？因為 Inbox 視圖、側邊導覽、分類視圖都會用到這些資訊，
// 如果每個地方各寫一份，改一個名字要改三處。集中管理 = 改一次到處生效。
//
// 注意：這裡只存「圖示的名稱字串」，不直接 import 圖示元件，
// 讓使用端自己決定怎麼渲染（保持這個檔案是純資料、無 React 依賴）。
// =============================================================================

import { CATEGORIES } from '../context/reducer.js';

// 顯示順序（側邊導覽會照這個順序排）
export const CATEGORY_ORDER = [
  CATEGORIES.INBOX,
  CATEGORIES.NEXT,
  CATEGORIES.WAITING,
  CATEGORIES.SOMEDAY,
  CATEGORIES.REFERENCE,
  CATEGORIES.DONE,
];

// 每個分類的顯示資訊
// icon 欄位存 lucide-react 的元件名稱字串，使用端再對應到實際元件
export const CATEGORY_META = {
  [CATEGORIES.INBOX]: {
    label: 'Inbox',
    zh: '收件匣',
    desc: '剛捕捉、還沒處理',
    icon: 'Inbox',
  },
  [CATEGORIES.NEXT]: {
    label: 'Next Actions',
    zh: '下一步行動',
    desc: '可立即執行的事',
    icon: 'Zap',
  },
  [CATEGORIES.WAITING]: {
    label: 'Waiting For',
    zh: '等待中',
    desc: '等別人回應或交付',
    icon: 'Clock',
  },
  [CATEGORIES.SOMEDAY]: {
    label: 'Someday',
    zh: '未來也許',
    desc: '以後再考慮的點子',
    icon: 'Cloud',
  },
  [CATEGORIES.REFERENCE]: {
    label: 'Reference',
    zh: '參考資料',
    desc: '不需行動，存著參考',
    icon: 'BookMarked',
  },
  [CATEGORIES.DONE]: {
    label: 'Done',
    zh: '已完成',
    desc: '完成或已捨棄',
    icon: 'CheckCircle2',
  },
};

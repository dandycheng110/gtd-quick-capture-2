// =============================================================================
// useLocalStorage.js — 自訂 Hook
// 把 state 自動同步到 localStorage，使用方式跟 useState 一模一樣：
//   const [items, setItems] = useLocalStorage('gtd-items', [])
// =============================================================================

import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // useState 初始值傳函式 → lazy initialization，只在第一次 render 執行
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved === null) return initialValue;
      return JSON.parse(saved);
    } catch (err) {
      console.warn(`[useLocalStorage] 讀取 ${key} 失敗:`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`[useLocalStorage] 寫入 ${key} 失敗:`, err);
    }
  }, [key, value]);

  return [value, setValue];
}

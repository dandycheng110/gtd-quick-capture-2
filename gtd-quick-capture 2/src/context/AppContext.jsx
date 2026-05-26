// =============================================================================
// AppContext.jsx — 全域狀態 Provider
// useReducer (邏輯) + Context (傳遞) + localStorage (持久化)
// = 完整的小型狀態管理系統，不用 Redux 也夠用
// =============================================================================

import { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { reducer, initialState } from './reducer.js';

const AppContext = createContext(null);

const STORAGE_KEY = 'gtd-quick-capture-v1';

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 追蹤「是否已 hydrate」，避免初始狀態覆蓋掉 localStorage 舊資料
  const isHydrated = useRef(false);

  // mount 時從 localStorage 讀
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        dispatch({ type: 'HYDRATE', payload: JSON.parse(saved) });
      }
    } catch (err) {
      console.warn('[AppContext] hydrate 失敗:', err);
    }
    isHydrated.current = true;
  }, []);

  // state 變化時寫回 localStorage
  useEffect(() => {
    if (!isHydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('[AppContext] 寫入失敗:', err);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// 自訂 hook：包一層讓使用更簡潔，並做「忘了 Provider」的防呆
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp() 必須在 <AppProvider> 內部使用');
  }
  return ctx;
}

// =============================================================================
// CaptureBar.jsx — 快速捕捉輸入框
// 用到四個 hook：useState（文字）、useRef（DOM）、useEffect（全域鍵盤）、useApp（dispatch）
// =============================================================================

import { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { ACTIONS } from '../context/reducer.js';

export default function CaptureBar() {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const { dispatch } = useApp();

  function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch({ type: ACTIONS.CAPTURE, payload: trimmed });
    setText('');
  }

  function handleKeyDown(e) {
    // isComposing：中文輸入法選字過程中也會觸發 Enter，要排除
    if (e.key === 'Enter' && !e.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  }

  // 全域快捷鍵 N：focus 到輸入框
  useEffect(() => {
    function handleGlobalKey(e) {
      const tag = document.activeElement?.tagName;
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA';
      if (e.key === 'n' && !isTyping) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  return (
    <div className="sticky top-0 z-10 bg-paper/90 backdrop-blur-sm border-b border-slate/15 px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="把腦袋裡的東西丟進來... (按 N 快速聚焦)"
          className="flex-1 px-4 py-3 bg-white border border-slate/20 rounded-lg
                     focus:outline-none focus:border-moss focus:ring-2 focus:ring-moss/20
                     text-ink placeholder:text-slate/60 transition-all"
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="px-4 py-3 bg-moss text-paper rounded-lg
                     hover:bg-mossLight active:scale-95
                     disabled:opacity-30 disabled:cursor-not-allowed
                     transition-all flex items-center gap-1.5"
          aria-label="新增"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span className="text-sm font-medium hidden sm:inline">Capture</span>
        </button>
      </div>
    </div>
  );
}

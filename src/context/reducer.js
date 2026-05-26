// =============================================================================
// reducer.js — GTD 專題的狀態邏輯中樞
// =============================================================================
// 純 JavaScript（沒有 React import），因為 reducer 是純函式：
// 給定相同 input，必出相同 output。純函式好測試、好理解、好除錯。
//
// 元件不直接修改 state，而是 dispatch({ type, payload })，
// 由這裡決定「收到某 action 時 state 該變成什麼」。
// =============================================================================

export const CATEGORIES = {
  INBOX: 'inbox',
  NEXT: 'next',
  WAITING: 'waiting',
  SOMEDAY: 'someday',
  REFERENCE: 'reference',
  DONE: 'done',
};

export const initialState = {
  items: [],
  selectedId: null,
  clarifyQueue: [],
  isShortcutPanelOpen: false,
};

export const ACTIONS = {
  HYDRATE: 'HYDRATE',
  CAPTURE: 'CAPTURE',
  CLARIFY: 'CLARIFY',
  UPDATE_CONTENT: 'UPDATE_CONTENT',
  MOVE: 'MOVE',
  DELETE: 'DELETE',
  TOGGLE_DONE: 'TOGGLE_DONE',
  SELECT: 'SELECT',
  ENTER_CLARIFY: 'ENTER_CLARIFY',
  EXIT_CLARIFY: 'EXIT_CLARIFY',
  TOGGLE_SHORTCUT_PANEL: 'TOGGLE_SHORTCUT_PANEL',
};

export function reducer(state, action) {
  switch (action.type) {

    case ACTIONS.HYDRATE: {
      return { ...initialState, ...action.payload };
    }

    case ACTIONS.CAPTURE: {
      const newItem = {
        id: crypto.randomUUID(),
        content: action.payload,
        category: CATEGORIES.INBOX,
        contextTag: null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        completedAt: null,
      };
      return { ...state, items: [newItem, ...state.items] };
    }

    case ACTIONS.CLARIFY: {
      return {
        ...state,
        items: state.items.map(it =>
          it.id === action.payload.id
            ? {
                ...it,
                category: action.payload.category,
                contextTag: action.payload.contextTag ?? null,
                updatedAt: Date.now(),
              }
            : it
        ),
        clarifyQueue: state.clarifyQueue.filter(id => id !== action.payload.id),
      };
    }

    case ACTIONS.UPDATE_CONTENT: {
      return {
        ...state,
        items: state.items.map(it =>
          it.id === action.payload.id
            ? { ...it, content: action.payload.content, updatedAt: Date.now() }
            : it
        ),
      };
    }

    case ACTIONS.MOVE: {
      return {
        ...state,
        items: state.items.map(it =>
          it.id === action.payload.id
            ? { ...it, category: action.payload.category, updatedAt: Date.now() }
            : it
        ),
      };
    }

    case ACTIONS.DELETE: {
      return {
        ...state,
        items: state.items.filter(it => it.id !== action.payload),
        selectedId: state.selectedId === action.payload ? null : state.selectedId,
      };
    }

    case ACTIONS.TOGGLE_DONE: {
      return {
        ...state,
        items: state.items.map(it => {
          if (it.id !== action.payload) return it;
          const isDone = it.category === CATEGORIES.DONE;
          return {
            ...it,
            category: isDone ? CATEGORIES.NEXT : CATEGORIES.DONE,
            completedAt: isDone ? null : Date.now(),
            updatedAt: Date.now(),
          };
        }),
      };
    }

    case ACTIONS.SELECT: {
      return { ...state, selectedId: action.payload };
    }

    case ACTIONS.ENTER_CLARIFY: {
      const inboxIds = state.items
        .filter(it => it.category === CATEGORIES.INBOX)
        .map(it => it.id);
      return { ...state, clarifyQueue: inboxIds };
    }

    case ACTIONS.EXIT_CLARIFY: {
      return { ...state, clarifyQueue: [] };
    }

    case ACTIONS.TOGGLE_SHORTCUT_PANEL: {
      return { ...state, isShortcutPanelOpen: !state.isShortcutPanelOpen };
    }

    default:
      return state;
  }
}

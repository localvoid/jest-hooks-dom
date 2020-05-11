import { useResetDOMEventListeners } from "./events";

/**
 * useResetDOM enables following resets:
 * - useResetDOMGlobalEventListeners
 * - removes all nodes from `document.body`.
 */
export function useResetDOM() {
  useResetDOMEventListeners();
  document.body.textContent = "";
}

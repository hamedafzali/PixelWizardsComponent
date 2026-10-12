import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CommandItem, CommandPaletteProps } from "./CommandPalette.types";

/** Score a candidate: prefix > word start > substring > in-order letters. */
function score(item: CommandItem, query: string): number {
  if (!query) return 1;
  const q = query.toLowerCase();
  const label = item.label.toLowerCase();
  const rest = [item.hint, ...(item.keywords ?? [])].filter(Boolean).join(" ").toLowerCase();
  if (label.startsWith(q)) return 100 - label.length / 100;
  if (label.split(/[\s\-_/.]+/).some((w) => w.startsWith(q))) return 80;
  if (label.includes(q)) return 60;
  if (rest.includes(q)) return 40;
  let i = 0;
  for (const ch of label) if (ch === q[i]) i++;
  return i === q.length ? 20 : 0;
}

/**
 * Keyboard-first "jump to anything" dialog (⌘K / Ctrl+K pattern).
 * - Type to filter; ↑/↓ move, Enter runs, Escape closes.
 * - Combobox + listbox semantics so screen readers follow the active option.
 * The caller owns the shortcut and the open state; see `useCommandPaletteShortcut`.
 */
export const CommandPalette: React.FC<CommandPaletteProps> = ({ open, ...rest }) => {
  if (!open || typeof document === "undefined") return null;
  // Mounted only while open, so query and selection start fresh every time.
  return <PaletteBody {...rest} />;
};

const PaletteBody: React.FC<Omit<CommandPaletteProps, "open">> = ({
  onClose,
  items,
  placeholder = "Search or jump to…",
  emptyText = "No results",
  groupLimit = 8,
}) => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  // Focus the search field, and hand focus back to the opener on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    return () => opener?.focus?.();
  }, []);

  const groups = useMemo(() => {
    const ranked = items
      .map((item) => ({ item, s: score(item, query.trim()) }))
      .filter((r) => r.s > 0);
    if (query.trim()) ranked.sort((a, b) => b.s - a.s);
    const map = new Map<string, CommandItem[]>();
    for (const { item } of ranked) {
      const key = item.group ?? "";
      const list = map.get(key) ?? [];
      if (list.length < groupLimit) list.push(item);
      map.set(key, list);
    }
    return Array.from(map.entries());
  }, [items, query, groupLimit]);

  const flat = useMemo(() => groups.flatMap(([, list]) => list), [groups]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    el?.scrollIntoView?.({ block: "nearest" });
  }, [active]);

  const run = (item?: CommandItem) => {
    if (!item) return;
    onClose();
    item.onSelect();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (flat.length ? (i + 1) % flat.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(flat[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  let index = -1;
  const activeId = flat[active] ? `${listId}-${flat[active].id}` : undefined;

  return createPortal(
    <div className="pw-command-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pw-command" role="dialog" aria-modal="true" aria-label="Command palette" onKeyDown={onKeyDown}>
        <div className="pw-command__search">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            className="pw-command__input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder={placeholder}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="pw-command__kbd">Esc</kbd>
        </div>
        <div ref={listRef} id={listId} className="pw-command__list" role="listbox" aria-label="Results">
          {flat.length === 0 ? (
            <div className="pw-command__empty">{emptyText}</div>
          ) : (
            groups.map(([group, list]) => (
              <div key={group || "_"} role="group" aria-label={group || undefined}>
                {group && <div className="pw-command__group">{group}</div>}
                {list.map((item) => {
                  index += 1;
                  const i = index;
                  return (
                    <div
                      key={item.id}
                      id={`${listId}-${item.id}`}
                      data-index={i}
                      role="option"
                      aria-selected={i === active}
                      className={`pw-command__item${i === active ? " pw-command__item--active" : ""}`}
                      onMouseMove={() => i !== active && setActive(i)}
                      onClick={() => run(item)}
                    >
                      {item.icon && <span className="pw-command__icon">{item.icon}</span>}
                      <span className="pw-command__label">{item.label}</span>
                      {item.hint && <span className="pw-command__hint">{item.hint}</span>}
                      {item.shortcut && <kbd className="pw-command__kbd">{item.shortcut}</kbd>}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <div className="pw-command__footer">
          <span><kbd className="pw-command__kbd">↑</kbd><kbd className="pw-command__kbd">↓</kbd> navigate</span>
          <span><kbd className="pw-command__kbd">↵</kbd> open</span>
        </div>
      </div>
    </div>,
    document.body,
  );
};

/** Toggle a palette with ⌘K / Ctrl+K (and "/" when not typing in a field). */
export function useCommandPaletteShortcut(setOpen: (fn: (open: boolean) => boolean) => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        !!target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setOpen(() => true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);
}

import React, { useEffect } from "react";
import { clsx } from "clsx";

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  active?: boolean;
  /** Count or status shown at the end of the item. */
  badge?: React.ReactNode;
  onClick?: () => void;
}

export interface SidebarSection {
  /** Section heading; hidden while collapsed. */
  title?: string;
  items: SidebarItem[];
}

export interface SidebarLinkRenderProps {
  item: SidebarItem;
  className: string;
  "aria-current"?: "page";
  title?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export interface SidebarProps {
  sections: SidebarSection[];
  /** Brand or app name at the top. */
  header?: React.ReactNode;
  /** Status or account info at the bottom. */
  footer?: React.ReactNode;
  /** Icon-only rail on desktop. */
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Toggle `collapsed` with Ctrl/Cmd+B. @default true */
  shortcut?: boolean;
  /** Drawer state below 1024px. */
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  /**
   * Render each link, e.g. with your router's Link. Defaults to <a href>.
   * Spread the props you receive onto the element.
   */
  renderLink?: (props: SidebarLinkRenderProps) => React.ReactNode;
  /** Accessible name of the navigation landmark. @default "Main" */
  ariaLabel?: string;
  className?: string;
}

const CollapseIcon = ({ collapsed }: { collapsed: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18" />
    <path d={collapsed ? "m14 9 3 3-3 3" : "m16 15-3-3 3-3"} />
  </svg>
);

const defaultLink = ({ item, children, ...rest }: SidebarLinkRenderProps) => (
  <a href={item.href} {...rest}>
    {children}
  </a>
);

/**
 * Application sidebar with grouped sections.
 * - Desktop: full width, or an icon rail when collapsed (labels appear as
 *   tooltips on hover and keyboard focus).
 * - Below 1024px: an off-canvas drawer with a backdrop; Escape closes it.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  header,
  footer,
  collapsed = false,
  onCollapsedChange,
  shortcut = true,
  mobileOpen = false,
  onMobileClose,
  renderLink = defaultLink,
  ariaLabel = "Main",
  className,
}) => {
  useEffect(() => {
    if (!shortcut || !onCollapsedChange) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        onCollapsedChange(!collapsed);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcut, collapsed, onCollapsedChange]);

  useEffect(() => {
    if (!mobileOpen || !onMobileClose) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onMobileClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, onMobileClose]);

  return (
    <>
      <div
        className={clsx("pw-sidebar-backdrop", { "pw-sidebar-backdrop--open": mobileOpen })}
        onClick={onMobileClose}
        aria-hidden="true"
      />
      <aside
        className={clsx(
          "pw-sidebar",
          {
            "pw-sidebar--collapsed": collapsed,
            "pw-sidebar--mobile-open": mobileOpen,
          },
          className,
        )}
      >
        {header && <div className="pw-sidebar__header">{header}</div>}
        <nav className="pw-sidebar__nav" aria-label={ariaLabel}>
          {sections.map((section, si) => (
            <div className="pw-sidebar__section" key={section.title ?? si}>
              {section.title && <div className="pw-sidebar__section-title">{section.title}</div>}
              <ul role="list" className="pw-sidebar__list">
                {section.items.map((item) => (
                  <li key={item.id}>
                    {renderLink({
                      item,
                      className: clsx("pw-sidebar__item", {
                        "pw-sidebar__item--active": item.active,
                      }),
                      "aria-current": item.active ? "page" : undefined,
                      title: collapsed ? item.label : undefined,
                      onClick: () => {
                        item.onClick?.();
                        onMobileClose?.();
                      },
                      children: (
                        <>
                          {item.icon && (
                            <span className="pw-sidebar__icon" aria-hidden="true">
                              {item.icon}
                            </span>
                          )}
                          <span className="pw-sidebar__label">{item.label}</span>
                          {item.badge !== undefined && item.badge !== null && (
                            <span className="pw-sidebar__badge">{item.badge}</span>
                          )}
                        </>
                      ),
                    })}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        {(footer || onCollapsedChange) && (
          <div className="pw-sidebar__footer">
            {footer && <div className="pw-sidebar__footer-content">{footer}</div>}
            {onCollapsedChange && (
              <button
                type="button"
                className="pw-sidebar__collapse"
                onClick={() => onCollapsedChange(!collapsed)}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-expanded={!collapsed}
                title={`${collapsed ? "Expand" : "Collapse"} sidebar (Ctrl+B)`}
              >
                <CollapseIcon collapsed={collapsed} />
                <span className="pw-sidebar__label">Collapse</span>
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
};

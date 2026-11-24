"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { isActivePath } from "@/config/navigation";
import type { NavItem } from "@/lib/types";

type OpenState = { label: string; pathname: string } | null;

/** Desktop navigation with keyboard- and pointer-accessible dropdowns. */
export function Navbar({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<OpenState>(null);
  // Tying open state to the pathname closes the dropdown automatically after navigation.
  const openLabel = open && open.pathname === pathname ? open.label : null;
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!openLabel) return;
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(null);
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(null);
      navRef.current?.querySelector<HTMLButtonElement>(`[data-trigger="${CSS.escape(openLabel)}"]`)?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openLabel]);

  const show = (label: string) => setOpen({ label, pathname });
  const hide = () => setOpen(null);

  const focusFirstLink = (label: string) => {
    requestAnimationFrame(() => {
      navRef.current?.querySelector<HTMLAnchorElement>(`[data-menu="${CSS.escape(label)}"] a`)?.focus();
    });
  };

  return (
    <nav ref={navRef} className="desktop-nav" aria-label="Main">
      <ul className="desktop-nav__list">
        {items.map((item) => {
          const active = isActivePath(pathname, item.section ?? item.href);
          if (!item.children) {
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`desktop-nav__link${active ? " is-active" : ""}`}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          const isOpen = openLabel === item.label;
          const menuId = `menu-${item.section.slice(1)}`;
          const onPointerEnter = (e: PointerEvent) => e.pointerType === "mouse" && show(item.label);
          const onPointerLeave = (e: PointerEvent) => e.pointerType === "mouse" && hide();
          const onTriggerKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              show(item.label);
              focusFirstLink(item.label);
            }
          };
          const onMenuKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
            if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
            e.preventDefault();
            const links = Array.from(e.currentTarget.querySelectorAll("a"));
            const index = links.indexOf(document.activeElement as HTMLAnchorElement);
            const next = e.key === "ArrowDown" ? index + 1 : index - 1;
            links[(next + links.length) % links.length]?.focus();
          };

          return (
            <li
              key={item.label}
              className={`desktop-nav__item${isOpen ? " is-open" : ""}`}
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  if (isOpen) hide();
                }
              }}
            >
              <button
                type="button"
                className={`desktop-nav__link desktop-nav__trigger${active ? " is-active" : ""}`}
                aria-expanded={isOpen}
                aria-controls={menuId}
                data-trigger={item.label}
                onClick={(e) => {
                  // Mouse users already opened the menu on hover; a click should not close it.
                  const pointerType = (e.nativeEvent as globalThis.PointerEvent).pointerType;
                  if (pointerType === "mouse") show(item.label);
                  else if (isOpen) hide();
                  else show(item.label);
                }}
                onKeyDown={onTriggerKeyDown}
              >
                {item.label}
                <svg className="chevron" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
              <ul
                id={menuId}
                // Long menus (e.g. Committee) use two columns, filled top-to-bottom so arrow keys
                // and Tab follow the visual reading order.
                className={`dropdown${item.children.length > 8 ? " dropdown--columns" : ""}`}
                style={
                  item.children.length > 8
                    ? { gridTemplateRows: `repeat(${Math.ceil(item.children.length / 2)}, auto)` }
                    : undefined
                }
                data-menu={item.label}
                hidden={!isOpen}
                onKeyDown={onMenuKeyDown}
              >
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className={`dropdown__link${pathname === child.href ? " is-current" : ""}`}
                      aria-current={pathname === child.href ? "page" : undefined}
                      onClick={hide}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isActivePath } from "@/lib/navigation";
import type { NavItem } from "@/lib/types";

/** Hamburger menu with accordion sections, shown below the desktop breakpoint. */
export function MobileMenu({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  // Storing the pathname the menu was opened on closes it automatically after navigation.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const isOpen = openOn === pathname;
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenOn(null);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.classList.remove("menu-open");
    };
  }, [isOpen]);

  const close = () => setOpenOn(null);
  const toggle = () => {
    if (isOpen) return close();
    // Expand the section containing the current page by default.
    setExpanded(items.find((i) => i.children && isActivePath(pathname, i.href))?.label ?? null);
    setOpenOn(pathname);
  };

  return (
    <div className="mobile-nav">
      <button
        ref={toggleRef}
        type="button"
        className="mobile-nav__toggle"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={toggle}
      >
        <span className="mobile-nav__bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="mobile-nav__label">{isOpen ? "Close" : "Menu"}</span>
      </button>

      <nav id="mobile-menu" className="mobile-nav__panel" aria-label="Main" hidden={!isOpen}>
        <ul className="mobile-nav__list">
          {items.map((item) => {
            const active = isActivePath(pathname, item.href);
            if (!item.children) {
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`mobile-nav__link${active ? " is-active" : ""}`}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }
            const sectionOpen = expanded === item.label;
            const id = `mobile-${item.href.slice(1)}`;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  className={`mobile-nav__link mobile-nav__section${active ? " is-active" : ""}`}
                  aria-expanded={sectionOpen}
                  aria-controls={id}
                  onClick={() => setExpanded(sectionOpen ? null : item.label)}
                >
                  {item.label}
                  <svg className="chevron" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </button>
                <ul id={id} className="mobile-nav__sub" hidden={!sectionOpen}>
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={pathname === child.href ? "is-current" : undefined}
                        aria-current={pathname === child.href ? "page" : undefined}
                        onClick={close}
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
    </div>
  );
}

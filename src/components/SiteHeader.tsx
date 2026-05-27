"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AppIcon, type AppIconName } from "@/components/AppIcon";

const NAV: { href: string; label: string; icon: AppIconName }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/study-path", label: "Plan", icon: "route" },
  { href: "/exam", label: "Exam", icon: "exam" },
  { href: "/topics", label: "Topics", icon: "grid" },
  { href: "/flash", label: "Cards", icon: "cards" },
  { href: "/review", label: "Review", icon: "review" },
  { href: "/cheatsheet", label: "Cheat", icon: "cheatsheet" },
  { href: "/listen", label: "Listen", icon: "headphones" },
  { href: "/glossary", label: "Glossary", icon: "book" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/topics") return pathname.startsWith("/topics") || pathname.startsWith("/topic/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <Link href="/" className="site-brand" aria-label="Part 107 Test Bank home">
          <span className="site-brand-mark">
            <AppIcon name="plane" />
          </span>
          <span className="site-brand-copy">
            <span className="site-brand-kicker">Part 107</span>
            <span className="site-brand-name">Test Bank</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`site-nav-link${active ? " is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <AppIcon name={item.icon} />
                <span className="nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

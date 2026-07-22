"use client";
import { useState } from "react";
import Link from "next/link";
import { nav } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <div className="wrap nav">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Heroes Worker" />
          <span className="name">
            HEROES <b>WORKER</b>
          </span>
        </Link>
        <nav className={`nav-links${open ? " open" : ""}`}>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <Link href="/#contact" className="btn btn-primary">
            お見積もり
          </Link>
          <button
            className="menu-btn"
            aria-label="メニュー"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}

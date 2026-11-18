"use client";
import Link from "next/link";
import { useBag } from "@/lib/bag";
export default function Header() {
  const { count } = useBag();
  return (
    <header className="hdr"><div className="wrap">
      <Link href="/" className="logo">WearKapde</Link>
      <nav className="nav" aria-label="Main">
        <Link href="/drop">Drop 01</Link><Link href="/about">About</Link>
        <Link href="/bag">Bag{count > 0 ? ` (${count})` : ""}</Link>
      </nav>
    </div></header>
  );
}

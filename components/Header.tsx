"use client";
import Link from "next/link";
import { useBag } from "@/lib/bag";
import { Wordmark } from "./Logo";
export default function Header() {
  const { count } = useBag();
  return (
    <header className="hdr"><div className="hdr-in">
      <nav className="nav l" aria-label="Collection">
        <Link href="/drop">Collection</Link><Link className="navcat" href="/drop?type=hoodie">Hoodies</Link><Link className="navcat" href="/drop?type=tee">Tees</Link>
      </nav>
      <Link href="/" aria-label="KAPDE home" className="hdr-mark"><Wordmark /></Link>
      <nav className="nav r" aria-label="Account">
        <Link className="navcat" href="/about">House</Link><Link href="/bag">Bag ({count})</Link>
      </nav>
    </div></header>
  );
}

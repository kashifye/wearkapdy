"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type BagItem = { slug: string; colour: string; size: string; qty: number };
type Ctx = { items: BagItem[]; add: (i: BagItem) => void; remove: (k: number) => void; setQty: (k: number, q: number) => void; clear: () => void; count: number };
const BagCtx = createContext<Ctx | null>(null);
const KEY = "wk-bag-v1";

export function BagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setItems(JSON.parse(raw)); } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, ready]);

  const add = (i: BagItem) => setItems((p) => {
    const k = p.findIndex((x) => x.slug === i.slug && x.colour === i.colour && x.size === i.size);
    if (k < 0) return [...p, i];
    return p.map((x, n) => (n === k ? { ...x, qty: Math.min(10, x.qty + i.qty) } : x));
  });
  const remove = (k: number) => setItems((p) => p.filter((_, n) => n !== k));
  const setQty = (k: number, q: number) => setItems((p) => p.map((x, n) => (n === k ? { ...x, qty: Math.max(1, Math.min(10, q)) } : x)));
  const clear = () => setItems([]);
  const count = items.reduce((a, b) => a + b.qty, 0);
  return <BagCtx.Provider value={{ items, add, remove, setQty, clear, count }}>{children}</BagCtx.Provider>;
}
export const useBag = () => { const c = useContext(BagCtx); if (!c) throw new Error("BagProvider missing"); return c; };

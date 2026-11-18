import type { Metadata } from "next";
import DropGrid from "@/components/DropGrid";
export const metadata: Metadata = { title: "Drop 01 · Sardi" };
export default function Drop() {
  return <div className="wrap" style={{ paddingTop: 64 }}><h1 className="t72">Drop 01 · Sardi</h1><p className="stone t20" style={{ marginTop: 12 }}>Every piece is printed after you order.</p><DropGrid /></div>;
}

import type { Metadata } from "next";
import DropGrid from "@/components/DropGrid";
export const metadata: Metadata = { title: "Collection 01 · Sardi" };
export default function Drop() {
  return <div className="sec" style={{ paddingTop: 56 }}><div className="sec-head"><h1>Collection 01 · <i>Sardi</i></h1></div><DropGrid /></div>;
}

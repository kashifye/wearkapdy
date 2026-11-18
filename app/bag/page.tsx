import type { Metadata } from "next";
import BagClient from "@/components/BagClient";
export const metadata: Metadata = { title: "Bag" };
export default function Bag() { return <div className="wrap" style={{ paddingTop: 48 }}><h1 className="t72">Your bag</h1><BagClient /></div>; }

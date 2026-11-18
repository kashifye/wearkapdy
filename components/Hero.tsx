"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Garment from "./Garment";

export default function Hero() {
  const big = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const y = Math.min(window.scrollY, 1200);
      if (big.current) big.current.style.transform = `translate(-50%, calc(-50% + ${y * 0.18}px))`;
    }); };
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="hero" aria-label="Drop 01 Sardi">
      <div ref={big} className="big" aria-hidden="true" style={{ transform: "translate(-50%,-50%)" }}>कपड़े</div>
      <Garment className="cloth" type="hoodie" colour="black" design="wk-01-thermal-unit" label="WK-01 Thermal Unit oversized hoodie" />
      <div className="copy">
        <h1>Sardi, drop 01.</h1>
        <p>Printed only after you order. 400 GSM, made for 4°C mornings.</p>
        <Link href="/p/wk-01-thermal-unit" className="btn">Shop the hoodie</Link>
      </div>
    </section>
  );
}

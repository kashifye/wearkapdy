import Link from "next/link";
export default function Footer() {
  return (
    <footer className="ftr"><div className="wrap cols">
      <div><p className="big">कपड़े</p><p className="stone" style={{ marginTop: 8 }}>Printed only after you order. Made in India.</p></div>
      <ul><li><Link href="/drop">Drop 01</Link></li><li><Link href="/about">About</Link></li><li><Link href="/contact">Contact</Link></li></ul>
      <ul><li><Link href="/shipping">Shipping</Link></li><li><Link href="/returns">Returns</Link></li><li><Link href="/privacy">Privacy</Link></li><li><Link href="/terms">Terms</Link></li></ul>
    </div></footer>
  );
}

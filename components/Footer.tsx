import Link from "next/link";
import { Monogram } from "./Logo";
export default function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr-in">
        <div className="ftr-cols">
          <div><Monogram size={40} /><p className="mute" style={{ marginTop: 16 }}>Every piece is made to order.<br />Nothing is made until it is yours.</p></div>
          <ul><li className="h">Collection</li><li><Link href="/drop?type=hoodie">Hoodies</Link></li><li><Link href="/drop?type=sweatshirt">Sweatshirts</Link></li><li><Link href="/drop?type=tee">Tees</Link></li></ul>
          <ul><li className="h">Client service</li><li><Link href="/shipping">Shipping</Link></li><li><Link href="/returns">Returns</Link></li><li><Link href="/contact">Contact</Link></li></ul>
          <ul><li className="h">Legal</li><li><Link href="/privacy">Privacy</Link></li><li><Link href="/terms">Terms</Link></li><li><Link href="/about">The house</Link></li></ul>
        </div>
        <div className="ftr-word" aria-hidden="true">KAPDE</div>
        <div className="ftr-base"><span>© {new Date().getFullYear()} KAPDE</span><span>wearkapde.com</span></div>
      </div>
    </footer>
  );
}

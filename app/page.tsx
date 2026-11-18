import Link from "next/link";
import Garment from "@/components/Garment";
import ProductCard from "@/components/ProductCard";
import { Monogram } from "@/components/Logo";
import { products } from "@/data/products";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-art"><Garment type="hoodie" colour="black" design="" label="KAPDE oversized hoodie in black" /></div>
        <div className="hero-copy">
          <p className="over">Collection 01</p>
          <h1>Sardi</h1>
          <Link className="under" href="/drop">Discover the collection</Link>
        </div>
      </section>

      <section className="intro">
        <Monogram size={44} />
        <p>A house for the cold months. Heavyweight cotton, cut oversized, made one at a time and only once it is ordered.</p>
      </section>

      <section className="split">
        <Link href="/drop?type=hoodie" className="panel dark"><Garment type="hoodie" colour="charcoal" design="" /><span>Hoodies</span></Link>
        <Link href="/drop?type=tee" className="panel"><Garment type="tee" colour="bone" design="" /><span>Tees</span></Link>
      </section>

      <section className="sec">
        <div className="sec-head"><h2>The collection</h2><Link className="under" href="/drop">View all</Link></div>
        <div className="grid">{products.slice(0, 8).map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>

      <section className="canvas" aria-label="The KK monogram">
        <div className="canvas-copy"><h2>The KK</h2><p>Two letters, set back to back. Our signature, from the first collection on.</p></div>
      </section>

      <section className="sec made">
        <h2>Made to order</h2>
        <ol>
          <li><span>I</span><p>You choose your piece.</p></li>
          <li><span>II</span><p>It is printed for you within 3 to 5 days.</p></li>
          <li><span>III</span><p>It is shipped to your door, anywhere in India.</p></li>
        </ol>
      </section>
    </>
  );
}

import Link from "next/link";
export const metadata = { title: "Order confirmed" };
export default function Success() {
  return <div className="wrap prose"><h1 className="t72">Order confirmed.</h1><p className="t20 stone">Thank you. Your piece goes to print now and ships in 3–5 days. Payment receipt and updates will reach your email.</p><p><Link href="/drop" className="btn">Back to Drop 01</Link></p></div>;
}

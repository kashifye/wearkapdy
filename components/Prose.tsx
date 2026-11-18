export default function Prose({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="wrap prose"><h1 className="t72">{title}</h1>{children}</div>;
}

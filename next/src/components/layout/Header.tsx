import Link from "next/link";

export default function Header() {
  return (
    <header className="mx-auto max-w-5xl mb-6 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="h-9 w-9 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold shadow-sm transition group-hover:scale-105">
          R
        </div>

        <span className="text-lg font-semibold text-slate-800 tracking-tight">
          Traveling Like a Root
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex items-center gap-3">
        <Link
          href="/"
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition"
        >
          Home
        </Link>

        <Link
          href="/quotes"
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition"
        >
          Ver cotações
        </Link>
      </nav>
    </header>
  );
}

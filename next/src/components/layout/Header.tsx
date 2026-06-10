import Link from "next/link";

export default function Header() {
  return (
    <header className="mx-auto max-w-5xl mb-2 md:mb-4 flex items-center flex-col md:flex-row p-3 md:p-0 justify-center sm:justify-between">
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
      <nav className="flex items-center gap-3 mt-5 md:mt-0">
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

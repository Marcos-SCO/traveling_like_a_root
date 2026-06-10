import Link from "next/link";

export default function QuoteHeader() {
  return (
    <div className="flex items-end justify-between flex-wrap">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Cotações
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Histórico de cotações realizadas.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 mt-4 md:mt-0 max-sm:w-100 justify-center"
      >
        + Nova Cotação
      </Link>
    </div>
  );
}

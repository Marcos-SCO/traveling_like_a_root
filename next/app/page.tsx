import QuoteForm from "@/src/components/quote/QuoteForm";
import QuoteResult from "@/src/components/quote/QuoteResult";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 bg-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="flex items-center gap-2 mb-5">
          <Link href="/" className="flex items-center gap-2" title="Traveling Like a Root">
            <div className="h-9 w-9 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold">
              R
            </div>

            <span className="text-lg font-semibold text-slate-800 tracking-tight">
              Traveling Like a Root
            </span>
          </Link>
        </header>

        {/* Content */}
        <div className="space-y-6">
          {/* Form Card */}
          <section className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
            <QuoteForm />
          </section>

          {/* Result Card */}
          {/* <section className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
            <QuoteResult />
          </section> */}

        </div>
      </div>
    </main>
  );
}

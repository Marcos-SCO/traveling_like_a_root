import QuoteForm from "@/src/components/quote/QuoteForm";
import QuoteResult from "@/src/components/quote/QuoteResult";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
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
  );
}

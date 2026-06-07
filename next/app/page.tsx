import QuoteForm from "@/src/components/quote/QuoteForm";
import QuoteResult from "@/src/components/quote/QuoteResult";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6">
      {/* Content */}
      <div className="space-y-6">
        {/* <QuoteResult /> */}

        <section className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
          <QuoteForm />
        </section>
      </div>
    </div>
  );
}

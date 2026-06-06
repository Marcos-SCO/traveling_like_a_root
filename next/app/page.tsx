import QuoteForm from "@/src/components/quote/QuoteForm";
import QuoteResult from "@/src/components/quote/QuoteResult";

export default function Home() {
  return (
    <main className="flex-1 bg-slate-100">
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="mb-8 text-3xl font-bold">Traveling Like a Root</h1>

        <div className="space-y-8">
          <QuoteForm />
          <QuoteResult />
        </div>
      </div>
    </main>
  );
}

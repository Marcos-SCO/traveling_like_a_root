"use client";

import { useQuoteStore } from "@/store/quoteStore";

export default function QuoteResult() {
  const quote = useQuoteStore((state) => state.quote);
  if (!quote) return null;

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Resultado da Cotação</h2>

        <div>
          Dias cobrados: {quote.charged_days}
        </div>

        <div>
          Descontos de grupo: {quote.group_discount_percentage}%
        </div>

        <div>Total: R$ {quote.total_amount}</div>
      </div>
    </section>
  );
}

"use client";

import { useQuoteStore } from "@/store/quoteStore";

export default function QuoteResult() {
  const quote = useQuoteStore((state) => state.quote);
  if (!quote) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Resultado da Cotação</h2>

      <div>
        Dias cobrados:
        {quote.charged_days}
      </div>

      <div>
        Descontos de grupo:
        {quote.group_discount_percentage}%
      </div>

      <div>Total: R$ {quote.total_final}</div>
    </div>
  );
}

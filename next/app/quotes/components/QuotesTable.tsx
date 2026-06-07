import { QuoteListItem } from "@/types/quote";
import { displayFormatDate } from "@/src/utils/date";

const zoneStyles = {
  NACIONAL: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  AMERICAS: "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
  EUROPA: "bg-violet-100 text-violet-700 ring-1 ring-violet-200",
} as const;

interface QuotesTableProps {
  quotes: QuoteListItem[];
}

export default function QuotesTable({ quotes }: QuotesTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-100">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Destino
            </th>

            <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Dias
            </th>

            <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Criado em
            </th>

            <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Data de Início
            </th>

            <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Data Final
            </th>

            <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Subtotal
            </th>
          </tr>
        </thead>

        <tbody>
          {quotes.map((quote) => (
            <tr
              key={quote.id}
              className="border-b border-slate-100 transition-colors hover:bg-slate-50/80"
            >
              <td className="px-5 py-5 text-left">
                <span
                  className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                    zoneStyles[
                      quote.travel_zone?.toUpperCase() as keyof typeof zoneStyles
                    ] ?? "bg-slate-100 text-slate-700"
                  }`}
                >
                  {quote.travel_zone?.toUpperCase()}
                </span>
              </td>

              <td className="px-7 py-5 text-left font-medium text-slate-700">
                {quote.charged_days}
              </td>

              <td className="px-7 py-5 text-left text-slate-700">
                {displayFormatDate(quote.created_at)}
              </td>

              <td className="px-7 py-5 text-left text-slate-700">
                {displayFormatDate(quote.start_date)}
              </td>

              <td className="px-7 py-5 text-left text-slate-700">
                {displayFormatDate(quote.end_date)}
              </td>

              <td className="px-7 py-5 text-left font-semibold tabular-nums text-slate-900">
                {Number(quote.subtotal_amount).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {quotes.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-slate-500">Nenhuma cotação encontrada.</p>
        </div>
      )}
    </div>
  );
}

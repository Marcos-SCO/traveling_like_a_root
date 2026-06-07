"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getQuotes } from "@/services/quoteService";
import { QuoteListResponse } from "@/types/quote";

import { useSearchParams, useRouter } from "next/navigation";
import { TravelZoneEnum } from "@/schemas/quoteSchema";

const zoneStyles = {
  NACIONAL: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  AMERICAS: "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
  EUROPA: "bg-violet-100 text-violet-700 ring-1 ring-violet-200",
} as const;

export default function QuotesPage() {
  const [data, setData] = useState<QuoteListResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (
    filters: Record<string, string | undefined | null>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`/quotes?${params.toString()}`);
  };

  async function loadQuotes(cursor?: string, travelZone?: string) {
    try {
      setLoading(true);

      const res = await getQuotes(cursor, travelZone);

      if (res.success) {
        setData(res.data);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const cursor = searchParams.get("cursor") ?? undefined;
    const selectedZone = (searchParams.get("travel_zone"))?.toLocaleLowerCase() ?? "";

    loadQuotes(cursor, selectedZone);
  }, [searchParams]);

  if (!data) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          Carregando cotações...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-6 px-2">
      {/* Header */}
      <div className="flex items-end justify-between">
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
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800"
        >
          + Nova Cotação
        </Link>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col">
          <label className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Destino
          </label>

          <select
            value={searchParams.get("travel_zone") ?? ""}
            onChange={(e) =>
              updateFilters({
                travel_zone: e.target.value || undefined,
                cursor: undefined, 
              })
            }
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
            <option value="">Todos</option>

            {TravelZoneEnum.options.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>

        {(searchParams.get("travel_zone") || searchParams.get("cursor")) && (
          <button
            onClick={() =>
              updateFilters({
                travel_zone: undefined,
                cursor: undefined,
              })
            }
            className="mt-5 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-100">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="py-4 px-7 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Destino
              </th>

              <th className="py-4 px-7 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Dias
              </th>

              <th className="py-4 px-7 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Criado em
              </th>

              <th className="py-4 px-7 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Data de Início
              </th>

              <th className="py-4 px-7 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Data Final
              </th>

              <th className="py-4 px-7 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Subtotal
              </th>
            </tr>
          </thead>

          <tbody>
            {data.data.map((quote) => (
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
                  {new Date(quote.created_at).toLocaleDateString("pt-BR")}
                </td>

                <td className="px-7 py-5 text-left text-slate-700">
                  {new Date(quote.start_date).toLocaleDateString("pt-BR")}
                </td>

                <td className="px-7 py-5 text-left text-slate-700">
                  {new Date(quote.end_date).toLocaleDateString("pt-BR")}
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

        {data.data.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-slate-500">Nenhuma cotação encontrada.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <button
          disabled={loading || !searchParams.get("cursor")}
          onClick={() => updateFilters({ cursor: undefined })}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          « Primeira
        </button>

        <button
          disabled={!data.prev_cursor || loading}
          onClick={() => updateFilters({ cursor: data.prev_cursor })}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          ← Anterior
        </button>

        <button
          disabled={!data.next_cursor || loading}
          onClick={() => updateFilters({ cursor: data.next_cursor })}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          Próximo →
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getQuotes } from "@/services/quoteService";
import { QuoteListResponse } from "@/types/quote";

import { useSearchParams, useRouter } from "next/navigation";

import QuotesFilters from "./components/QuotesFilters";
import QuotesTable from "./components/QuotesTable";
import QuotesPagination from "./components/QuotesPagination";
import QuoteHeader from "./components/QuoteHeader";

export default function QuotesClient() {
  const [data, setData] = useState<QuoteListResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (
    filters: Record<string, string | undefined | null>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    router.push(`/quotes?${params.toString()}`);
  };

  async function loadQuotes(
    cursor?: string,
    travelZone?: string,
    startDate?: string,
    endDate?: string,
  ) {
    try {
      setLoading(true);

      const res = await getQuotes(cursor, travelZone, startDate, endDate);

      if (res.success) setData(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuotes(
      searchParams.get("cursor") ?? undefined,
      searchParams.get("travel_zone")?.toLowerCase(),
      searchParams.get("start_date") ?? undefined,
      searchParams.get("end_date") ?? undefined,
    );
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
      <QuoteHeader />

      <QuotesFilters
        searchParams={searchParams}
        updateFilters={updateFilters}
      />

      <QuotesTable quotes={data.data} />

      <QuotesPagination
        data={data}
        loading={loading}
        updateFilters={updateFilters}
        searchParams={searchParams}
      />
    </div>
  );
}

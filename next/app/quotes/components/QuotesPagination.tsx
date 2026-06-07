import { QuoteListResponse } from "@/types/quote";
import { ReadonlyURLSearchParams } from "next/navigation";

interface QuotesPaginationProps {
  data: QuoteListResponse;
  loading: boolean;
  searchParams: ReadonlyURLSearchParams;
  updateFilters: (filters: Record<string, string | undefined | null>) => void;
}

export default function QuotesPagination({
  data,
  loading,
  searchParams,
  updateFilters,
}: QuotesPaginationProps) {
  return (
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
  );
}

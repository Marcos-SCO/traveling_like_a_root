import { TravelZoneEnum } from "@/schemas/quoteSchema";
import { ReadonlyURLSearchParams } from "next/navigation";

interface QuotesFiltersProps {
  searchParams: ReadonlyURLSearchParams;
  updateFilters: (filters: Record<string, string | undefined | null>) => void;
}

export default function QuotesFilters({
  searchParams,
  updateFilters,
}: QuotesFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
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
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm transition hover:border-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer"
        >
          <option value="">Todos</option>

          {TravelZoneEnum.options.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>

      {/* Start Date */}
      <div className="flex flex-col">
        <label className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Data Inicial
        </label>

        <input
          type="date"
          value={searchParams.get("start_date") ?? ""}
          onChange={(e) =>
            updateFilters({
              start_date: e.target.value || undefined,
              cursor: undefined,
            })
          }
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm transition hover:border-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      {/* End Date */}
      <div className="flex flex-col">
        <label className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Data Final
        </label>

        <input
          type="date"
          value={searchParams.get("end_date") ?? ""}
          onChange={(e) =>
            updateFilters({
              end_date: e.target.value || undefined,
              cursor: undefined,
            })
          }
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm transition hover:border-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      {/* Clear */}
      <div className="flex items-end">
        <button
          onClick={() =>
            updateFilters({
              travel_zone: undefined,
              start_date: undefined,
              end_date: undefined,
              cursor: undefined,
            })
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer"
        >
          Limpar filtros
        </button>
      </div>
    </div>
  );
}

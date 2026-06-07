import { UseFormRegister } from "react-hook-form";
import { QuoteRequest } from "@/types/quote";

interface TravelInformationFieldsProps {
  register: UseFormRegister<QuoteRequest>;
}

export default function TravelInformationFields({
  register,
}: TravelInformationFieldsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="mb-6 text-lg font-semibold text-slate-900">Informações da Viagem</p>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Destino
          </label>

          <select
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            {...register("travel_zone")}
          >
            <option value="NACIONAL">Nacional</option>
            <option value="AMERICAS">Américas</option>
            <option value="EUROPA">Europa</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Data Inicial</label>

          <input
            type="date"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            {...register("start_date")}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Data Final</label>

          <input
            type="date"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            {...register("end_date")}
          />
        </div>
      </div>
    </div>
  );
}

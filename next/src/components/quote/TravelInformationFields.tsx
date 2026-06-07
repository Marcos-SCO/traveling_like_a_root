import { UseFormRegister, FieldErrors } from "react-hook-form";
import { QuoteFormValues } from "@/schemas/quoteSchema";

interface TravelInformationFieldsProps {
  register: UseFormRegister<QuoteFormValues>;
  errors: FieldErrors<QuoteFormValues>;
}

function inputClass(hasError?: boolean) {
  return `w-full rounded-lg border px-4 py-3 transition focus:outline-none
    ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    }`;
}

function errorText(message?: string) {
  if (!message) return null;

  return <p className="mt-1 text-sm text-red-600">{message}</p>;
}

export default function TravelInformationFields({
  register,
  errors,
}: TravelInformationFieldsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="mb-6 text-lg font-semibold text-slate-900">
        Informações da Viagem
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {/* DESTINO */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Destino
          </label>

          <select
            className={inputClass(!!errors.travel_zone)}
            {...register("travel_zone")}
          >
            <option value="NACIONAL">Nacional</option>
            <option value="AMERICAS">Américas</option>
            <option value="EUROPA">Europa</option>
          </select>

          {errorText(errors.travel_zone?.message as string)}
        </div>

        {/* DATA INICIAL */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Data Inicial
          </label>

          <input
            type="date"
            className={inputClass(!!errors.start_date)}
            {...register("start_date")}
          />

          {errorText(errors.start_date?.message as string)}
        </div>

        {/* DATA FINAL */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Data Final
          </label>

          <input
            type="date"
            className={inputClass(!!errors.end_date)}
            {...register("end_date")}
          />

          {errorText(errors.end_date?.message as string)}
        </div>
      </div>
    </div>
  );
}

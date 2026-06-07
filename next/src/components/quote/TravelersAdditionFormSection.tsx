import {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

import TravelerForm from "../traveler/TravelerForm";
import { QuoteRequest } from "@/types/quote";

interface TravelersAdditionFormSectionProps {
  fields: Array<{ id: string }>;
  append: UseFieldArrayAppend<QuoteRequest, "travelers">;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<QuoteRequest>;
  errors: FieldErrors<QuoteRequest>;
}

export function TravelersAdditionFormSection({
  fields,
  append,
  remove,
  register,
  errors,
}: TravelersAdditionFormSectionProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xl">👥</span>

            <h2 className="text-xl font-bold text-slate-900">Viajantes</h2>

            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
              {fields.length}
            </span>
          </div>

          <p className="text-sm text-slate-500">
            Adicione todos os participantes desta viagem.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            append({
              name: "",
              birth_date: "",
              additionals: [],
            })
          }
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md cursor-pointer"
        >
          <span className="text-lg">+</span>
          Novo Viajante
        </button>
      </div>

      {/* Travelers list */}
      <div className="space-y-5">
        {fields.map((field, index) => (
          <TravelerForm
            key={field.id}
            index={index}
            remove={() => remove(index)}
            register={register}
            errors={errors?.travelers?.[index]} // 👈 IMPORTANT
          />
        ))}
      </div>
    </div>
  );
}

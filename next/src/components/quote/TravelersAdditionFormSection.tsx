import {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";

import TravelerForm from "../traveler/TravelerForm";
import { QuoteRequest } from "@/types/quote";

interface TravelersAdditionFormSectionProps {
  fields: Array<{ id: string }>;
  append: UseFieldArrayAppend<QuoteRequest, "travelers">;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<QuoteRequest>;
}

export function TravelersAdditionFormSection({
  fields,
  append,
  remove,
  register,
}: TravelersAdditionFormSectionProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xl">👥</span>

            <h2 className="text-xl font-bold text-slate-900">Viajantes</h2>
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

      <div className="space-y-5">
        {fields.map((field, index) => (
          <TravelerForm
            key={field.id}
            index={index}
            remove={() => remove(index)}
            register={register}
          />
        ))}
      </div>
    </div>
  );
}

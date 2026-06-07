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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Viajantes</h2>

          <p className="text-sm text-slate-500">Adicione todos os viajantes</p>
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
          className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + Adicionar
        </button>
      </div>

      <div className="space-y-4">
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

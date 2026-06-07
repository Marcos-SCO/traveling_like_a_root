import { QuoteRequest } from "@/types/quote";
import { UseFormRegister } from "react-hook-form";
import Button from "../ui/button";

interface TravelerFormProps {
  index: number;
  remove: () => void;
  register: UseFormRegister<QuoteRequest>;
}

export default function TravelerForm({
  index,
  remove,
  register,
}: TravelerFormProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {index + 1}
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Viajante #{index + 1}
            </h3>

            <p className="text-sm text-slate-500">
              Informações do participante
            </p>
          </div>
        </div>

        {index > 0 && (
          <button
            type="button"
            onClick={remove}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-red-200 transition bg-red-500 hover:bg-red-600 text-white cursor-pointer font-bold"
            aria-label="Remover viajante">✕</button>
        )}
      </div>

      {/* Personal Information */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 cursor-pointer" htmlFor={`traveler_name-${index}`}>
            Nome Completo
          </label>

          <input id={`traveler_name-${index}`}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 transition focus:border-blue-500 focus:outline-none"
            placeholder="Ex: Ana Silva"
            {...register(`travelers.${index}.name`)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 cursor-pointer" htmlFor={`traveler_birthdate-${index}`}>
            Data de Nascimento
          </label>

          <input id={`traveler_birthdate-${index}`}
            type="date"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 transition focus:border-blue-500 focus:outline-none"
            {...register(`travelers.${index}.birth_date`)}
          />
        </div>
      </div>

      {/* Additional Coverages */}
      <div className="mt-6 border-t border-slate-200 pt-6">
        <h4 className="mb-4 font-semibold text-slate-900">
          Coberturas Adicionais
        </h4>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300">
            <input
              type="checkbox"
              value="BAGAGEM"
              {...register(`travelers.${index}.additionals`)}
            />

            <div>
              <p className="font-medium text-slate-900">🧳 Bagagem</p>

              <p className="text-sm text-slate-500">
                Proteção para extravio ou danos.
              </p>
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300">
            <input
              type="checkbox"
              value="ESPORTES_AVENTURA"
              {...register(`travelers.${index}.additionals`)}
            />

            <div>
              <p className="font-medium text-slate-900">
                🏔️ Esportes de Aventura
              </p>

              <p className="text-sm text-slate-500">
                Cobertura para atividades radicais.
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

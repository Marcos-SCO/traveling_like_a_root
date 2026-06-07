"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { quoteSchema } from "@/schemas/quoteSchema";
import { QuoteRequest } from "@/types/quote";
import { zodResolver } from "@hookform/resolvers/zod";
import TravelerForm from "../traveler/TravelerForm";
import { useQuote } from "@/hooks/useQuote";

export default function QuoteForm() {
  const form = useForm<QuoteRequest>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      travel_zone: "NACIONAL",
      start_date: "",
      end_date: "",
      travelers: [
        {
          name: "",
          birth_date: "",
          additionals: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "travelers",
  });

  const { submitQuote } = useQuote();

  const onSubmit = async (data: QuoteRequest) => {
    console.log(data);
    await submitQuote(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-10 space-y-3">
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          Seguro Viagem
        </span>

        <h3 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Inicie sua cotação de viagem
        </h3>

        <p className="max-w-2xl text-lg text-slate-600">
          Informe seu destino, período da viagem e viajantes para calcular o
          valor do seguro em poucos segundos.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Travel Information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-slate-900">
            Informações da Viagem
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Destino
              </label>

              <select
                className="w-full rounded-lg borderborder-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                {...form.register("travel_zone")}
              >
                <option value="NACIONAL">Nacional</option>

                <option value="AMERICAS">Américas</option>

                <option value="EUROPA">Europa</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Data Inicial
              </label>

              <input
                type="date"
                className="w-full rounded-lg border border-slate-300 px-4py-3 focus:border-blue-500 focus:outline-none"
                {...form.register("start_date")}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Data Final
              </label>

              <input
                type="date"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                {...form.register("end_date")}
              />
            </div>
          </div>
        </div>

        {/* Travelers */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Viajantes</h2>

              <p className="text-sm text-slate-500">
                Adicione todos os viajantes
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
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 cursor-pointer"
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
                register={form.register}
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Calcular Cotação
          </button>
        </div>
      </form>
    </div>
  );
}

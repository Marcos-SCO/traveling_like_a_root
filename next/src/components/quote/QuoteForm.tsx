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

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Travel Zone */}
        <select {...form.register("travel_zone")}>
          <option value="NACIONAL">Nacional</option>
          <option value="AMERICAS">Americas</option>
          <option value="EUROPA">Europa</option>
        </select>

        {/* Start Date */}
        <input type="date" {...form.register("start_date")} />

        {/* End Date */}
        <input type="date" {...form.register("end_date")} />

        {/* Travelers */}
        {fields.map((field, index) => (
          <TravelerForm
            key={field.id}
            index={index}
            remove={() => remove(index)}
            register={form.register}
          />
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              name: "",
              birth_date: "",
              additionals: [],
            })
          }
        >
          Adicionar Viajante
        </button>

        <button type="submit">Calcular Quotação</button>
      </form>
    </div>
  );
}

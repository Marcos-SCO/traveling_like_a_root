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
      <h1 className="text-3xl font-bold mb-6">Cotação de viajem</h1>

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

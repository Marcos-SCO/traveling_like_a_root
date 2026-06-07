"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { quoteSchema } from "@/schemas/quoteSchema";
import { QuoteRequest } from "@/types/quote";
import { zodResolver } from "@hookform/resolvers/zod";
import TravelerForm from "../traveler/TravelerForm";
import { useQuote } from "@/hooks/useQuote";
import TravelInformationFields from "./TravelInformationFields";
import {
  TravelersAdditionFormSection,
  TravelersFormSection,
} from "./TravelersAdditionFormSection";

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
          Assegure agora
        </span>

        <h3 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Sua cotação de viagem
        </h3>

        <p className="max-w-2xl text-lg text-slate-600">
          Informe seu destino, período da viagem e viajantes para calcular o
          valor do seguro em poucos segundos.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TravelInformationFields register={form.register} />

        <TravelersAdditionFormSection
          fields={fields}
          append={append}
          remove={remove}
          register={form.register}
        />

        <div>
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md cursor-pointer"
          >
            Calcular Cotação
          </button>
        </div>
      </form>
    </div>
  );
}

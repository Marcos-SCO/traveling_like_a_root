"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { quoteSchema } from "@/schemas/quoteSchema";
import { QuoteRequest } from "@/types/quote";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQuote } from "@/hooks/useQuote";
import TravelInformationFields from "./TravelInformationFields";
import { TravelersAdditionFormSection } from "./TravelersAdditionFormSection";

export default function QuoteForm() {
  const form = useForm<QuoteRequest>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched", // 👈 important for UX validation
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

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "travelers",
  });

  const { submitQuote } = useQuote();

  const onSubmit = async (data: QuoteRequest) => {
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <TravelInformationFields register={register} errors={errors} />

        <TravelersAdditionFormSection
          fields={fields}
          append={append}
          remove={remove}
          register={register}
          errors={errors}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="rounded-xl bg-gray-600 px-6 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-gray-700 hover:shadow-md  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Calculando..." : "Calcular Cotação"}
          </button>
        </div>
      </form>
    </div>
  );
}

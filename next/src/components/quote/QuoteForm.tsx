import { useForm, useFieldArray } from "react-hook-form";
import { quoteSchema } from "@/schemas/quoteSchema";
import { QuoteRequest } from "@/types/quote";
import { zodResolver } from "@hookform/resolvers/zod";
import TravelerForm from "../traveler/TravelerForm";

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

  const onSubmit = (data: QuoteRequest) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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
  );
}

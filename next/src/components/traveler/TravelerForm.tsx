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
    <div className="border rounded-lg p-4 space-y-4">
      <h3 className="font-semibold">Traveler #{index + 1}</h3>

      <div>
        <label>Nome</label>

        <input
          className="w-full border rounded px-3 py-2"
          {...register(`travelers.${index}.name`)}
        />
      </div>

      <div>
        <label>Data de nascimento</label>

        <input
          type="date"
          className="w-full border rounded px-3 py-2"
          {...register(`travelers.${index}.birth_date`)}
        />
      </div>

      <div className="space-y-2">
        <label className="flex gap-2">
          <input
            type="checkbox"
            value="BAGAGEM"
            {...register(`travelers.${index}.additionals`)}
          />
          Bagagem
        </label>

        <label className="flex gap-2">
          <input
            type="checkbox"
            value="ESPORTES_AVENTURA"
            {...register(`travelers.${index}.additionals`)}
          />
          Esportes de Aventura
        </label>
      </div>

      <Button type="button" onClick={remove} className="text-red-500">
        Remover Viajante
      </Button>
    </div>
  );
}

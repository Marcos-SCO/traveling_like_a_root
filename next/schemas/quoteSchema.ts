import { z } from "zod";

export const quoteSchema = z.object({
    travel_zone: z
        .string()
        .min(1, "Destino é obrigatório"),

    start_date: z
        .string()
        .min(1, "Data inicial é obrigatória"),

    end_date: z
        .string()
        .min(1, "Data final é obrigatória"),

    travelers: z.array(
        z.object({
            name: z
                .string()
                .min(2, "Nome deve ter pelo menos 2 caracteres"),

            birth_date: z
                .string()
                .min(1, "Data de nascimento é obrigatória"),

            additionals: z.array(z.string()),
        })
    ),
});
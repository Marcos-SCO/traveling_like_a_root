import { z } from "zod";

export const TravelZoneEnum = z.enum(["NACIONAL", "AMERICAS", "EUROPA"]);

export const quoteSchema = z.object({
    travel_zone: TravelZoneEnum,
    start_date: z.string().min(1, "Data inicial é obrigatória"),
    end_date: z.string().min(1, "Data final é obrigatória"),
    travelers: z.array(
        z.object({
            name: z.string().min(1, "Nome é obrigatório"),
            birth_date: z.string().min(1, "Data de nascimento é obrigatória"),
            additionals: z.array(z.string()),
        })
    ),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
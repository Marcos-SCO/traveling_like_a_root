import { z } from 'zod';

const travelersSchema = z.object({
    name: z.string().min(2),
    birth_date: z.string(),
    additionals: z.array(z.string()),
});

export const quoteSchema = z.object({
    travel_zone: z.enum([
        'NACIONAL',
        'AMERICAS',
        'EUROPA',
    ]),
    start_date: z.string(),
    end_date: z.string(),
    travelers: z.array(travelersSchema).min(1),
});
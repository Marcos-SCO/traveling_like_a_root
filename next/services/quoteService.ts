import { api } from "@/lib/axios";
import { QuoteListResponse, QuoteResponse } from "@/types/quote";
import { QuoteFormValues } from "@/schemas/quoteSchema";

type QuoteServiceResult =
    | { success: true; data: QuoteResponse }
    | { success: false; error: string; status?: number };

export async function createQuote(
    payload: QuoteFormValues
): Promise<QuoteServiceResult> {
    try {
        const { data } = await api.post("/quote", payload);

        return {
            success: true,
            data,
        };

    } catch (error: any) {

        if (error?.response) {
            return {
                success: false,
                error: error.response.data?.message || "Erro de validação na cotação",
                status: error.response.status,
            };
        }

        return {
            success: false,
            error: "Erro inesperado ao criar cotação",
        };
    }
}

export async function getQuotes(cursor?: string, travelZone?: string) {
    try {
        const params = new URLSearchParams();

        if (cursor) params.set("cursor", cursor);
        if (travelZone) params.set("travel_zone", travelZone);

        const response = await api.get(`/quotes?${params.toString()}`);

        return {
            success: true,
            data: response.data,
        } as const;

    } catch (error: any) {

        if (error?.response) {
            return {
                success: false,
                error:
                    error.response.data?.message || "Erro ao buscar cotações",
                status: error.response.status,
            } as const;
        }

        return {
            success: false,
            error: "Erro inesperado ao buscar cotações",
        } as const;
    }
}
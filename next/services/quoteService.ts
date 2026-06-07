import { api } from "@/lib/axios";
import { QuoteResponse } from "@/types/quote";
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
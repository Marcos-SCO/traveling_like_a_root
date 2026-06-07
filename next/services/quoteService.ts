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

export async function getQuote(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/quote/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch quote");
  }

  return response.json();
}

export async function getQuotes(cursor?: string, travelZone?: string, startDate?: string, endDate?: string) {
    try {
        const params = new URLSearchParams();

        if (cursor) params.set("cursor", cursor);
        if (travelZone) params.set("travel_zone", travelZone);
        if (startDate) params.set("start_date", startDate);
        if (endDate) params.set("end_date", endDate);

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
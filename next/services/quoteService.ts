import { api } from "@/lib/axios";
import { QuoteRequest, QuoteResponse } from "@/types/quote";

type QuoteServiceResult =
  | { success: true; data: QuoteResponse }
  | { success: false; error: string };

export async function createQuote(
  payload: QuoteRequest
): Promise<QuoteServiceResult> {
  try {
    const { data } = await api.post("/quote", payload);

    console.log("Quote response:", data);

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    console.error("Error creating quote:", error);

    return {
      success: false,
      error:
        error?.response?.data?.message ||
        "Erro inesperado ao criar cotação",
    };
  }
}
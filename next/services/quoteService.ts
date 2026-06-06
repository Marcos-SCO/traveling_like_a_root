import { api } from "@/lib/axios";
import { QuoteRequest, QuoteResponse, } from "@/types/quote";

export async function createQuote(payload: QuoteRequest): Promise<QuoteResponse> {
    const { data } = await api.post("/quotes", payload);

    return data;
}
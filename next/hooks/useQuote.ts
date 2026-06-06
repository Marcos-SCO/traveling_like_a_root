import { createQuote } from "@/services/quoteService";
import { useQuoteStore } from "@/store/quoteStore";
import { QuoteRequest } from "@/types/quote";

export function useQuote() {
    const { setQuote, setLoading } = useQuoteStore();

    const submitQuote = async (payload: QuoteRequest) => {
        try {
            setLoading(true);

            const response = await createQuote(payload);

            setQuote(response);
        } finally {
            setLoading(false);
        }
    }

    return { submitQuote }
}
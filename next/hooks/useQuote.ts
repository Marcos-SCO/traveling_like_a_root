import toast from "react-hot-toast";
import { createQuote } from "@/services/quoteService";
import { useQuoteStore } from "@/store/quoteStore";

import { QuoteFormValues } from "@/schemas/quoteSchema";

export function useQuote() {
    const { setQuote, setLoading } = useQuoteStore();

    const submitQuote = async (payload: QuoteFormValues) => {
        try {
            setLoading(true);

            const result = await createQuote(payload);

            if (!(result.success)) {
                toast.error(result.error);
                return;
            }
            
            // setQuote(result.data);
            toast.success("Cotação gerada com sucesso!");
        } finally {
            setLoading(false);
        }
    };

    return { submitQuote };
}
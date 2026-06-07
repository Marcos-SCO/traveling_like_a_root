import toast from "react-hot-toast";
import { createQuote } from "@/services/quoteService";
import { useQuoteStore } from "@/store/quoteStore";

import { QuoteFormValues } from "@/schemas/quoteSchema";
import { success } from "zod";

import { useRouter } from "next/navigation";

export function useQuote() {
    const router = useRouter();
    const { setQuote, setLoading } = useQuoteStore();

    const submitQuote = async (payload: QuoteFormValues, reset?: () => void) => {
        try {
            setLoading(true);

            const result = await createQuote(payload);

            if (!(result.success)) {
                toast.error(result.error);
                return;
            }

            // setQuote(result.data);
            
            reset?.();
            
            toast.success("Cotação gerada com sucesso!");
            setTimeout(() => {
                router.push("/quotes");
            }, 1000);

            // router.push(`/quotes/${result.id}`);
        } finally {
            setLoading(false);
        }
    };

    return { submitQuote };
}
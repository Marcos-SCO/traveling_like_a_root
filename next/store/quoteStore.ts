import { QuoteResponse } from '@/types/quote';
import { create } from 'zustand';

interface QuoteStore {
    quote: QuoteResponse | null,
    loading: boolean,

    setQuote: (
        quote: QuoteResponse | null
    ) => void;

    setLoading: (
        loading: boolean
    ) => void;
}

export const useQuoteStore =
    create<QuoteStore>((set) => ({
        quote: null,
        loading: false,

        setQuote: (quote) => set({ quote }),

        setLoading: (loading) => set({ loading }),
    }));
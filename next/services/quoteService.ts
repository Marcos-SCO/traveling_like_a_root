import { api } from '@/lib/axios';

export async function createQuote(payload) {
    const { data } = await api.post('/quotes', payload);

    return data;
}
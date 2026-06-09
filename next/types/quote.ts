export interface TravelerRequest {
    name: string;
    birth_date: string;
    additionals: string[];
}

export interface QuoteTraveler {
    name: string;
    age: number;
    subtotal: number;
    applied_additionals: string[];
}

export interface QuoteResponse {
    quote_id: number,
    charged_days: number;
    travelers: QuoteTraveler[];
    warnings: string[];
    group_discount_percentage: number;
    total_amount: number;
}

export interface QuoteListItem {
  id: number;
  travel_zone: string;
  created_at: string;
  start_date: string;
  end_date: string;
  subtotal_amount: number;
  charged_days: number;
}

export interface QuoteListResponse {
  data: QuoteListItem[];
  next_cursor: string | null;
  prev_cursor: string | null;
  per_page: number;
}
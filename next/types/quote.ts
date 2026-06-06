export type Destination =
  | "NACIONAL"
  | "AMERICAS"
  | "EUROPA";

export interface TravelerRequest {
  name: string;
  birth_date: string;
  additionals: string[];
}

export interface QuoteRequest {
  travel_zone: Destination;
  start_date: string;
  end_date: string;
  travelers: TravelerRequest[];
}

export interface QuoteTraveler {
  name: string;
  age: number;
  subtotal: number;
  applied_additionals: string[];
}

export interface QuoteResponse {
  charged_days: number;
  travelers: QuoteTraveler[];
  warnings: string[];
  group_discount_percentage: number;
  total_final: number;
}
export interface Additional {
    coverage_code: string;
    amount: number;
}

export interface Traveler {
    id: number;
    name: string;
    birth_date: string;
    subtotal_amount: number;
    additionals: Additional[];
}

export interface Quote {
    id: number;
    travel_zone: string;
    start_date: string;
    end_date: string;
    charged_days: number;
    total_amount: number;
    travelers: Traveler[];
}
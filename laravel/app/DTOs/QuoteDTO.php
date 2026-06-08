<?php

namespace App\DTOs;

use App\Http\Requests\QuoteRequest;

class QuoteDTO
{
    public function __construct(
        public readonly string $travelZone,
        public readonly string $startDate,
        public readonly string $endDate,
        /** @var TravelerDTO[] */
        public readonly array $travelers,
    ) {}

    public static function fromRequest(QuoteRequest $request): self
    {
        $data = $request->validated();

        return new self(
            travelZone: $data['travel_zone'],
            startDate: $data['start_date'],
            endDate: $data['end_date'],
            travelers: array_map(
                fn (array $traveler) => TravelerDTO::fromArray($traveler),
                $data['travelers']
            ),
        );
    }
}
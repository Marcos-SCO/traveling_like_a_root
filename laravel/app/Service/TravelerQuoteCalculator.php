<?php

namespace App\Service;

use App\Enums\TravelZone;

class TravelerQuoteCalculator
{
    public function __construct(private QuoteService $quoteService) {}

    public function travelersCost(array $travelers, TravelZone $travelZone, \DateTimeInterface $startDate, int $chargedDays): array
    {
        return array_map(
            fn($traveler) => $this->quoteService->calculateTravelerIndividualCost(
                $traveler,
                $travelZone->dailyRate(),
                $startDate,
                $chargedDays
            ),
            $travelers
        );
    }

    public function totalGroupCost(array $travelersCost): int
    {
        return array_sum(array_map(fn($travelerCost) => $travelerCost['subtotal'], $travelersCost));
    }

    public function travelersFormattedData(array $travelersCost): array
    {
        return array_map(function ($traveler) {
            return [
                'name' => $traveler['name'],
                'age' =>  $traveler['age'],
                'subtotal' => round($traveler['subtotal'], 2),
                'applied_additionals' => $traveler['applied_additionals'],
            ];
        }, $travelersCost);
    }

    public function warningMessages(array $travelersCost): array
    {
        $filteredWarnings = array_filter(
            array_map(function ($travelerCost) {
                return $travelerCost['warnings'] ?? null;
            }, $travelersCost)
        );

        return !empty($filteredWarnings)
            ? array_merge(...array_map('array_values', $filteredWarnings))
            : [];
    }
}

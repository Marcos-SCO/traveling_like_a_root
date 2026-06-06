<?php

namespace App\Service;

use Carbon\Carbon;
use App\Enums\TravelZone;
use App\Support\TravelerRateCalculator;

use App\Enums\AdditionalCoverage;
use App\Support\AdditionalsRate;

use App\Support\AdditionalCoverageRules;

class TravelerQuoteCalculator
{
    public function __construct() {}

    public function calculateTravelerIndividualCost(array $travelerData, int $travelZoneDailyRate, \DateTimeInterface $tripStartDate, int $chargedDays): array
    {
        $tripStartDate = Carbon::parse($tripStartDate);
        $birthDate = Carbon::parse($travelerData['birth_date']);
        $travelerAge = (int) round($birthDate->diffInYears($tripStartDate));

        $ageMultiplier = TravelerRateCalculator::ageMultiplier($birthDate, $tripStartDate);

        $base = $travelZoneDailyRate * $chargedDays;
        $subTotal = $base * $ageMultiplier;

        $additionalItemsArray = $travelerData['additionals'] ?? [];
        $warnings = [];
        $appliedAdditionals = [];

        $travelerName = $travelerData['name'];

        foreach ($additionalItemsArray as $additionalIdentifier) {

            $isAValidAdditionalIdentifier = AdditionalCoverage::hasValue(mb_strtolower($additionalIdentifier));

            if (!$isAValidAdditionalIdentifier) continue;

            $adventureSportValidation = AdditionalCoverageRules::adventureSportsWarnings(
                $additionalIdentifier,
                $travelerAge,
                $travelerName
            );

            if (!$adventureSportValidation['can_apply']) {
                $warnings[] = $adventureSportValidation['warning'];
                continue;
            }

            $subTotal += AdditionalsRate::cost($additionalIdentifier, $subTotal, $chargedDays);

            $appliedAdditionals[] = $additionalIdentifier;
        }

        return [
            'name' => $travelerName,
            'age' => $travelerAge,
            'subtotal' => $subTotal,
            'applied_additionals' => $appliedAdditionals,
            'warnings' => $warnings
        ];
    }

    public function travelersCost(array $travelers, TravelZone $travelZone, \DateTimeInterface $startDate, int $chargedDays): array
    {
        return array_map(
            fn($traveler) => $this->calculateTravelerIndividualCost(
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

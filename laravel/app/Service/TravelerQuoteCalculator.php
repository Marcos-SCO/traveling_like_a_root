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

        $ageAtTrip = (int) round($birthDate->diffInYears($tripStartDate));

        $ageMultiplier = TravelerRateCalculator::ageMultiplier($birthDate, $tripStartDate);

        $baseAmount = $travelZoneDailyRate * $chargedDays;
        $subTotal = $baseAmount * $ageMultiplier;

        $appliedAdditionalsAmount = 0;

        $additionalItemsArray = $travelerData['additionals'] ?? [];
        $warnings = [];
        $appliedAdditionals = [];


        $travelerName = $travelerData['name'];

        foreach ($additionalItemsArray as $additionalIdentifier) {

            $additionalIdentifier = mb_strtolower($additionalIdentifier);

            $isAValidAdditionalIdentifier = AdditionalCoverage::hasValue($additionalIdentifier);

            if (!$isAValidAdditionalIdentifier) continue;

            $adventureSportValidation = AdditionalCoverageRules::adventureSportsWarnings(
                $additionalIdentifier,
                $ageAtTrip,
                $travelerName
            );

            if (!$adventureSportValidation['can_apply']) {
                $warnings[] = $adventureSportValidation['warning'];
                continue;
            }

            $additionalAmount = AdditionalsRate::cost($additionalIdentifier, $subTotal, $chargedDays);

            $appliedAdditionalsAmount += $additionalAmount;

            $appliedAdditionals[] = [
                'coverage_code' => $additionalIdentifier,
                'amount' => $additionalAmount,
            ];
        }

        $subTotal += $appliedAdditionalsAmount;

        return [
            'name' => $travelerName,
            'birth_date' => $travelerData['birth_date'],
            'age_at_trip' => $ageAtTrip,
            'age_multiplier' => $ageMultiplier,
            'base_amount' => $baseAmount,
            'subtotal' => $subTotal,
            'additionals_amount' => $appliedAdditionalsAmount,
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
                'age' =>  $traveler['age_at_trip'],
                'subtotal' =>  $traveler['subtotal'],
                'applied_additionals' => array_map(fn($additional) => mb_strtoupper($additional['coverage_code']), $traveler['applied_additionals']),
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

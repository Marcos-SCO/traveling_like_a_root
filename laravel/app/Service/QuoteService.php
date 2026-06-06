<?php

namespace App\Service;

use Carbon\Carbon;
use App\Support\TravelerRateCalculator;

use App\Enums\AdditionalCoverage;
use App\Enums\TravelZone;
use App\Support\AdditionalsRate;

use App\Support\AdditionalCoverageRules;

class QuoteService
{
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

        foreach ($additionalItemsArray as $additionalIdentifier) {

            $isAValidAdditionalIdentifier = AdditionalCoverage::hasValue(mb_strtolower($additionalIdentifier));

            if (!$isAValidAdditionalIdentifier) continue;

            $adventureSportValidation = AdditionalCoverageRules::adventureSportsWarnings(
                $additionalIdentifier,
                $travelerAge,
                $travelerData
            );

            if (!$adventureSportValidation['can_apply']) {
                $warnings[] = $adventureSportValidation['warning'];
                continue;
            }

            $subTotal += AdditionalsRate::cost($additionalIdentifier, $subTotal, $chargedDays);

            $appliedAdditionals[] = $additionalIdentifier;
        }

        return [
            'name' => $travelerData['name'],
            'age' => $travelerAge,
            'subtotal' => $subTotal,
            'applied_additionals' => $appliedAdditionals,
            'warnings' => $warnings
        ];
    }
}

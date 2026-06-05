<?php

namespace App\Support;

use App\Enums\AdditionalCoverage;

class AdditionalCoverageRules
{
    public static function adventureSportsWarnings(string $additionalIdentifier, int $travelerAge, array $travelerData): array
    {
        $addVentureSportEnumValue = mb_strtoupper(AdditionalCoverage::ADVENTURE_SPORTS->value);

        $isAdditionalAdventureSports = mb_strtoupper($additionalIdentifier) === $addVentureSportEnumValue;

        if ($isAdditionalAdventureSports && ($travelerAge < 18 || $travelerAge > 64)) {
            return [
                'can_apply' => false,
                'warning' =>
                "{$addVentureSportEnumValue} não aplicada para {$travelerData['name']}: fora da faixa etária permitida (18-64)."
            ];
        }

        return [
            'can_apply' => true,
            'warning' => null,
        ];
    }
}
<?php

namespace App\Support;

use Carbon\CarbonInterface;
use App\Enums\AdditionalCoverage;

class AdditionalsRate
{
    public static function number(string $additionalIdentifier): float
    {
        $additionalIdentifier = strtolower($additionalIdentifier);

        return match ($additionalIdentifier) {
            AdditionalCoverage::ADVENTURE_SPORTS->value => 0.25,
            AdditionalCoverage::BAGGAGE->value => 3,
            default => 0,
        };
    }

    public static function cost(string $additionalIdentifier, float $subTotal = 0, int $chargedDays = 0): float
    {
        $additionalRate = self::number($additionalIdentifier);

        return match ($additionalIdentifier) {
            AdditionalCoverage::ADVENTURE_SPORTS->value => $additionalRate * $subTotal,
            AdditionalCoverage::BAGGAGE->value => $additionalRate * $chargedDays,
            default => 0,
        };
    }
}

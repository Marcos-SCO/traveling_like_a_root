<?php

namespace App\Support;

use Carbon\CarbonInterface;
use App\Enums\AdditionalCoverage;

class AdditionalsRate
{
    public static function number(string $additional): float
    {
        $additional = strtolower($additional);

        return match ($additional) {
            AdditionalCoverage::ADVENTURE_SPORTS => 0.25,
            AdditionalCoverage::BAGGAGE => 3,
            default => 0,
        };
    }

    public static function cost(string $additional, float $subTotal = 0, int $chargedDays = 0): float
    {
        $additionalRate = self::number($additional);

        return match ($additional) {
            AdditionalCoverage::ADVENTURE_SPORTS => $additionalRate * $subTotal,
            AdditionalCoverage::BAGGAGE => $additionalRate * $chargedDays,
            default => 0,
        };
    }
}

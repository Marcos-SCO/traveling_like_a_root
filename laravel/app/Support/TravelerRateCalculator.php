<?php

namespace App\Support;

use Carbon\CarbonInterface;

class TravelerRateCalculator
{
    public static function ageMultiplier(CarbonInterface $birthDate, CarbonInterface $tripStartDate): int|float
    {

        $age = (int) $birthDate->diffInYears($tripStartDate);

        return match (true) {
            $age <= 17.99 => 0.5,
            $age >= 18.00 && $age <= 64.99 => 1,
            default => 2,
        };
    }
}

<?php 

namespace App\Support;

use Carbon\CarbonInterface;

class TravelerRateCalculator {
    public static function ageMultiplier(CarbonInterface $birthDate, CarbonInterface $tripStartDate): float {
        $age = $birthDate->diffInYears($tripStartDate);

        return match(true) {
            $age <= 17 => 0.5,
            $age >= 18 && $age <= 64 => 1,
            default => 2,
        };
    }
}
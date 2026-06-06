<?php

namespace App\Support;

class CalculateChargedDays
{
    private const MINIMUM_CHARGED_DAYS = 5;

    public static function getDays($startDate, $endDate): int
    {
        $start = new \DateTime($startDate);
        $end = new \DateTime($endDate);
        
        $totalDays = $start->diff($end)->days + 1;

        return max($totalDays, self::MINIMUM_CHARGED_DAYS);
    }
}
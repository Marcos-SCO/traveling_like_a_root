<?php

namespace App\Support;

class GroupDiscountCalculator
{
    public static function percentageNumber(int $groupSize): float
    {
        return $groupSize >= 5 ? 10 : 0;
    }
}

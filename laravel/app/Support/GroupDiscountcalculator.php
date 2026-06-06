<?php

namespace App\Support;

class GroupDiscountCalculator
{
    public static function percentage(int $groupSize): float
    {
        return $groupSize >= 5 ? 0.1 : 0;
    }
}

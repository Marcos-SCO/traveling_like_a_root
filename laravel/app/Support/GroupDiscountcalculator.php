<?php 

namespace App\Support;

class GroupDiscountCalculator {
    public function discountPercentage(int $groupSize): float {
        return $groupSize >= 5 ? 0.10 : 0;
    }
}
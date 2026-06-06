<?php

namespace Tests\Unit;

use Tests\TestCase;

use App\Support\GroupDiscountCalculator;

class GroupDiscountCalculatorTest extends TestCase
{
    public function test_group_discount_is_applied_for_more_than_five_travelers(): void
    {
        $discount =
            GroupDiscountCalculator::percentage(6);

        $this->assertEquals(0.10, $discount);
    }
    
    public function test_group_discount_not_applied_for_less_than_five_travelers(): void
    {
        $discount =
            GroupDiscountCalculator::percentage(3);

        $this->assertNotEquals(0.10, $discount);
    }
}

<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Support\AdditionalsRate;
use App\Enums\AdditionalCoverage;

class AdditionalsRateTest extends TestCase
{
    public function test_baggage_cost_is_three_per_charged_day(): void
    {
        $cost = AdditionalsRate::cost(
            AdditionalCoverage::BAGGAGE->value,
            0,
            11
        );

        $this->assertEquals(33, $cost);
    }

    public function test_adventure_sports_cost_is_twenty_five_percent_of_subtotal(): void
    {
        $cost = AdditionalsRate::cost(
            AdditionalCoverage::ADVENTURE_SPORTS->value,
            440,
            11
        );

        $this->assertEquals(110, $cost);
    }

    public function test_unknown_additional_has_zero_cost(): void
    {
        $cost = AdditionalsRate::cost(
            'invalid',
            100,
            10
        );

        $this->assertEquals(0, $cost);
    }
}
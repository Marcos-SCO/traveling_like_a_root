<?php

namespace Tests\Unit;

use Tests\TestCase;
use Carbon\Carbon;

use App\Support\CalculateChargedDays;

class CalculateChargedDaysTest extends TestCase
{
    public function test_minimum_trip_length_is_five_days(): void
    {

        $startDate = Carbon::parse('2026-07-01');
        $endDate = Carbon::parse('2026-07-03');

        $chargedDays = CalculateChargedDays::getDays($startDate, $endDate);

        $this->assertEquals(5, $chargedDays);
    }
   
    public function test_minimum_trip_length_is_fifteen_days(): void
    {

        $startDate = Carbon::parse('2026-07-01');
        $endDate = Carbon::parse('2026-07-15');

        $chargedDays = CalculateChargedDays::getDays($startDate, $endDate);

        $this->assertEquals(15, $chargedDays);
    }
}

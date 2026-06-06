<?php

namespace Tests\Unit;

use Tests\TestCase;
use Carbon\Carbon;

use App\Support\TravelerRateCalculator;

class TravelerRateCalculatorTest extends TestCase
{
    public function test_age_multiplier_for_under_18(): void
    {
        $birthDate = Carbon::parse('2008-07-15');
        $tripStart = Carbon::parse('2026-07-14');

        $ageMultiplier = TravelerRateCalculator::ageMultiplier($birthDate, $tripStart);

        $this->assertEquals(0.5, $ageMultiplier);
    }

    public function test_age_multiplier_for_between_18_and_64(): void
    {
        $birthDate = Carbon::parse('1990-01-01');
        $tripStart = Carbon::parse('2026-07-10');

        $ageMultiplier = TravelerRateCalculator::ageMultiplier($birthDate, $tripStart);

        $this->assertEquals(1, $ageMultiplier);
    }

    public function test_age_multiplier_for_over_64(): void
    {
        $birthDate = Carbon::parse('1950-01-01');
        $tripStart = Carbon::parse('2026-07-10');

        $ageMultiplier = TravelerRateCalculator::ageMultiplier($birthDate, $tripStart);

        $this->assertEquals(2, $ageMultiplier);
    }
}

<?php

namespace Tests\Unit;

use Tests\TestCase;

use App\Support\AdditionalCoverageRules;

class AdditionalCoverageRulesTest extends TestCase
{
    public function test_adventure_sports_is_denied_for_senior_traveler(): void
    {
        $result =
            AdditionalCoverageRules::adventureSportsWarnings(
                'ESPORTES_AVENTURA',
                77,
                'João'
            );

        $this->assertFalse($result['can_apply']);

        $this->assertStringContainsString(
            'João',
            $result['warning']
        );
    }

    public function test_adventure_sports_is_assert_for_young_adult_traveler(): void
    {
        $result =
            AdditionalCoverageRules::adventureSportsWarnings(
                'ESPORTES_AVENTURA',
                25,
                'Matheus'
            );

        $this->assertTrue($result['can_apply']);
    }
}

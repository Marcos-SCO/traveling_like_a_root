<?php

namespace Tests\Unit;

use App\DTOs\QuoteDTO;
use App\DTOs\TravelerDTO;
use App\Service\QuoteService;
use Tests\TestCase;

class QuoteServiceTest extends TestCase
{
    public function test_complete_quote_with_multiple_travelers_and_addons(): void
    {
        $service = app(QuoteService::class);

        $data = [
            'travel_zone' => 'europa',
            'start_date' => '2026-07-10',
            'end_date' => '2026-07-20',
            'travelers' => [
                [
                    'name' => 'Ana',
                    'birth_date' => '1990-03-15',
                    'additionals' => [
                        'bagagem',
                        'esportes_aventura',
                    ],
                ],
                [
                    'name' => 'João',
                    'birth_date' => '1949-04-01',
                    'additionals' => [
                        'bagagem',
                        'esportes_aventura',
                    ],
                ],
            ],
        ];

        $travelersDto = array_map(fn(array $traveler) => TravelerDTO::fromArray($traveler), $data['travelers']);

        $quoteDto = new QuoteDTO($data['travel_zone'], $data['start_date'], $data['end_date'], $travelersDto);

        $result = $service->calculateTotal($quoteDto);

        $this->assertEquals(11, $result['charged_days']);

        $this->assertCount(2, $result['travelers_calculated_cost_data']);

        $this->assertCount(1, $result['warnings']);

        $this->assertEquals(
            'ESPORTES_AVENTURA não aplicada para João: fora da faixa etária permitida (18-64).',
            $result['warnings'][0]
        );

        $this->assertEquals(
            0,
            $result['group_discount_percentage']
        );

        $this->assertEquals(
            852.5,
            $result['total_amount']
        );
    }
}

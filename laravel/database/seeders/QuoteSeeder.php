<?php

namespace Database\Seeders;

use App\DTOs\QuoteDTO;
use App\DTOs\TravelerDTO;
use App\Models\Traveler;
use App\Models\Quote;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Enums\AdditionalCoverage;
use App\Models\TravelerAdditional;
use App\Service\QuoteService;
use App\Service\QuotePersistenceService;
use App\Enums\TravelZone;

class QuoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $quoteService = app(QuoteService::class);

        $quotePersistenceService = app(QuotePersistenceService::class);

        for ($i = 0; $i < 10; $i++) {

            $startDate = fake()
                ->dateTimeBetween('+1 week', '+6 months');

            $endDate = (clone $startDate)
                ->modify('+' . rand(3, 8) . ' days');

            $payload = [
                'travel_zone' => fake()
                    ->randomElement(TravelZone::cases())
                    ->value,

                'start_date' => $startDate->format('Y-m-d'),

                'end_date' => $endDate->format('Y-m-d'),

                'travelers' => [],
            ];

            $travelersCount = rand(1, 8);

            for ($j = 0; $j < $travelersCount; $j++) {

                $allCoverages = collect(AdditionalCoverage::cases());

                $selectedCoverages = $allCoverages
                    ->shuffle()
                    ->take(rand(0, $allCoverages->count()))
                    ->pluck('value')
                    ->values()
                    ->toArray();

                $payload['travelers'][] = [
                    'name' => fake()->name(),

                    'birth_date' => fake()
                        ->dateTimeBetween(
                            '-80 years',
                            '-1 year'
                        )
                        ->format('Y-m-d'),

                    'additionals' => $selectedCoverages,
                ];
            }

            $travelersDto = array_map(fn(array $traveler) => TravelerDTO::fromArray($traveler), $payload['travelers']);

            $payloadQuoteDto = new QuoteDTO($payload['travel_zone'], $payload['start_date'], $payload['end_date'], $travelersDto);

            $calculatedData =
                $quoteService->calculateTotal($payloadQuoteDto);

            $quotePersistenceService->persist($calculatedData);
        }
    }
}

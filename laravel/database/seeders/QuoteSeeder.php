<?php

namespace Database\Seeders;

use App\Models\Traveler;
use App\Models\Quote;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Enums\AdditionalCoverage;
use App\Models\TravelerAdditional;
use App\Service\QuoteService;

class QuoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Quote::factory()
            ->count(30)
            ->create()
            ->each(function (Quote $quote) {

                $travelers = Traveler::factory()
                    ->count(rand(1, 8))
                    ->create([
                        'quote_id' => $quote->id
                    ]);

                foreach ($travelers as $traveler) {

                    $allCoverages = collect(AdditionalCoverage::cases());

                    $selected = $allCoverages
                        ->shuffle()
                        ->take(rand(0, $allCoverages->count()));

                    $records = [];
                    foreach ($selected as $coverage) {

                        $records[] = [
                            'traveler_id' => $traveler->id,
                            'coverage_code' => $coverage->value,
                            'amount' => 0,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }

                    TravelerAdditional::insert($records);
                }
            });
    }
}

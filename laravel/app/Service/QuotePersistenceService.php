<?php

namespace App\Service;

use App\DTOs\QuoteDTO;
use App\Models\Quote;
use App\Models\Traveler;
use App\Models\TravelerAdditional;
use App\Enums\AdditionalCoverage;
use App\Models\TravelerWarnings;

class QuotePersistenceService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function persist(
        array $calculatedData
    ): Quote {

        $quote = Quote::create([
            'travel_zone' => $calculatedData['travel_zone'],

            'start_date' => $calculatedData['start_date'],
            'end_date' => $calculatedData['end_date'],

            'charged_days' => $calculatedData['charged_days'],

            'group_discount_percentage' =>
            $calculatedData['group_discount_percentage'],

            'subtotal_amount' => $calculatedData['subtotal_amount'],
            'discount_amount' => $calculatedData['discount_amount'],
            'total_amount' =>
            $calculatedData['total_amount'],
        ]);

        foreach ($calculatedData['travelers_calculated_cost_data'] as $travelerData) {

            $traveler = Traveler::create([
                'quote_id' => $quote->id,

                'name' => $travelerData['name'],

                'birth_date' => $travelerData['birth_date'],

                'age_at_trip' => $travelerData['age_at_trip'],

                'age_multiplier' => $travelerData['age_multiplier'],

                'base_amount' => $travelerData['base_amount'],

                'additionals_amount' => $travelerData['additionals_amount'],

                'subtotal_amount' => $travelerData['subtotal'],
            ]);


            foreach (
                $travelerData['applied_additionals'] ?? []
                as $additionalItem
            ) {
                TravelerAdditional::create([
                    'traveler_id' => $traveler->id,

                    'coverage_code' => $additionalItem['coverage_code'],
                    'amount' => $additionalItem['amount'],
                ]);
            }
            
            foreach (
                $travelerData['warnings'] ?? []
                as $warningItemMessage
            ) {
                TravelerWarnings::create([
                    'traveler_id' => $traveler->id,
                    'warning_message' => $warningItemMessage,
                ]);
            }
        }

        return $quote;
    }
}

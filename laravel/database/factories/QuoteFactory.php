<?php

namespace Database\Factories;

use App\Models\Quote;
use Illuminate\Database\Eloquent\Factories\Factory;

use App\Enums\TravelZone;

/**
 * @extends Factory<Quote>
 */
class QuoteFactory extends Factory
{
    protected $model = Quote::class;

    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('+1 week', '+6 months');

        $endDate = (clone $startDate)
            ->modify('+' . rand(3, 30) . ' days');

        return [
            'travel_zone' => fake()
                ->randomElement(TravelZone::cases())
                ->value,

            'start_date' => $startDate,
            'end_date' => $endDate,

            'charged_days' => rand(3, 30),

            'group_discount_percentage' => 0,

            'subtotal_amount' => 0,
            'discount_amount' => 0,
            'total_amount' => 0,
        ];
    }
}

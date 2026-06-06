<?php

namespace Database\Factories;

use App\Models\Traveler;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Traveler>
 */
class TravelerFactory extends Factory
{
    protected $model = Traveler::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),

            'birth_date' => fake()
                ->dateTimeBetween('-80 years', '-1 year'),

            'age_at_trip' => 0,
            'age_multiplier' => 1,

            'base_amount' => 0,
            'additionals_amount' => 0,
            'subtotal_amount' => 0,
        ];
    }
}

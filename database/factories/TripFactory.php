<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use JetBrains\PhpStorm\ArrayShape;

/**
 * @extends Factory
 */
class TripFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    #[ArrayShape(['name' => "string", 'date' => "date"])]
    public function definition(): array{
        return [
            'name' => $this->faker->name,
            'date' => $this->faker->date('d-m-Y'),
        ];
    }
}

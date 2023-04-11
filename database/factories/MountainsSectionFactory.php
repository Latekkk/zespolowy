<?php

namespace Database\Factories;

use App\Models\MountainsSection;
use Illuminate\Database\Eloquent\Factories\Factory;
use JetBrains\PhpStorm\ArrayShape;

/**
 * @extends Factory
 */
class MountainsSectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    #[ArrayShape(['name' => "string", 'entry_points' => "string", 'points_for_descent' => "string", 'start_point' => "string", 'end_point' => "string"])]
    public function definition(): array{
        return [
            'name' => $this->faker->name,
            'entry_points' => $this->faker->numerify('17'),
            'points_for_descent' => $this->faker->numerify('17'),
            'start_point' => $this->faker->numerify('17'),
            'end_point' => $this->faker->numerify('17'),
        ];
    }
}

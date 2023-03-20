<?php

namespace Database\Factories;

use App\Models\Path;
use Illuminate\Database\Eloquent\Factories\Factory;
use JetBrains\PhpStorm\ArrayShape;

/**
 * @extends Factory
 */
class PathFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    #[ArrayShape(['name' => "string", 'first_point' => "string", 'second_point' => "string", 'entry_points' => "string", 'points_for_descent' => "string", 'distance' => "string"])] public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'first_point' => $this->faker->numerify('50.############'),
            'second_point' => $this->faker->numerify('17.############'),
            'entry_points' => $this->faker->numerify('17.############'),
            'points_for_descent' => $this->faker->numerify('17.############'),
            'distance' => $this->faker->numerify('17.############'),
        ];
    }
}

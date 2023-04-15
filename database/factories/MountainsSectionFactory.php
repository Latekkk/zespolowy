<?php

namespace Database\Factories;

use App\Models\MountainsSection;
use App\Models\Point;
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
            'entry_points' => $this->faker->numberBetween(1,100),
            'points_for_descent' => $this->faker->numberBetween(1,100),
            'start_point' => Point::inRandomOrder()->first()->id,
            'end_point' =>Point::inRandomOrder()->first()->id ,
        ];
    }
}

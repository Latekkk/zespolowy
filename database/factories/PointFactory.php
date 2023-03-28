<?php

namespace Database\Factories;

use App\Models\Point;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use JetBrains\PhpStorm\ArrayShape;

/**
 * @extends Factory
 */
class PointFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    #[ArrayShape(['name' => "string", 'lat' => "string", 'lng' => "string"])] public function definition(): array
    {


        return [
            'name' => $this->faker->name,
            'lat' => $this->faker->numerify('50.############'),
            'lng' => $this->faker->numerify('17.############'),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Trip;
use App\Models\MountainSection;
use Illuminate\Database\Eloquent\Factories\Factory;
use JetBrains\PhpStorm\ArrayShape;

/**
 * @extends Factory
 */
class MountainSectionTripFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    #[ArrayShape(['mountain_section_id' => "string", 'trip_id' => "string"])]
    public function definition(): array{
        return [
            'mountain_section_id' => MountainSection::inRandomOrder()->first()->id,
            'trip_id' => Trip::inRandomOrder()->first()->id ,
        ];
    }
}

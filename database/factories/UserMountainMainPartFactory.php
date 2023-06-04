<?php

namespace Database\Factories;

use App\Models\MountainMainPart;
use App\Models\User;
use App\Models\UserMountainMainPart;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserMountainMainPart>
 */
class UserMountainMainPartFactory extends Factory
{
    protected $model = UserMountainMainPart::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'mountain_main_part_id' => MountainMainPart::factory(),
            'granted' => User::factory(),
            'created_at' => Carbon::now(),
        ];
    }
}

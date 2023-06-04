<?php

namespace Database\Seeders;

use App\Enums\UserRolesEnum;
use App\Models\User;
use App\Models\UserMountainMainPart;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserMountainMainPartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserMountainMainPart::insert([
            [
                'user_id' => 1,
                'mountain_main_part_id' => 1,
                'granted' => 2,
                'created_at' => now(),
            ],
            [
                'user_id' => 2,
                'mountain_main_part_id' => 3,
                'granted' => 4,
                'created_at' => now(),
            ],
            [
                'user_id' => 2,
                'mountain_main_part_id' => 1,
                'granted' => 1,
                'created_at' => now(),
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Point;
use App\Models\User;
use Database\Factories\PointFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PointSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userFirst = User::where('email','test@test.com')->first();

        Point::factory()->count(60)->create(['user_id' => $userFirst->id]);


        $userSecond = User::where('email','admin@localhost.com')->first();
        Point::factory()->count(60)->create(['user_id' => $userSecond->id]);
    }
}

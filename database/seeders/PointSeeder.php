<?php

namespace Database\Seeders;

use App\Models\Point;
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
        Point::factory()->count(120)->create();
    }
}

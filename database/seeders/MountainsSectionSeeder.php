<?php

namespace Database\Seeders;

use App\Models\MountainsSection;
use Database\Factories\MountainsSectionFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MountainsSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MountainsSection::factory()->count(10)->create();
    }
}

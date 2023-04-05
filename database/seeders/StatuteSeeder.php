<?php

namespace Database\Seeders;

use App\Models\Statute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatuteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Statute::factory()->count(1)->create();
    }
}

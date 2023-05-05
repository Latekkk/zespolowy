<?php

namespace Database\Seeders;

use App\Models\Trip;
use Illuminate\Database\Seeder;

class TripSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Trip::truncate();
        $trip =[
            [
                'name' => 'twoja stra1', 'totalPoints' => '6'
            ],
            [
                'name' => 'twoja stra1', 'totalPoints' => '9'
            ],
            [
                'name' => 'twoja stra', 'totalPoints' => '8'
            ],
            ];
        Trip::insert($trip);
    }
}

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
                'name' => 'twoja stra1', 'date' => '16-10-20'
            ],
            [
                'name' => 'twoja stra2', 'date' => '17-10-20'
            ],
            [
                'name' => 'twoja stra', 'date' => '26-10-20'
            ],
            ];
        Trip::insert($trip);
    }
}

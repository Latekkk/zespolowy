<?php

namespace Database\Seeders;

use App\Models\MountainSectionTrip;
use Illuminate\Database\Seeder;

class MountainSectionTripSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MountainSectionTrip::truncate();
        $mountainsSectionTrip =[
            [
                'mountain_section_id' => '3', 'trip_id' => '1',
                'mountain_section_id' => '2', 'trip_id' => '2',
                'mountain_section_id' => '7', 'trip_id' => '3'
            ]
        ];
        MountainSectionTrip::insert($mountainsSectionTrip);
    }
}

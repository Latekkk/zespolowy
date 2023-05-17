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
                'mountain_section_id' => '1', 'trip_id' => '1'
            ]
        ];
        MountainSectionTrip::insert($mountainsSectionTrip);
    }
}

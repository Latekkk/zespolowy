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
        $mountainsSectionTrip = [
            [
                'mountain_section_id' => '3',
                'trip_id' => '1',
                'selected' => '1'
            ],
            [
                'mountain_section_id' => '2',
                'trip_id' => '2',
                'selected' => '1'
            ],
            [
                'mountain_section_id' => '7',
                'trip_id' => '3',
                'selected' => '1'
            ],
            [
                'mountain_section_id' => '8',
                'trip_id' => '4',
                'selected' => '1'
            ],
            [
                'mountain_section_id' => '9',
                'trip_id' => '4',
                'selected' => '1'
            ],
            [
                'mountain_section_id' => '10',
                'trip_id' => '4',
                'selected' => '1'
            ],
            [
                'mountain_section_id' => '11',
                'trip_id' => '4',
                'selected' => '1'
            ],
            [
                'mountain_section_id' => '12',
                'trip_id' => '4',
                'selected' => '1'
            ],
        ];
        MountainSectionTrip::insert($mountainsSectionTrip);
    }
}


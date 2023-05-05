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

            ]];
        MountainSectionTrip::insert($mountainsSectionTrip);
    }
}

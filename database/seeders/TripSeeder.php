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
                'name' => 'Wycieczka do zamku Książ', 'date' => '23-06-11'
            ],
            [
                'name' => 'Śnieżne kotły', 'date' => '23-06-18'
            ],
            [
                'name' => 'Przez granice Orle - Harrachov (Czechy) ', 'date' => '23-06-25'
            ],
            ];
        Trip::insert($trip);
    }
}

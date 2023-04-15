<?php

namespace Database\Seeders;

use App\Models\Point;
use App\Models\User;
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
        Point::truncate();
        $points =[
            [
                'name' => 'Przełęcz Okraj', 'lat' => '50.74689406', 'lng' => '15.82364818', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Rozdroże pod Łysociną', 'lat' => '50.72557435', 'lng' => '15.83670616', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Szklarska Poręba', 'lat' => '50.82977286', 'lng' => '15.51785633', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Śnieżne Kotły TV', 'lat' => '50.77892154', 'lng' => '15.55692236', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Świebodzice, st. kol.', 'lat' => '50.85981203', 'lng' => '16.33256882', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Książ, zamek', 'lat' => '50.8422650275', 'lng' => '16.2959182125', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Andrzejówka', 'lat' => '50.68483964', 'lng' => '16.27822098', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Rozdroże pod Waligórą', 'lat' => '50.67693413', 'lng' => '16.27062437', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Biedrzychowice', 'lat' => '51.04497581', 'lng' => '15.37489414', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Czerniawa Zdrój', 'lat' => '50.91681985', 'lng' => '15.30175835', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Gierczyn', 'lat' => '50.93108615', 'lng' => '15.4018278', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Schronisko PTTK na Stogu Izerskim', 'lat' => '50.89228232', 'lng' => '15.308969053333', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Przejście graniczne Jakuszyce-Harrachov', 'lat' => '50.77666293', 'lng' => '15.39412401', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Przejście graniczne Orle-Jizerka', 'lat' => '50.81595601', 'lng' => '15.37079204', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Przełęcz Szklarska', 'lat' => '50.81360182', 'lng' => '15.42853807', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Rozdroże Pod Działem Izerskim', 'lat' => '50.80442534', 'lng' => '15.40086766', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Świeradów-Zdrój PKP', 'lat' => '50.911392', 'lng' => '15.34308', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Bukowiec', 'lat' => '50.82643837', 'lng' => '15.82184761', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Schronisko na Stogu Izerskim', 'lat' => '50.892497', 'lng' => '15.308775', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Świeradów-Zdrój – Skywalk', 'lat' => '50.899872', 'lng' => '15.337204', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Karłowice', 'lat' => '51.027336', 'lng' => '15.381856', 'user_id' => rand(0, 10)
            ],
            [
                'name' => 'Gryfów Śląski', 'lat' => '51.027222', 'lng' => '15.419167', 'user_id' => rand(0, 10)
            ],
        ];
        Point::insert($points);
    }
}

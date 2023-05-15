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
                'name' => 'Schronisko PTTK Przełęcz Okraj', 'lat' => '50.74689406', 'lng' => '15.82364818', 'user_id' => 0
            ],
            [
                'name' => 'Rozdroże pod Łysociną', 'lat' => '50.72557435', 'lng' => '15.83670616', 'user_id' => 0
            ],
            [
                'name' => 'Przełęcz pod Śmielcem', 'lat' => '50.778667', 'lng' => '15.571397', 'user_id' => 0
            ],
            [
                'name' => 'Czarcia Ambona (Śnieżne Kotły)', 'lat' => '50.77892154', 'lng' => '15.55692236', 'user_id' => 0
            ],
            [
                'name' => 'Świebodzice, st. kol.', 'lat' => '50.85981203', 'lng' => '16.33256882', 'user_id' => 0
            ],
            [
                'name' => 'Książ, zamek', 'lat' => '50.8422650275', 'lng' => '16.2959182125', 'user_id' => 0
            ],
            [
                'name' => 'Andrzejówka', 'lat' => '50.68483964', 'lng' => '16.27822098', 'user_id' => 0
            ],
            [
                'name' => 'Rozdroże pod Waligórą', 'lat' => '50.67693413', 'lng' => '16.27062437', 'user_id' => 0
            ],
            [
                'name' => 'Biedrzychowice', 'lat' => '51.04497581', 'lng' => '15.37489414', 'user_id' => 0
            ],
            [
                'name' => 'Czerniawa Zdrój', 'lat' => '50.91681985', 'lng' => '15.30175835', 'user_id' => 0
            ],
            [
                'name' => 'Gierczyn', 'lat' => '50.93108615', 'lng' => '15.4018278', 'user_id' => 0
            ],
            [
                'name' => 'Schronisko na Stogu Izerskim', 'lat' => '50.89228232', 'lng' => '15.308969053333', 'user_id' => 0
            ],
            [
                'name' => 'Schronisko Orle', 'lat' => '50.814841', 'lng' => '15.383085', 'user_id' => 0
            ],
            [
                'name' => 'Harrachov, železniční stanice', 'lat' => '50.771448', 'lng' => '15.392132', 'user_id' => 0
            ],
            [
                'name' => 'Przełęcz Szklarska', 'lat' => '50.81360182', 'lng' => '15.42853807', 'user_id' => 0
            ],
            [
                'name' => 'Rozdroże Pod Działem Izerskim', 'lat' => '50.80442534', 'lng' => '15.40086766', 'user_id' => 0
            ],
            [
                'name' => 'Szklarska Poręba', 'lat' => '50.829702', 'lng' => '15.517885', 'user_id' => 0
            ],
            [
                'name' => 'Chatka Górzystów', 'lat' => '50.854444', 'lng' => '15.360833', 'user_id' => 0
            ],
            [
                'name' => 'Schronisko na Stogu Izerskim', 'lat' => '50.892497', 'lng' => '15.308775', 'user_id' => 0
            ],
            [
                'name' => 'Świeradów-Zdrój, ujęcie wody', 'lat' => '50.902516', 'lng' => '15.333703', 'user_id' => 0
            ],
            [
                'name' => 'Karłowice', 'lat' => '51.027336', 'lng' => '15.381856', 'user_id' => 0
            ],
            [
                'name' => 'Gryfów Śląski', 'lat' => '51.027222', 'lng' => '15.419167', 'user_id' => 0
            ],
        ];
        Point::insert($points);
    }
}

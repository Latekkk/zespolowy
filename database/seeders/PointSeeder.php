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
                'name' => 'Schronisko PTTK Przełęcz Okraj', 'lat' => '50.74689406', 'lng' => '15.82364818', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Rozdroże pod Łysociną', 'lat' => '50.72557435', 'lng' => '15.83670616','mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Przełęcz pod Śmielcem', 'lat' => '50.778667', 'lng' => '15.571397','mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Czarcia Ambona (Śnieżne Kotły)', 'lat' => '50.77892154', 'lng' => '15.55692236','mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Świebodzice, st. kol.', 'lat' => '50.85981203', 'lng' => '16.33256882','mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Książ, zamek', 'lat' => '50.8422650275', 'lng' => '16.2959182125', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Andrzejówka', 'lat' => '50.68483964', 'lng' => '16.27822098', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Rozdroże pod Waligórą', 'lat' => '50.67693413', 'lng' => '16.27062437', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Biedrzychowice', 'lat' => '51.04497581', 'lng' => '15.37489414', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Czerniawa Zdrój', 'lat' => '50.91681985', 'lng' => '15.30175835', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Gierczyn', 'lat' => '50.93108615', 'lng' => '15.4018278', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Schronisko na Stogu Izerskim', 'lat' => '50.89228232', 'lng' => '15.308969053333', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Schronisko Orle', 'lat' => '50.814841', 'lng' => '15.383085', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Harrachov, železniční stanice', 'lat' => '50.771448', 'lng' => '15.392132', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Przełęcz Szklarska', 'lat' => '50.81360182', 'lng' => '15.42853807', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Rozdroże Pod Działem Izerskim', 'lat' => '50.80442534', 'lng' => '15.40086766', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Szklarska Poręba', 'lat' => '50.829702', 'lng' => '15.517885', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Chatka Górzystów', 'lat' => '50.854444', 'lng' => '15.360833', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Schronisko na Stogu Izerskim', 'lat' => '50.892497', 'lng' => '15.308775', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Świeradów-Zdrój, ujęcie wody', 'lat' => '50.902516', 'lng' => '15.333703', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Karłowice', 'lat' => '51.027336', 'lng' => '15.381856', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Gryfów Śląski', 'lat' => '51.027222', 'lng' => '15.419167', 'mountain_main_part_id'=> 5, 'user_id' => 0
            ],
            [
                'name' => 'Maślana Góra', 'lat' => '49.643297', 'lng' => '21.059131', 'mountain_main_part_id'=> 3, 'user_id' => 0
            ],
            [
                'name' => 'Stróże', 'lat' => '49.654251', 'lng' => '20.975594', 'mountain_main_part_id'=> 3, 'user_id' => 0
            ],
            [
                'name' => 'Trzy Kopce Wiślańskie', 'lat' => '49.664174', 'lng' => '18.902521', 'mountain_main_part_id'=> 2, 'user_id' => 0
            ],
            [
                'name' => 'Orłowa, osada', 'lat' => '49.697301', 'lng' => '18.872676', 'mountain_main_part_id'=> 2, 'user_id' => 0
            ],
            [
                'name' => 'Ustroń, Polana', 'lat' => '49.696824', 'lng' => '18.828434', 'mountain_main_part_id'=> 2, 'user_id' => 0
            ],
            [
                'name' => 'Rusinowa Polana', 'lat' => '49.262862', 'lng' => '20.090297', 'mountain_main_part_id'=> 1, 'user_id' => 0
            ],
            [
                'name' => 'Dolina Filipka', 'lat' => '49.282190', 'lng' => '20.087708', 'mountain_main_part_id'=> 1, 'user_id' => 0
            ],
            [
                'name' => 'Ruski Bród', 'lat' => '51.287296', 'lng' => '20.573676', 'mountain_main_part_id'=> 4, 'user_id' => 0
            ],
            [
                'name' => 'Guzdek', 'lat' => '51.325480', 'lng' => '20.567849', 'mountain_main_part_id'=> 4, 'user_id' => 0
            ],
            [
                'name' => 'Podlesok', 'lat' => '48.964809', 'lng' => '20.385583', 'mountain_main_part_id'=> 6, 'user_id' => 0
            ],
            [
                'name' => 'Nad Podleskom', 'lat' => '48.956750', 'lng' => '20.389883', 'mountain_main_part_id'=> 6, 'user_id' => 0
            ],
        ];
        Point::insert($points);
    }
}

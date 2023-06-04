<?php

namespace Database\Seeders;

use App\Models\MountainSection;
use Illuminate\Database\Seeder;

class MountainSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MountainSection::truncate();
        $mountainsSection =[
            [
                'name' => 'Rozdroże pod Łysociną - Schronisko PTTK Przełęcz Okraj', 'entry_points' => '3', 'points_for_descent' => '3', 'start_point' => '2', 'end_point' => '1', 'mountain_main_part_id' => 1
            ],
            [
                'name' => 'Przełęcz pod Śmielcem - Czarcia Ambona (Śnieżne Kotły)', 'entry_points' => '2', 'points_for_descent' => '1', 'start_point' => '3', 'end_point' => '4', 'mountain_main_part_id' => 1,
            ],
            [
                'name' => 'Świebodzice, st. kol. - Książ, zamek', 'entry_points' => '4', 'points_for_descent' => '5', 'start_point' => '5', 'end_point' => '6', 'mountain_main_part_id' => 1,
            ],
            [
                'name' => 'Gryfów Śląski - Karłowice', 'entry_points' => '5', 'points_for_descent' => '5', 'start_point' => '21', 'end_point' => '22', 'mountain_main_part_id' => 1,
            ],
            [
                'name' => 'Świeradów-Zdrój, ujęcie wody - Schronisko na Stogu Izerskim', 'entry_points' => '9', 'points_for_descent' => '4', 'start_point' => '20', 'end_point' => '19', 'mountain_main_part_id' => 1,
            ],
            [
                'name' => 'Chatka Górzystów - Szklarska Poręba', 'entry_points' => '15', 'points_for_descent' => '17', 'start_point' => '18', 'end_point' => '17', 'mountain_main_part_id' => 1,
            ],
            [
                'name' => 'Schronisko Orle - Harrachov, železniční stanice', 'entry_points' => '8', 'points_for_descent' => '10', 'start_point' => '13', 'end_point' => '14', 'mountain_main_part_id' => 1,
            ],
            ];
        MountainSection::insert($mountainsSection);
    }
}

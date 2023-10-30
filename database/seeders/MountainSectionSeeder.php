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
        $mountainsSections =[
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
            [
                'name' => 'Książ, zamek - Cis Bolko', 'entry_points' => '1', 'points_for_descent' => '2', 'start_point' => '6', 'end_point' => '35', 'mountain_main_part_id' => 1,
            ],
            [
                'name' => 'Cis Bolko - Pełcznica', 'entry_points' => '0', 'points_for_descent' => '0', 'start_point' => '35', 'end_point' => '36', 'mountain_main_part_id' => 1,
            ],
            [
                'name' => 'Pełcznica - Zamek Cisy', 'entry_points' => '4', 'points_for_descent' => '4', 'start_point' => '36', 'end_point' => '37', 'mountain_main_part_id' => 1,
            ],
            [
                'name' => 'Zamek Cisy - Czerwone Wzgórze', 'entry_points' => '7', 'points_for_descent' => '6', 'start_point' => '37', 'end_point' => '40', 'mountain_main_part_id' => 1,
            ],
            [
                'name' => 'Czerwone Wzgórze - Szczawno-Zdrój', 'entry_points' => '4', 'points_for_descent' => '5', 'start_point' => '40', 'end_point' => '41', 'mountain_main_part_id' => 1,
            ],
            ];
        foreach ($mountainsSections as $mountainSection)
        {
            $mountainSection = new MountainSection($mountainSection);
            $mountainSection->save();
        }
    }
}

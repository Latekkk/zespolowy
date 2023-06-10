<?php

namespace Database\Seeders;

use App\Models\Advertisement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdvertisementsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Advertisement::truncate();
        Advertisement::create([
            'title' => 'Nieczynne biuro oddziału',
            'description' => '<p>Szanowni turyści,</p><p><br></p><p>W dniach 08.06.2023 do 20.06.2023 biuro oddziału będzie nieczynne. W pilnych sprawach prosimy o kontakt drogą mailową lub telefoniczną. </p><p><br></p><p><strong><u>Za utrudnienia przepraszamy.</u></strong></p>',
            'slug' => 'nieczynne-biuro-oddzialu',
            'time_from' => '2023-06-08 00:00:00',
            'time_to' => '2023-06-20 00:00:00',
        ]);
        Advertisement::create([
            'title' => 'Zamknięty szlak',
            'description' => '<h1><strong><u>UWAGA TURYŚCI!</u></strong></h1><p><br></p><p>Od dnia 10.06.2023 do odwołania szlak <strong><u>Stóg Izerski z Czerniawy Zdroju</u></strong> będzie nieczynny z obawy przed pogodą. Prosimy uważać na siebie i nie wychodzić na ten szlak.</p>',
            'slug' => 'zamkniety-szlak',
            'time_from' => '2023-06-10 00:00:00',
        ]);
    }
}

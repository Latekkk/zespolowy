<?php

namespace Database\Seeders;

use App\Models\MountainMainPart;
use Database\Factories\MountainPartFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MountainMainPartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MountainMainPart::truncate();
        $mountainPart =[
            [
                'name' => 'Tatry i Podtatrze',
            ],
            [
                'name' => 'Beskidy Zachodnie',
            ],
            [
                'name' => 'Beskidy Wschodnie',
            ],
            [
                'name' => 'Góry Świętokorzyskie',
            ],
            [
                'name' => 'Sudety',
            ],
            [
                'name' => 'Słowacja',
            ],
        ];
        MountainMainPart::insert($mountainPart);
    }
}

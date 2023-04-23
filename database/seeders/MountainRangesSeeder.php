<?php

namespace Database\Seeders;

use App\Models\MountainRanges;
use Illuminate\Database\Seeder;

class MountainRangesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MountainRanges::truncate();
        $mountainRanges =[
            [
                'name' => 'Podtatrze1',
            ],
            [
                'name' => 'Podtatrze2',
            ],
            [
                'name' => 'Podtatrze3',
            ],
            [
                'name' => 'Podtatrze4',
            ],
            [
                'name' => 'Podtatrze5',
            ],
            ];
        MountainRanges::insert($mountainRanges);
    }
}

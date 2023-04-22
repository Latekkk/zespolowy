<?php

namespace Database\Seeders;

use App\Models\MountainPart;
use Database\Factories\MountainPartFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MountainPartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MountainPart::truncate();
        $mountainPart =[
            [
                'name' => 'Tatry1',
            ],
            [
                'name' => 'Tatry2',
            ],
            [
                'name' => 'Tatry3',
            ],
            [
                'name' => 'Tatry4',
            ],
            [
                'name' => 'Tatry5',
            ],
            [
                'name' => 'Tatry6',
            ],
            [
                'name' => 'Tatry7',
            ],
            ];
        MountainPart::insert($mountainPart);
    }
}

<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\MountainRanges;
use App\Models\MountainSectionTrip;
use App\Models\User;
use Database\Factories\PathFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            UserSeeder::class,
            MountainMainPartSeeder::class,
            PointSeeder::class,
            MountainSectionSeeder::class,
            StatuteSeeder::class,
            SquadSeeder::class,
            MountainRangesSeeder::class,
            TripSeeder::class,
            MountainSectionTripSeeder::class,
            UserMountainMainPartSeeder::class,
            AdvertisementsSeeder::class
        ]);

        User::factory(10)->create();
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        User::create([
            'name' => 'Admin Test',
            'email' => 'test@test.com',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('123123123'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'PathUser Test',
            'email' => 'pathuser@test.com',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('123123123'),
            'role' => 'pathuser',
        ]);

        User::create([
            'name' => 'SquadUser Test',
            'email' => 'squaduser@test.com',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('123123123'),
            'role' => 'squaduser',
        ]);

        User::create([
            'name' => 'User Test',
            'email' => 'user@test.com',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('123123123'),
            'role' => 'user',
        ]);
    }
}

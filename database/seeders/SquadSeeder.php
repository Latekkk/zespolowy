<?php

namespace Database\Seeders;

use App\Models\Squad;
use App\Models\Statute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SquadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Squad::create([
            'content' => '<p class="ql-align-center"><br></p><h2><strong>Przewodniczący</strong></h2><p>-</p><p>-</p><p>-</p><p><br></p><h2><strong>Wiceprzewodniczący</strong></h2><p>Jan Ślazik</p><p>609-323-539</p><p><br></p><h2><strong>Sekretarz (18.08.2016)</strong></h2><p>Waldemar Ciszewski</p><p>602-775-993</p><p><br></p><h2><strong>Członek</strong></h2><p>Grzegorz Szczotka</p><p>508-073-154</p><p>ktg@ktg.hg.pl</p><p><br></p><h2><strong>Członek</strong></h2><p>Piotr Halo</p><p>664-731-082</p><p>phgraf@wp.pl</p><p><br></p>',
        ]);
    }
}

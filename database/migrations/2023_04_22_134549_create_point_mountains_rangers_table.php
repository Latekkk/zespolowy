<?php

use App\Models\MountainMainPart;
use App\Models\MountainRanges;
use App\Models\Point;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('point_mountains_main_parts', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Point::class);
            $table->foreignIdFor(MountainMainPart::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('point_mountains_rangers');
    }
};

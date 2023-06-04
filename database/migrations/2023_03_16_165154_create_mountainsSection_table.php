<?php

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
        Schema::create('mountain_sections', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->foreignIdFor(\App\Models\Point::class,'start_point');
            $table->foreignIdFor(\App\Models\Point::class,'end_point');
            $table->foreignIdFor(\App\Models\MountainMainPart::class);
            $table->integer('entry_points');
            $table->integer('points_for_descent');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mountains_sections');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\MountainSection;
use App\Models\Trip;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mountain_section_trip', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignIdFor(MountainSection::class);
            $table->foreignIdFor(Trip::class);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mountain_section_trip');
    }
};

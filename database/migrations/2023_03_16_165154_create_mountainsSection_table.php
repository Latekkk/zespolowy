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
        Schema::create('mountains_sections', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->unique();
            $table->integer('entry_points');
            $table->integer('points_for_descent');
            $table->unsignedBigInteger('start_point');
            $table->unsignedBigInteger('end_point');
            $table->timestamps();
            $table->foreign('start_point')->references('id')->on('points');
            $table->foreign('end_point')->references('id')->on('points');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('moutainsSections');
    }
};

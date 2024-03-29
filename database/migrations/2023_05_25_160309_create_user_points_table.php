<?php

use App\Enums\StatusEnum;
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
        Schema::create('user_points', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class);
            $table->integer('points_mountain_section');
            $table->enum('status', StatusEnum::toArray());
            $table->foreignIdFor(\App\Models\Trip::class, 'trip_id')->nullable();
            $table->foreignIdFor(\App\Models\User::class, 'path_user_id')->nullable();
            $table->foreignIdFor(\App\Models\User::class, 'approved_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_points');
    }
};

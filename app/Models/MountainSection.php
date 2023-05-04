<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MountainSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'entry_points',
        'points_for_descent',
        'start_point',
        'end_point',
    ];

    public function start_point(): BelongsTo
    {
        return $this->belongsTo(Point::class, 'start_point');
    }

    public function end_point(): BelongsTo
    {
        return $this->belongsTo(Point::class, 'end_point');
    }

    public function mountainRanges()
    {
        return $this->belongsTo(MountainRanges::class);
    }

    public function points()
    {

        return $this->belongsTo(Point::class, 'point_mountains_main_parts');
    }
}
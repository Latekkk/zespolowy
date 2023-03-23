<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @method create(array|string[] $array_merge)
 * @method static orderBy(mixed $param, string $param1)
 */
class Path extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'entry_points',
        'points_for_descent',
        'distance'
    ];

    public function points(): BelongsToMany
    {
        return $this->belongsToMany(Point::class, 'paths_points');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'distance',
        'first_point',
        'second_point'
    ];
}

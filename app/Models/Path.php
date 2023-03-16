<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

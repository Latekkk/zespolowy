<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method create(array|string[] $array_merge)
 */
class Badge extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'description',
        'img_url',
        'point',

    ];

}

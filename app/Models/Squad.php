<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method create(array|string[] $array_merge)
 * @method static paginate(int $int)
 */

class Squad extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
    ];
}

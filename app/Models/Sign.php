<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

/**
 * @method create(array|string[] $array_merge)
 */
class Sign extends Model
{
    use HasFactory;


    protected $fillable = [
        'hiking_trail',
        'description',
    ];

    public function photos(): MorphToMany
    {
        return $this->morphToMany(Photo::class, 'imageable');
    }
}

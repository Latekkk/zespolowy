<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

/**
 * @method create(array|string[] $array_merge)
 */
class Badge extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'point',
    ];


    public function photos()
    {
        return $this->morphToMany(Photo::class, 'imageable');
    }

}

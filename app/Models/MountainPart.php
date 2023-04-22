<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method create(array|string[] $array_merge)
 * @method static paginate(int $int)
 */
class MountainPart extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
    public function mountainRanges()
    {
        return $this->hasMany(MountainRanges::class);
    }
}

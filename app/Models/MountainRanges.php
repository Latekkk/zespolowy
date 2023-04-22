<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method create(array|string[] $array_merge)
 * @method static paginate(int $int)
 */
class MountainRanges extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
    public function mountainPart()
    {
        return $this->belongsTo(MountainPart::class);
    }

    public function mountainsSections()
    {
        return $this->hasMany(MountainsSection::class);
    }
}

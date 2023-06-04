<?php

namespace App\Models;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @method create(array|string[] $array_merge)
 * @method static paginate(int $int)
 */
class MountainMainPart extends Model
{
    #main
    use HasFactory;
    use Timestamp;

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

    public function points(): BelongsToMany
    {
        return $this->belongsToMany(Point::class, 'point_mountains_main_parts');
    }

    public function userMountainMainParts(): HasMany
    {
        return $this->hasMany(UserMountainMainPart::class);
    }
}

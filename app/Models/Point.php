<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;


/**
 * @method create(Point $point)
 * @method static paginate(int $int)
 * @method static orderBy(mixed $param, string $param1)
 * @method static inRandomOrder()
 */
class Point extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'lat',
        'lng',
        'user_id',
        'mountain_main_part_id',
        'is_global'
    ];

    public function start_point(): HasOne
    {
        return $this->hasOne(MountainSection::class, 'start_point');
    }

    public function end_point(): HasOne
    {
        return $this->hasOne(MountainSection::class, 'end_point');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function mountainMainParts(): BelongsToMany
    {
        return $this->belongsToMany(MountainMainPart::class, 'point_mountains_main_parts');
    }
}

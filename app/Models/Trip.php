<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

/**
 * @method create(array|string[] $array_merge)
 * @method static paginate(int $int)
 * @method static orderBy(mixed $param, string $param1)
 *  @method static inRandomOrder()
 */
class Trip extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'date',
    ];

    public function mountainSections(): BelongsToMany
    {
        return $this->belongsToMany(MountainSection::class, 'mountain_section_trips', 'trip_id', 'mountain_section_id');
    }

    public function photos(): MorphToMany
    {
        return $this->morphToMany(Photo::class, 'imageable');
    }
}

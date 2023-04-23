<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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

    public function mountainMainPart()
    {
        return $this->belongsTo(MountainMainPart::class);
    }

    public function mountainSections()
    {
        return $this->hasMany(MountainSection::class);
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @method create(Point $point)
 * @method static paginate(int $int)
 * @method static orderBy(mixed $param, string $param1)
 */
class Point extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'lat',
        'lng',
    ];

    public function paths(): BelongsToMany
    {
        return $this->belongsToMany(Path::class, 'paths_points');
    }

}

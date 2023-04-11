<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;


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
        'user_id'
    ];

    public function start_point(): HasOne
    {
        return $this->hasOne(MountainsSection::class, 'start_point');
    }

    public function end_point(): HasOne
    {
        return $this->hasOne(MountainsSection::class, 'end_point');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Models;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserMountainMainPart extends Model
{
    use HasFactory;
    use Timestamp;

    protected $fillable = [
        'user_id',
        'mountain_main_part_id',
        'granted',
        'created_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function mountainMainPart(): BelongsTo
    {
        return $this->belongsTo(MountainMainPart::class);
    }

    public function grantedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'granted');
    }
}

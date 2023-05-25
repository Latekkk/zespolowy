<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserPoints extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'mountain_section_id',
        'points_mountain_section',
        'status',
        'approved_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function mountainSection(): BelongsTo
    {
        return $this->belongsTo(MountainSection::class);
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_id');
    }

}

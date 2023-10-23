<?php

namespace App\Models;

use App\Enums\UserRolesEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class UserPoints extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'mountain_section_id',
        'points_mountain_section',
        'status',
        'approved_id',
        'path_user_id'
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

    public function photos(): MorphToMany
    {
        return $this->morphToMany(Photo::class, 'imageable');
    }

    public function pathUser(): BelongsTo
    {
        return $this->belongsTo(User::class)->where('role', UserRolesEnum::PATHUSER->value);
    }

}

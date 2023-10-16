<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\PointsMountainSectionEnum;
use App\Enums\StatusEnum;
use App\Http\Resources\UserResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function photos(): MorphToMany
    {
        return $this->morphToMany(Photo::class, 'photoable');
    }

    public function points(): HasMany
    {
        return $this->hasMany(Point::class);
    }

    public function badges(): BelongsToMany
    {
        return $this->belongsToMany(Badge::class, 'user_badges');
    }


    public function userPoints(): HasMany
    {
        return $this->hasMany(UserPoints::class);
    }

    public function getPointsAttribute(): int
    {
        $userPoints = $this->userPoints()->with('mountainSection')->where('status', StatusEnum::APPROVED)->get();
        return $userPoints->sum(function ($userPoint) {
            return $userPoint->points_mountain_section === PointsMountainSectionEnum::ENTRY->value
                ? $userPoint->mountainSection->entry_points
                : $userPoint->mountainSection->points_for_descent;
        });
    }

    public function userMountainMainParts(): HasMany
    {
        return $this->hasMany(UserMountainMainPart::class);
    }

    public function grantedUserMountainMainParts(): HasMany
    {
        return $this->hasMany(UserMountainMainPart::class, 'granted');
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

}

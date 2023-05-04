<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Facades\Storage;

/**
 * @property string $file_name
 * @property string $imageable_type
 * @property integer $imageable_id
 */
class Photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_name',
    ];

    public function imageable()
    {
        return $this->morphToMany(Model::class, 'imageable');
    }

    public function getUrlAttribute(): string
    {
        return Storage::url($this->file_name);
    }

    public function deleteImage(): void
    {
        Storage::delete('photos/'. $this->file_name);
        $this->delete();
    }

}

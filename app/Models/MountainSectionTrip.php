<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MountainSectionTrip extends Model
{
    use HasFactory;

    protected $fillable = [
        'mountain_section_id',
        'trip_id',
        'selected'
    ];
}

<?php

namespace App\Helpers;

use Illuminate\Support\Str;

class SlugHelper
{
    public static function getSlug($text): string
    {
        return Str::slug(str_replace(' ','_', $text));
    }
}




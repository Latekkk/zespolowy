<?php

namespace App\Helpers;

use Illuminate\Support\Str;
use JetBrains\PhpStorm\ArrayShape;

class ToastHelper
{
    #[ArrayShape(['toast' => 'array'])]
    public static function update($model,  $severity = 'success'): array
    {
        return [
            'toast' => [
                'summary' => __('global.update'),
                'content' => __('global.'.$model . '.update.toast'),
                'severity' => $severity
            ]
        ];
    }

    #[ArrayShape(['toast' => 'array'])]
    public static function remove($model,  $severity = 'success'): array
    {
        return [
            'toast' => [
                'summary' => __('global.remove'),
                'content' => __('global.'.$model . '.remove.toast'),
                'severity' => $severity
            ]
        ];
    }

    #[ArrayShape(['toast' => "array"])]
    public static function create($model, $severity = 'success'): array
    {
        return [
            'toast' => [
                'summary' => __('global.create'),
                'content' => __('global.'.$model . '.create.toast'),
                'severity' => $severity
            ]
        ];
    }
}




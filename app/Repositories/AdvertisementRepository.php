<?php

namespace App\Repositories;

use App\Http\Requests\AdvertisementRequest;
use App\Models\Advertisement;
use App\Models\Gallery;
use App\Models\Image;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdvertisementRepository
{
    protected Advertisement $model;

    public function __construct(Advertisement $model)
    {
        $this->model = $model;
    }

    public function create(AdvertisementRequest $request): void
    {
        $this->model->create(array_merge($request->all(), ['slug' => Str::slug($request->title)]));

    }

    public function update(AdvertisementRequest $request, Advertisement $advertisement): void
    {
        $advertisement->update(array_merge($request->all(), ['slug' => Str::slug($request->title)]));

    }

    public function remove(Advertisement $advertisement): void
    {
        $advertisement->delete();
    }



}

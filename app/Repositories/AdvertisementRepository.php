<?php

namespace App\Repositories;

use App\Http\Requests\AdvertisementRequest;
use App\Models\Advertisement;
use Illuminate\Support\Str;
use App\Helpers\SlugHelper;

class AdvertisementRepository
{
    protected Advertisement $model;

    public function __construct(Advertisement $model)
    {
        $this->model = $model;
    }

    public function create(AdvertisementRequest $request): void
    {
        $this->model->create(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->title)]));
    }

    public function update(AdvertisementRequest $request, Advertisement $advertisement): void
    {
        $advertisement->update(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->title)]));
    }

    public function remove(Advertisement $advertisement): void
    {
        $advertisement->delete();
    }
}

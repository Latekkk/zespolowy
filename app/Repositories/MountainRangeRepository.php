<?php

namespace App\Repositories;

use App\Helpers\SlugHelper;
use App\Http\Requests\MountainRangesRequest;
use App\Models\MountainRanges;
use Illuminate\Support\Str;

class MountainRangeRepository
{
    protected MountainRanges $model;

    public function __construct(MountainRanges $model)
    {
        $this->model = $model;
    }

    public function create(MountainRangesRequest $request): void
    {
        $this->model->create(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function update(MountainRangesRequest $request, MountainRanges $mountainsSection): void
    {
        $mountainsSection->update(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function remove(MountainRanges $mountainsSection): void
    {
        $mountainsSection->delete();
    }


}

<?php

namespace App\Repositories;

use App\Helpers\SlugHelper;
use App\Http\Requests\MountainPartRequest;
use App\Models\MountainMainPart;
use Illuminate\Support\Str;

class MountainPartRepository
{
    protected MountainMainPart $model;

    public function __construct(MountainMainPart $model)
    {
        $this->model = $model;
    }

    public function create(MountainPartRequest $request): void
    {
        $this->model->create(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function update(MountainPartRequest $request, MountainMainPart $mountainsSection): void
    {
        $mountainsSection->update(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function remove(MountainMainPart $mountainsSection): void
    {
        $mountainsSection->delete();
    }

}

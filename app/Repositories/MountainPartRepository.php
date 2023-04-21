<?php

namespace App\Repositories;

use App\Helpers\SlugHelper;
use App\Http\Requests\MountainPartRequest;
use App\Models\MountainPart;
use Illuminate\Support\Str;

class MountainPartRepository
{
    protected MountainPart $model;

    public function __construct(MountainPart $model)
    {
        $this->model = $model;
    }

    public function create(MountainPartRequest $request): void
    {
        $this->model->create(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function update(MountainPartRequest $request, MountainPart $mountainsSection): void
    {
        $mountainsSection->update(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function remove(MountainPart $mountainsSection): void
    {
        $mountainsSection->delete();
    }

}

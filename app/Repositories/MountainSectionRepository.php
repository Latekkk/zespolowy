<?php

namespace App\Repositories;

use App\Helpers\SlugHelper;
use App\Http\Requests\MountainSectionRequest;
use App\Models\MountainSection;
use Illuminate\Support\Str;

class MountainSectionRepository
{
    protected MountainSection $model;

    public function __construct(MountainSection $model)
    {
        $this->model = $model;
    }

    public function create(MountainSectionRequest $request): void
    {
        $this->model->create(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function update(MountainSectionRequest $request, MountainSection $mountainsSection): void
    {
        $mountainsSection->update(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function remove(MountainSection $mountainsSection): void
    {
        $mountainsSection->delete();
    }

    private function getPointFromRequest($request): MountainSection
    {
        return new MountainSection(['name' => $request->name,
            'entry_points' => $request->markers[0]['entry_points'],
            'points_for_descent' => $request->markers[0]['points_for_descent'],
            'slug' => SlugHelper::getSlug($request->name)]);
    }

}

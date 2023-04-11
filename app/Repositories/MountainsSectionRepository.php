<?php

namespace App\Repositories;

use App\Helpers\SlugHelper;
use App\Http\Requests\MountainsSectionRequest;
use App\Models\MountainsSection;
use Illuminate\Support\Str;

class MountainsSectionRepository
{
    protected MountainsSection $model;

    public function __construct(MountainsSection $model)
    {
        $this->model = $model;
    }

    public function create(MountainsSectionRequest $request): void
    {
        $this->model->create(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function update(MountainsSectionRequest $request, MountainsSection $mountainsSection): void
    {
        $mountainsSection->update(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function remove(MountainsSection $mountainsSection): void
    {
        $mountainsSection->delete();
    }

    private function getPointFromRequest($request): MountainsSection
    {
        return new MountainsSection(['name' => $request->name,
            'entry_points' => $request->markers[0]['entry_points'],
            'points_for_descent' => $request->markers[0]['points_for_descent'],
            'slug' => SlugHelper::getSlug($request->name)]);
    }

}

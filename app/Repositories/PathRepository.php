<?php

namespace App\Repositories;

use App\Helpers\SlugHelper;
use App\Http\Requests\PathRequest;
use App\Models\Path;
use Illuminate\Support\Str;

class PathRepository
{
    protected Path $model;

    public function __construct(Path $model)
    {
        $this->model = $model;
    }

    public function create(PathRequest $request): void
    {
        $this->model->create(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function update(PathRequest $request, Path $path): void
    {
        $path->update(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function remove(Path $path): void
    {
        $path->delete();
    }

    private function getPointFromRequest($request): Path
    {
        return new Path(['name' => $request->name,
            'entry_points' => $request->markers[0]['entry_points'],
            'points_for_descent' => $request->markers[0]['points_for_descent'],
            'slug' => SlugHelper::getSlug($request->name)]);
    }

}

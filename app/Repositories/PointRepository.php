<?php

namespace App\Repositories;

use App\Helpers\SlugHelper;
use App\Http\Requests\PointRequest;
use App\Models\Point;
use Illuminate\Support\Str;

class PointRepository
{
    protected Point $model;

    public function __construct(Point $model)
    {
        $this->model = $model;
    }

    public function create(PointRequest $request): void
    {
        $point = $this->getPointFromRequest($request);
        $point->save();
    }

    public function update(PointRequest $request, Point $point): void
    {
        $point->update(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function remove(Point $point): void
    {
        $point->delete();
    }

    private function getPointFromRequest($request): Point
    {
        return new Point(['name' => $request->name, 'lat' => $request->markers[0]['lat'], 'lng' => $request->markers[0]['lng'], 'slug' => SlugHelper::getSlug($request->name)]);
    }

}

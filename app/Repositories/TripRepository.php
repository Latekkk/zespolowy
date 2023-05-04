<?php

namespace App\Repositories;

use App\Helpers\SlugHelper;
use App\Http\Requests\TripRequest;
use App\Models\Trip;

class TripRepository
{
    protected Trip $model;

    public function __construct(Trip $model)
    {
        $this->model = $model;
    }

    public function create(TripRequest $request): void
    {
        $this->model->create(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function update(TripRequest $request, Trip $mountainsSection): void
    {
        $mountainsSection->update(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function remove(Trip $mountainsSection): void
    {
        $mountainsSection->delete();
    }
}

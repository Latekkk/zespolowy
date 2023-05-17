<?php

namespace App\Repositories;

use App\Helpers\SlugHelper;
use App\Http\Requests\MountainSectionTripRequest;
use App\Models\MountainSectionTrip;

class MountainSectionTripRepository
{
    protected Trip $model;

    public function __construct(MountainSectionTrip $model)
    {
        $this->model = $model;
    }

    public function create(MountainSectionTripRequest $request): void
    {
        $this->model->create(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function update(MountainSectionTripRequest $request, Trip $mountainsSection): void
    {
        $mountainsSection->update(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function remove(MountainSectionTrip $mountainsSection): void
    {
        $mountainsSection->delete();
    }
}

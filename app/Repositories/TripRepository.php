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

    public function update(TripRequest $request, Trip $trip): void
    {
        $trip->update(array_merge($request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
    }

    public function remove(Trip $trip): void
    {
        $trip->delete();
    }
    private function getTripFromRequest($request): Trip
    {
        return new Trip(['name' => $request->name,
            'totalPoints' => $request->markers[0]['totalPoints'],
            'slug' => SlugHelper::getSlug($request->name)]);
    }
}

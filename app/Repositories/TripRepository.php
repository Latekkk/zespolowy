<?php

namespace App\Repositories;

use App\Helpers\SlugHelper;

use App\Http\Requests\TripRequest;
use App\Models\Trip;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class TripRepository
{
    protected Trip $model;

    public function __construct(Trip $model)
    {
        $this->model = $model;
    }

    public function create(TripRequest $request): void
    {
        $inputDate = $request->input('date');
        $formattedDate = substr($inputDate, 0, 19);

        $carbonDate = Carbon::createFromFormat('Y-m-d\TH:i:s', $formattedDate);
        $trip = $this->model->create([
            'name' => $request->input('name'),
            'date' => $carbonDate,
            'slug' => SlugHelper::getSlug($request->name)
        ]);
        $mountainSections = $request->input('mountainSections', []);
        $trip->mountainSections()->attach($mountainSections);
    }
    public function update(TripRequest $request, Trip $trip): void
    {
        $inputDate = $request->input('date');
        $formattedDate = substr($inputDate, 0, 19);

        $carbonDate = Carbon::createFromFormat('Y-m-d\TH:i:s', $formattedDate);
        $trip->update(array_merge([
            'name' => $request->input('name'),
            'date' => $carbonDate,
            'slug' => SlugHelper::getSlug($request->name)
        ]));
        $trip->update(array_merge(
            $request->all(), ['slug' => SlugHelper::getSlug($request->name)]));
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

<?php

namespace App\Repositories;

use App\Helpers\SlugHelper;

use App\Http\Requests\TripRequest;
use App\Models\MountainSection;
use App\Models\MountainSectionTrip;
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
        $trip = new Trip();
        $trip->name = $request->input('name');
        $trip->date = $request->input('date');
        $trip->save();

        $mountainSections = $request->input('mountainSection');
        if($mountainSections){
            $this->createMountainSection($mountainSections, $trip);
        }
    }
    public function update(TripRequest $request, Trip $trip): void
    {
        $trip->name = $request->input('name');
        $trip->date = $request->input('date');
        $trip->save();
        $mountainSections = $request->input('mountainSection');
        if($mountainSections){
            MountainSectionTrip::where('trip_id', $trip->id)->delete();
            $this->createMountainSection($mountainSections, $trip);
        }
    }

    public function remove(Trip $trip): void
    {
        $trip->delete();
    }

    private function createMountainSection($mountainSections, $trip){
        foreach ($mountainSections as $mountainSectionData) {
            $mountainSectionId = $mountainSectionData['id'];

            $mountainSectionTrip = new MountainSectionTrip();
            $mountainSectionTrip->trip_id = $trip->id;
            $mountainSectionTrip->mountain_section_id = $mountainSectionId;
            $mountainSectionTrip->save();
        }
    }
    private function getTripFromRequest($request): Trip
    {
        return new Trip(['name' => $request->name,
            'totalPoints' => $request->markers[0]['totalPoints'],
            'slug' => SlugHelper::getSlug($request->name)]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Helpers\ToastHelper;
use App\Http\Requests\TripRequest;
use App\Models\MountainSection;
use App\Models\MountainSectionTrip;
use App\Models\Trip;
use App\Repositories\TripRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class TripController extends Controller
{
    protected TripRepository $repository;

    public function __construct(TripRepository $tripRepository)
    {
        $this->repository = $tripRepository;
    }

    public function index(): Response
    {
        return Inertia::render('Trip/Index', [
            'trips' => Trip::with(['mountainSections.start_point','mountainSections.end_point' ]),
        ]);

    }

    public function create(): Response
    {
        return Inertia::render('Trip/Form', [
            'mountainSection' => MountainSection::all(),
        ]);
    }

    public function show(Trip $trip): Response
    {
        return Inertia::render('Trip/index', [
            'trip' => $trip,
        ]);
    }

    public function edit(Trip $trip): Response
    {
        $trip->load('mountainSections');
        return Inertia::render('Trip/Form', [
            'trip' => $trip,
            'mountainSection' => MountainSection::all(),
        ]);
    }

    public function store(TripRequest $request): RedirectResponse
    {

        $trip = new Trip();
        $trip->name = $request->input('name');
        $trip->date = $request->input('date');
        $trip->save();

        $mountainSections = $request->input('mountainSection');
        foreach ($mountainSections as $mountainSectionData) {
            $mountainSection = new MountainSection();
            $mountainSection->id = $mountainSectionData['id'];

            $mountainSectionTrip = new MountainSectionTrip();
            $mountainSectionTrip->trip_id = $trip->id;
            $mountainSectionTrip->mountain_section_id = $mountainSection->id;
            $mountainSectionTrip->save();
        }
        return redirect()->route('trip.index')->with(ToastHelper::update('trip'));
    }
    public function update(TripRequest $request, Trip $trip): RedirectResponse
    {
        $trip->name = $request->input('name');
        $trip->date = $request->input('date');
        $trip->save();
        $mountainSections = $request->input('mountainSection');
        MountainSectionTrip::where('trip_id', $trip->id)->delete();

        foreach ($mountainSections as $mountainSectionData) {
            $mountainSectionId = $mountainSectionData['id'];

            $mountainSectionTrip = new MountainSectionTrip();
            $mountainSectionTrip->trip_id = $trip->id;
            $mountainSectionTrip->mountain_section_id = $mountainSectionId;
            $mountainSectionTrip->save();
        }
        return redirect()->route('trip.index')->with(ToastHelper::update('trip'));
    }

    public function getAll(): JsonResponse
    {
        $params = request()->query();
        $trip = Trip::with(['mountainSections.start_point','mountainSections.end_point' ])->orderBy($params['sort']?? 'id', (int)$params['sortOrder'] >= 0? 'asc' : 'desc' )-> paginate((int)$params['paginate'] ?? 15)->appends(request()->query());
        return response()->json($trip);
    }

    public function removeAPI(Trip $trip): JsonResponse
    {
        $this->repository->remove($trip);
        return response()->json(['status' => 'ok']);
    }
}

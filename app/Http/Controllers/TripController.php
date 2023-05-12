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
            'Trip' => Trip::paginate(5),
            'mountainSectionTrip' => MountainSectionTrip::all(),
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
            'Trip' => $trip
        ]);
    }

    public function edit(Trip $trip): Response
    {
        return Inertia::render('Trip/Form', [
            'trip' => $trip,
            'mountainSectionTrip' => MountainSectionTrip::all(),
            'mountainSection' => MountainSection::all(),
        ]);
    }

    public function update(Trip $trip, TripRequest $tripRequest): RedirectResponse
    {
        $this->repository->update($tripRequest, $trip);

        return redirect()->route('trip.index')->with(ToastHelper::update('trip'));
    }

    public function store(TripRequest $request): RedirectResponse
    {
        $this->repository->create($request);

        return redirect()->route('trip.index')->with(ToastHelper::update('trip'));
    }
    public function getAll(): JsonResponse
    {
        $params = request()->query();
        $trip = Trip::orderBy($params['sort']?? 'id', (int)$params['sortOrder'] >= 0? 'asc' : 'desc' )-> paginate((int)$params['paginate'] ?? 15)->appends(request()->query());
        return response()->json($trip);
    }

    public function removeAPI(Trip $trip): JsonResponse
    {
        $this->repository->remove($trip);
        return response()->json(['status' => 'ok']);
    }

}

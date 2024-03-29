<?php

namespace App\Http\Controllers;

use App\Helpers\ToastHelper;
use App\Http\Requests\TripRequest;
use App\Http\Resources\UserResource;
use App\Models\MountainSection;
use App\Models\MountainSectionTrip;
use App\Models\Trip;
use App\Models\User;
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

    public function index()
    {
        return Inertia::render('Trip/Index', [
            'trips' => Trip::with(['mountainSections.startPoint','mountainSections.endPoint' ]),
        ]);

    }

    public function create(): Response
    {
        return Inertia::render('Trip/Form', [
            'mountainSection' => MountainSection::with(['startPoint', 'endPoint'])->get(),
        ]);
    }

    public function show(Trip $trip): Response
    {
        $trip->load(['mountainSections.mountainMainPart.userMountainMainParts.user' ]);
        $guides = $trip->mountainSections->flatMap(function ($mountainSection) {
            return $mountainSection->mountainMainPart->userMountainMainParts->pluck('user');
        });

        $uniqueGuides = $guides->unique();
        return Inertia::render('Trip/Show', [
            'trip' => $trip,
            'guides' => $uniqueGuides
        ]);
    }

    public function edit(Trip $trip): Response
    {
        $trip->load(['mountainSections.startPoint', 'mountainSections.endPoint']);
        return Inertia::render('Trip/Form', [
            'trip' => $trip,
            'mountainSection' => MountainSection::all(),
        ]);
    }

    public function store(TripRequest $request): RedirectResponse
    {
        $this->repository->create($request);
        return redirect()->route('trip.index')->with(ToastHelper::create('trip'));
    }
    public function update(TripRequest $request, Trip $trip): RedirectResponse
    {
        $this->repository->update($request,$trip);
        return redirect()->route('trip.index')->with(ToastHelper::update('trip'));
    }

    public function getAll(): JsonResponse
    {
        $params = request()->query();
        $trip = Trip::with(['mountainSections.startPoint','mountainSections.endPoint' ])->orderBy($params['sort']?? 'id', (int)$params['sortOrder'] >= 0? 'asc' : 'desc' )-> paginate((int)$params['paginate'] ?? 15)->appends(request()->query());
        return response()->json($trip);
    }

    public function removeAPI(Trip $trip): JsonResponse
    {
        $this->repository->remove($trip);
        return response()->json(['status' => 'ok']);
    }
}
